"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function getSafeNext(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/dashboard";
}

export function PasswordResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageKind, setMessageKind] = useState<"error" | "notice">("notice");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageKind("notice");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setMessageKind("error");
        setMessage(
          "We could not update your password. Request a new reset link and try again."
        );
        return;
      }

      router.push(getSafeNext(searchParams.get("next")));
      router.refresh();
    } catch {
      setMessageKind("error");
      setMessage("Password reset is temporarily unavailable. Try again soon.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="space-y-4 rounded-lg border bg-card p-5"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="new-password">
          New password
        </label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button className="w-full" disabled={isSubmitting} type="submit">
        Update password
      </Button>
      {message && messageKind === "error" ? (
        <ErrorMessage message={message} title="Password reset error" />
      ) : null}
      {message && messageKind === "notice" ? (
        <p
          className="rounded-md border bg-muted/40 p-3 text-sm leading-6 text-muted-foreground"
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
