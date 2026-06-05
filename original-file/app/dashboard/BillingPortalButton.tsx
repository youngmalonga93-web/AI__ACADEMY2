"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";

export function BillingPortalButton() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function openPortal() {
    setIsPending(true);
    setMessage(null);

    const response = await fetch("/api/stripe/portal", { method: "POST" });
    const payload = (await response.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };

    if (payload.url) {
      window.location.href = payload.url;
      return;
    }

    setMessage(payload.error ?? "Could not open billing settings.");
    setIsPending(false);
  }

  return (
    <div className="space-y-2">
      <Button type="button" variant="secondary" onClick={openPortal}>
        {isPending ? "Opening..." : "Manage billing"}
      </Button>
      {message ? (
        <ErrorMessage message={message} title="Billing error" />
      ) : null}
    </div>
  );
}
