import { NextResponse } from "next/server";
import Stripe from "stripe";
import { reportServerError } from "@/lib/error-reporting";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getStripeClient } from "@/lib/stripe";

export const dynamic = "force-dynamic";

function unixToIso(value: number | null | undefined) {
  return value ? new Date(value * 1000).toISOString() : null;
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.user_id;

  if (!userId) {
    return;
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;
  const priceId = subscription.items.data[0]?.price.id ?? null;
  const productId = subscription.items.data[0]?.price.product;
  const plan = subscription.metadata.plan ?? "pro";
  const periodSubscription = subscription as Stripe.Subscription & {
    current_period_start?: number | null;
    current_period_end?: number | null;
  };

  const supabase = createSupabaseAdminClient();

  await supabase.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
      stripe_price_id: priceId,
      stripe_product_id:
        typeof productId === "string" ? productId : (productId?.id ?? null),
      plan,
      status: subscription.status,
      current_period_start: unixToIso(periodSubscription.current_period_start),
      current_period_end: unixToIso(periodSubscription.current_period_end),
      trial_start: unixToIso(subscription.trial_start),
      trial_end: unixToIso(subscription.trial_end),
      cancel_at: unixToIso(subscription.cancel_at),
      canceled_at: unixToIso(subscription.canceled_at),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" }
  );
}

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    await reportServerError({
      context: "stripe-webhook.not-configured",
      error: "Missing Stripe client or webhook secret.",
      metadata: { hasStripeClient: Boolean(stripe) },
    });

    return NextResponse.json(
      { error: "Webhook endpoint is not available." },
      { status: 503 }
    );
  }

  let event: Stripe.Event;
  const signature = request.headers.get("stripe-signature");
  const body = await request.text();

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    await reportServerError({
      context: "stripe-webhook.invalid-signature",
      error,
    });

    return NextResponse.json(
      { error: "Invalid Stripe signature." },
      { status: 400 }
    );
  }

  if (
    event.type === "customer.subscription.created" ||
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    try {
      await syncSubscription(event.data.object);
    } catch (error) {
      await reportServerError({
        context: "stripe-webhook.sync-subscription",
        error,
        metadata: { eventType: event.type },
      });

      return NextResponse.json(
        { error: "Webhook processing failed." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
