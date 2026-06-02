"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
                emailRedirectTo: `${window.location.origin}/auth/callback`,
              },
            });

      if (response.error) {
        setMessage(response.error.message);
        return;
      }

      if (mode === "signup") {
        setMessage("Check your email to confirm your account. Your 7-day trial starts now.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setMessage("Supabase is not configured yet. Add the environment variables and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleOAuth(provider: "github" | "google") {
    setIsSubmitting(true);
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage(error.message);
      }
    } catch {
      setMessage("Supabase is not configured yet. Add the environment variables and try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4 rounded-lg border bg-card p-5" onSubmit={handleEmailAuth}>
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
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
      <div className="grid gap-2 sm:grid-cols-2">
        <Button disabled={isSubmitting} type="button" variant="secondary" onClick={() => handleOAuth("github")}>
          GitHub
        </Button>
        <Button disabled={isSubmitting} type="button" variant="secondary" onClick={() => handleOAuth("google")}>
          Google
        </Button>
      </div>
      <p className="min-h-5 text-sm text-muted-foreground" role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
