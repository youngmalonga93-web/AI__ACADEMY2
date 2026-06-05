import { NextResponse } from "next/server";
import { z } from "zod";
import { reportServerError } from "@/lib/error-reporting";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  billingPlans,
  getAppUrl,
  getStripeClient,
  getStripePriceId,
  type BillingPlanId,
} from "@/lib/stripe";

export const dynamic = "force-dynamic";

const checkoutSchema = z.object({
  plan: z.enum(["pro", "builder"]),
});

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(
    await request.json().catch(() => ({}))
  );

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Choose a valid plan." },
      { status: 400 }
    );
  }

  const stripe = getStripeClient();
  const priceId = getStripePriceId(parsed.data.plan);

  if (!stripe || !priceId) {
    await reportServerError({
      context: "stripe-checkout.not-configured",
      error: "Missing Stripe client or price ID.",
      metadata: { plan: parsed.data.plan, hasStripeClient: Boolean(stripe) },
    });

    return NextResponse.json(
      { error: "Billing is not available yet. Please try again later." },
      { status: 503 }
    );
  }

  let supabase;
  let user;

  try {
    supabase = await createSupabaseServerClient();
    const result = await supabase.auth.getUser();
    user = result.data.user;
  } catch (error) {
    await reportServerError({
      context: "stripe-checkout.auth-check",
      error,
      metadata: { plan: parsed.data.plan },
    });

    return NextResponse.json(
      { error: "We could not verify your session. Please log in again." },
      { status: 401 }
    );
  }

  if (!user) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  const plan = billingPlans[parsed.data.plan as BillingPlanId];
  const appUrl = getAppUrl();

  let subscription;

  try {
    const result = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();
    subscription = result.data;
  } catch (error) {
    await reportServerError({
      context: "stripe-checkout.subscription-lookup",
      error,
      metadata: { plan: parsed.data.plan },
    });
  }

  let session;

  try {
    session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: subscription?.stripe_customer_id ?? undefined,
      customer_email: subscription?.stripe_customer_id ? undefined : user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          user_id: user.id,
          plan: parsed.data.plan,
        },
      },
      metadata: {
        user_id: user.id,
        plan: parsed.data.plan,
      },
      success_url: `${appUrl}/dashboard?checkout=success&plan=${parsed.data.plan}`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled`,
    });
  } catch (error) {
    await reportServerError({
      context: "stripe-checkout.create-session",
      error,
      metadata: { plan: parsed.data.plan },
    });

    return NextResponse.json(
      { error: "Checkout is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  if (!session.url) {
    await reportServerError({
      context: "stripe-checkout.missing-session-url",
      error: "Stripe checkout session did not include a URL.",
      metadata: { plan: parsed.data.plan },
    });

    return NextResponse.json(
      { error: `Could not start ${plan.name} checkout. Please try again.` },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
