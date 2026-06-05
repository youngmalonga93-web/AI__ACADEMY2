"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { oauthProviders, type OAuthProviderId } from "@/lib/auth-providers";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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
  }, []);

  function getAuthCallbackUrl(provider?: OAuthProviderId) {
    const callbackUrl = new URL(
      provider ? "/auth/client-callback" : "/auth/callback",
      window.location.origin
    );
    callbackUrl.searchParams.set("next", nextPath);
    callbackUrl.searchParams.set("mode", mode);

    if (provider) {
      callbackUrl.searchParams.set("provider", provider);
    }

    return callbackUrl.toString();
  }

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

    try {
      const supabase = createSupabaseBrowserClient();
      const response =
        mode === "login"
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: getAuthCallbackUrl(),
              },
            });

      if (response.error) {
        setMessage(response.error.message);
        return;
      }

      if (mode === "signup") {
        setMessage(
          "Check your email to confirm your account. Your 7-day trial starts now."
        );
      } else {
        router.push(nextPath);
        router.refresh();
      }
    } catch {
      setMessage(
        "Supabase is not configured yet. Add the environment variables and try again."
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
      <p
        className="min-h-5 text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
