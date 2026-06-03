"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOAuthProviderLabel } from "@/lib/auth-providers";

function getSafeNext(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "/dashboard";
}

export default function AuthClientCallbackPage() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(
      window.location.hash.replace(/^#/, "")
    );
    const provider = searchParams.get("provider");
    const providerLabel = getOAuthProviderLabel(provider);
    const mode = searchParams.get("mode") === "signup" ? "signup" : "login";
    const next = getSafeNext(searchParams.get("next"));
    const error =
      hashParams.get("error_description") ??
      hashParams.get("error") ??
      searchParams.get("error_description") ??
      searchParams.get("error");
    const code = searchParams.get("code");

    if (error) {
      const destination = new URL(`/${mode}`, window.location.origin);
      destination.searchParams.set(
        "message",
        `${providerLabel} sign-in could not finish. Check that ${providerLabel} is enabled in Supabase and that redirect URLs match.`
      );
      window.location.replace(destination.toString());
      return;
    }

    if (!code) {
      const destination = new URL(`/${mode}`, window.location.origin);
      destination.searchParams.set(
        "message",
        `${providerLabel} did not return a sign-in code. Try again or use email signup.`
      );
      window.location.replace(destination.toString());
      return;
    }

    const serverCallback = new URL("/auth/callback", window.location.origin);
    serverCallback.searchParams.set("code", code);
    serverCallback.searchParams.set("next", next);
    serverCallback.searchParams.set("mode", mode);

    if (provider) {
      serverCallback.searchParams.set("provider", provider);
    }

    window.location.replace(serverCallback.toString());
  }, []);

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <Badge>Secure sign in</Badge>
          <CardTitle>Completing third-party login</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-muted-foreground">
            We are finishing the secure provider redirect and preparing your AI
            Academy session.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
