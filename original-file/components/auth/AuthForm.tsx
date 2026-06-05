"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { oauthProviders, type OAuthProviderId } from "@/lib/auth-providers";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageKind, setMessageKind] = useState<"error" | "notice">("notice");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nextPath, setNextPath] = useState("/dashboard");

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    setNextPath(
      next && next.startsWith("/") && !next.startsWith("//")
        ? next
        : "/dashboard"
    );
    setMessage(
      new URLSearchParams(window.location.search).get("message") ?? ""
    );
    setMessageKind("error");
  }, []);

  function getProviderStartPath(provider: OAuthProviderId) {
    const params = new URLSearchParams({
      mode,
      next: nextPath,
    });

    return `/auth/start/${provider}?${params.toString()}`;
  }

  async function handleEmailAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setMessageKind("notice");

    try {
      const response = await fetch("/api/auth/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          email,
          password,
          next: nextPath,
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        message?: string;
        next?: string;
      };

      if (!response.ok) {
        setMessageKind("error");
        setMessage(payload.error ?? "Email authentication failed.");
        return;
      }

      if (mode === "signup") {
        setMessageKind("notice");
        setMessage(
          payload.message ??
            "Check your email to confirm your account. Your 7-day trial starts now."
        );
      } else {
        router.push(payload.next ?? nextPath);
        router.refresh();
      }
    } catch {
      setMessageKind("error");
      setMessage(
        "Authentication is temporarily unavailable. Check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="space-y-4 rounded-lg border bg-card p-5"
      onSubmit={handleEmailAuth}
    >
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          minLength={8}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {mode === "login" ? "Log in" : "Start 7-day trial"}
      </Button>
      <div className="space-y-2" aria-label="Third-party sign in options">
        <div className="grid gap-2 sm:grid-cols-2">
          {oauthProviders.map((provider) => (
            <Button
              key={provider.id}
              asChild
              aria-label={`Continue with ${provider.label}`}
              disabled={isSubmitting}
              variant="secondary"
            >
              <Link href={getProviderStartPath(provider.id)}>
                Continue with {provider.label}
              </Link>
            </Button>
          ))}
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Google login is available for faster access. Email signup remains
          available for every tester.
        </p>
      </div>
      {message && messageKind === "error" ? (
        <ErrorMessage message={message} title="Authentication error" />
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
