import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  applySecurityHeaders,
  checkRateLimit,
  getClientIp,
  getSafeRedirectPath,
} from "@/lib/security";
import { reportServerError } from "@/lib/error-reporting";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const emailAuthSchema = z.object({
  mode: z.enum(["login", "signup"]),
  email: z.string().email().max(320),
  password: z.string().min(8).max(200),
  next: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`email-auth:${ip}`, 12, 60_000);

  if (!rateLimit.allowed) {
    return applySecurityHeaders(
      NextResponse.json(
        { error: "Too many auth attempts. Wait a minute and try again." },
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

  const parsed = emailAuthSchema.safeParse(body);

  if (!parsed.success) {
    return applySecurityHeaders(
      NextResponse.json(
        {
          error: "Invalid email auth request.",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      )
    );
  }

  const requestUrl = new URL(request.url);
  const next = getSafeRedirectPath(parsed.data.next);
  try {
    const supabase = await createSupabaseServerClient();
    const response =
      parsed.data.mode === "login"
        ? await supabase.auth.signInWithPassword({
            email: parsed.data.email,
            password: parsed.data.password,
          })
        : await supabase.auth.signUp({
            email: parsed.data.email,
            password: parsed.data.password,
            options: {
              emailRedirectTo: new URL(
                `/auth/callback?next=${encodeURIComponent(next)}&mode=signup`,
                requestUrl.origin
              ).toString(),
            },
          });

    if (response.error) {
      await reportServerError({
        context: "email-auth.supabase-error",
        error: response.error,
        metadata: { mode: parsed.data.mode, status: response.error.status },
      });

      return applySecurityHeaders(
        NextResponse.json(
          {
            error:
              parsed.data.mode === "login"
                ? "Invalid email or password."
                : "Could not create this account. Check your email and password, then try again.",
          },
          { status: 400 }
        )
      );
    }
  } catch (error) {
    await reportServerError({
      context: "email-auth.supabase-request",
      error,
      metadata: { mode: parsed.data.mode },
    });

    return applySecurityHeaders(
      NextResponse.json(
        { error: "Authentication is temporarily unavailable. Try again soon." },
        { status: 503 }
      )
    );
  }

  return applySecurityHeaders(
    NextResponse.json(
      {
        next,
        message:
          parsed.data.mode === "signup"
            ? "Check your email to confirm your account. Your 7-day trial starts now."
            : "Logged in.",
      },
      {
        headers: {
          "X-RateLimit-Remaining": String(rateLimit.remaining),
          "X-RateLimit-Reset": new Date(rateLimit.resetAt).toISOString(),
        },
      }
    )
  );
}
