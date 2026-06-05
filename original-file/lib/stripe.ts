import Stripe from "stripe";
import { getConfiguredAppUrl } from "@/lib/app-url";

export type BillingPlanId = "pro" | "builder";

export const billingPlans: Record<
  BillingPlanId,
  {
    name: string;
    priceEnvKey: "STRIPE_PRO_PRICE_ID" | "STRIPE_BUILDER_PRICE_ID";
  }
> = {
  pro: {
    name: "Pro",
    priceEnvKey: "STRIPE_PRO_PRICE_ID",
  },
  builder: {
    name: "Builder",
    priceEnvKey: "STRIPE_BUILDER_PRICE_ID",
  },
};

export function getAppUrl() {
  return getConfiguredAppUrl("http://localhost:3000");
}

export function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-05-27.dahlia",
  });
}

export function getStripePriceId(planId: BillingPlanId) {
  const plan = billingPlans[planId];
  return process.env[plan.priceEnvKey] ?? null;
}

export function isBillingConfigured() {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_PRO_PRICE_ID &&
    process.env.STRIPE_BUILDER_PRICE_ID
  );
}
