import { NextResponse, type NextRequest } from "next/server";
import {
  getOAuthProviderLabel,
  oauthProviders,
  type OAuthProviderId,
} from "@/lib/auth-providers";
import { getConfiguredAppUrl } from "@/lib/app-url";
import { reportServerError } from "@/lib/error-reporting";
import { getSafeRedirectPath } from "@/lib/security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AuthStartRouteProps = {
  params: Promise<{
    provider: string;
  }>;
};

function getMode(value: string | null) {
  return value === "signup" ? "signup" : "login";
}

export async function GET(request: NextRequest, props: AuthStartRouteProps) {
  const { provider } = await props.params;
  const requestUrl = new URL(request.url);
  const mode = getMode(requestUrl.searchParams.get("mode"));
  const next = getSafeRedirectPath(requestUrl.searchParams.get("next"));
  const providerConfig = oauthProviders.find((item) => item.id === provider);

  if (!providerConfig) {
    const destination = new URL(`/${mode}`, requestUrl.origin);
    destination.searchParams.set(
      "message",
      "That sign-in provider is not available yet. Use Google or email signup."
    );
    return NextResponse.redirect(destination);
  }

  const appUrl = getConfiguredAppUrl(requestUrl.origin);
  const callbackUrl = new URL("/auth/client-callback", appUrl);
  callbackUrl.searchParams.set("next", next);
  callbackUrl.searchParams.set("mode", mode);
  callbackUrl.searchParams.set("provider", providerConfig.id);

  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: providerConfig.id as OAuthProviderId,
      options: {
        redirectTo: callbackUrl.toString(),
        queryParams:
          providerConfig.id === "google"
            ? {
                access_type: "offline",
                prompt: "consent",
              }
            : undefined,
      },
    });

    if (error || !data.url) {
      await reportServerError({
        context: "auth-start.oauth-url",
        error: error ?? "Supabase did not return an OAuth URL.",
        metadata: { provider: providerConfig.id, mode },
      });

      const destination = new URL(`/${mode}`, requestUrl.origin);
      destination.searchParams.set(
        "message",
        `${getOAuthProviderLabel(providerConfig.id)} sign-in could not start. Check the provider settings in Supabase.`
      );
      return NextResponse.redirect(destination);
    }

    return NextResponse.redirect(data.url);
  } catch (error) {
    await reportServerError({
      context: "auth-start.unhandled",
      error,
      metadata: { provider: providerConfig.id, mode },
    });

    const destination = new URL(`/${mode}`, requestUrl.origin);
    destination.searchParams.set(
      "message",
      "Social login is not configured yet. Use email signup while provider credentials are connected."
    );
    return NextResponse.redirect(destination);
  }
}
