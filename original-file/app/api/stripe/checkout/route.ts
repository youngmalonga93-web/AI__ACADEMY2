import { NextResponse } from "next/server";
import { z } from "zod";
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
    return NextResponse.json(
      {
        error:
          "Billing is not configured yet. Add Stripe keys and price IDs in Vercel.",
      },
      { status: 503 }
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  const plan = billingPlans[parsed.data.plan as BillingPlanId];
  const appUrl = getAppUrl();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const session = await stripe.checkout.sessions.create({
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

  if (!session.url) {
    return NextResponse.json(
      { error: `Could not start ${plan.name} checkout.` },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: session.url });
}
