"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { BillingPlanId } from "@/lib/stripe";

type BillingActionsProps = {
  plan: BillingPlanId;
  label: string;
  variant?: "default" | "secondary";
};

export function CheckoutButton({
  plan,
  label,
  variant = "default",
}: BillingActionsProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function startCheckout() {
    setIsPending(true);
    setMessage(null);

    const response = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    });
    const payload = (await response.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };

    if (payload.url) {
      window.location.href = payload.url;
      return;
    }

    setMessage(payload.error ?? "Could not start checkout.");
    setIsPending(false);
  }

  return (
    <div className="space-y-2">
      <Button
        className="w-full"
        variant={variant}
        onClick={startCheckout}
        disabled={isPending}
      >
        {isPending ? "Starting..." : label}
      </Button>
      {message ? (
        <p className="text-xs leading-5 text-muted-foreground">{message}</p>
      ) : null}
    </div>
  );
}
