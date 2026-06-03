import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAppUrl, getStripeClient } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST() {
  const stripe = getStripeClient();

  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Billing is not configured yet. Add the Stripe secret key in Vercel.",
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

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!subscription?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No active billing customer was found." },
      { status: 404 }
    );
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripe_customer_id,
    return_url: `${getAppUrl()}/dashboard`,
  });

  return NextResponse.json({ url: portalSession.url });
}
