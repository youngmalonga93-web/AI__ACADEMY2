import { NextResponse } from "next/server";
import { reportServerError } from "@/lib/error-reporting";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAppUrl, getStripeClient } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST() {
  const stripe = getStripeClient();

  if (!stripe) {
    await reportServerError({
      context: "stripe-portal.not-configured",
      error: "Missing Stripe secret key.",
    });

    return NextResponse.json(
      { error: "Billing settings are not available yet." },
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
      context: "stripe-portal.auth-check",
      error,
    });

    return NextResponse.json(
      { error: "We could not verify your session. Please log in again." },
      { status: 401 }
    );
  }

  if (!user) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

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
      context: "stripe-portal.subscription-lookup",
      error,
    });

    return NextResponse.json(
      { error: "Billing settings are temporarily unavailable." },
      { status: 503 }
    );
  }

  if (!subscription?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No active billing customer was found." },
      { status: 404 }
    );
  }

  let portalSession;

  try {
    portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${getAppUrl()}/dashboard`,
    });
  } catch (error) {
    await reportServerError({
      context: "stripe-portal.create-session",
      error,
    });

    return NextResponse.json(
      { error: "Billing settings are temporarily unavailable." },
      { status: 503 }
    );
  }

  return NextResponse.json({ url: portalSession.url });
}
