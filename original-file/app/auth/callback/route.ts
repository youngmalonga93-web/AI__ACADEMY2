import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSafeRedirectPath } from "@/lib/security";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeRedirectPath(requestUrl.searchParams.get("next"));
  const mode =
    requestUrl.searchParams.get("mode") === "signup" ? "signup" : "login";
  const authError =
    requestUrl.searchParams.get("error_description") ??
    requestUrl.searchParams.get("error");

  if (authError) {
    const destination = new URL(`/${mode}`, requestUrl.origin);
    destination.searchParams.set(
      "message",
      "Provider sign-in failed. Check that Google or GitHub is enabled in Supabase."
    );
    return NextResponse.redirect(destination);
  }

  if (code) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      const destination = new URL(`/${mode}`, requestUrl.origin);
      destination.searchParams.set("message", error.message);
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
