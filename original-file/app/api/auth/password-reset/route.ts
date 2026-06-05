import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getConfiguredAppUrl } from "@/lib/app-url";
import {
  applySecurityHeaders,
  checkRateLimit,
  getClientIp,
  getSafeRedirectPath,
} from "@/lib/security";
import { reportServerError } from "@/lib/error-reporting";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

const passwordResetSchema = z.object({
  email: z.string().email().max(320),
  next: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`password-reset:${ip}`, 5, 60_000);

  if (!rateLimit.allowed) {
    return applySecurityHeaders(
      NextResponse.json(
        {
          error:
            "Too many password reset requests. Wait a minute and try again.",
        },
        { status: 429 }
      )
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return applySecurityHeaders(
      NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
    );
  }

  const parsed = passwordResetSchema.safeParse(body);

  if (!parsed.success) {
    return applySecurityHeaders(
      NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      )
    );
  }

  const requestUrl = new URL(request.url);
  const next = getSafeRedirectPath(parsed.data.next);
  const appUrl = getConfiguredAppUrl(requestUrl.origin);
  const redirectTo = new URL("/auth/callback", appUrl);
  redirectTo.searchParams.set(
    "next",
    `/auth/reset-password?next=${encodeURIComponent(next)}`
  );
  redirectTo.searchParams.set("mode", "login");

  try {
    const { supabase } = createSupabaseRouteClient(request);
    const { error } = await supabase.auth.resetPasswordForEmail(
      parsed.data.email,
      {
        redirectTo: redirectTo.toString(),
      }
    );

    if (error) {
      await reportServerError({
        context: "password-reset.supabase-error",
        error,
        metadata: { status: error.status },
      });
    }
  } catch (error) {
    await reportServerError({
      context: "password-reset.unhandled",
      error,
    });
  }

  return applySecurityHeaders(
    NextResponse.json({
      message:
        "If an account exists for that email, a password reset link has been sent.",
    })
  );
}
