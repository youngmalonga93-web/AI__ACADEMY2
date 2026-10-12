"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setStatus("done");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }

  if (status === "done") {
    return (
      <div className="flex items-start gap-3 rounded-lg border bg-card p-6">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
        <div className="space-y-1">
          <p className="font-medium">You&rsquo;re on the list.</p>
          <p className="text-sm text-muted-foreground">
            Watch your inbox â founding member invites go out first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={120}
          aria-label="Name"
        />
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          maxLength={320}
          aria-label="Email"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}
      <Button type="submit" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Joining..." : "Join the waitlist"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        No spam. One email when your invite is ready.
      </p>
    </form>
  );
}
