import { NextResponse, type NextRequest } from "next/server";
import { getOAuthProviderLabel } from "@/lib/auth-providers";
import { reportServerError } from "@/lib/error-reporting";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSafeRedirectPath } from "@/lib/security";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeRedirectPath(requestUrl.searchParams.get("next"));
  const mode =
    requestUrl.searchParams.get("mode") === "signup" ? "signup" : "login";
  const providerLabel = getOAuthProviderLabel(
    requestUrl.searchParams.get("provider")
  );
  const authError =
    requestUrl.searchParams.get("error_description") ??
    requestUrl.searchParams.get("error");

  if (authError) {
    const destination = new URL(`/${mode}`, requestUrl.origin);
    destination.searchParams.set(
      "message",
      `${providerLabel} sign-in failed. Check that the provider is enabled in Supabase and that redirect URLs match.`
    );
    return NextResponse.redirect(destination);
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      await reportServerError({
        context: "auth-callback.exchange-code",
        error,
        metadata: { providerLabel, mode },
      });

      const destination = new URL(`/${mode}`, requestUrl.origin);
      destination.searchParams.set(
        "message",
        `${providerLabel} sign-in could not finish. Try again or use email login.`
      );
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
