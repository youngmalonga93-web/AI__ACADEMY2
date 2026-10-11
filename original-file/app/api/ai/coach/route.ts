import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateCoachResponse } from "@/lib/ai/coach";
import { checkAiUsageLimit } from "@/lib/ai/limits";
import { applySecurityHeaders } from "@/lib/security";
import { reportServerError } from "@/lib/error-reporting";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const coachRequestSchema = z.object({
  message: z.string().min(10).max(4000),
  goal: z.string().max(500).optional(),
  lessonSlug: z.string().max(120).optional(),
  preferredProvider: z.enum(["openai", "anthropic"]).optional(),
});

export async function POST(request: NextRequest) {
  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  let userId: string;

  try {
    supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return applySecurityHeaders(
        NextResponse.json(
          { error: "Sign in to use AI Coach." },
          { status: 401 }
        )
      );
    }

    userId = user.id;
  } catch (error) {
    await reportServerError({
      context: "ai-coach.auth-check",
      error,
      metadata: {},
    });

    return applySecurityHeaders(
      NextResponse.json(
        { error: "We could not verify your session. Please log in again." },
        { status: 401 }
      )
    );
  }

  // Per-user, Supabase-backed rate limit. The old in-memory limiter kept
  // buckets per serverless instance, so limits never actually applied.
  let usage;

  try {
    usage = await checkAiUsageLimit(supabase, userId, "ai-coach");
  } catch (error) {
    await reportServerError({
      context: "ai-coach.usage-check",
      error,
      metadata: { userId },
    });

    return applySecurityHeaders(
      NextResponse.json(
        { error: "We could not check your usage. Please try again soon." },
        { status: 503 }
      )
    );
  }

  if (!usage.allowed) {
    return applySecurityHeaders(
      NextResponse.json({ error: usage.message }, { status: 429 })
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

  const parsed = coachRequestSchema.safeParse(body);

  if (!parsed.success) {
    return applySecurityHeaders(
      NextResponse.json(
        { error: "Invalid coach request.", issues: parsed.error.flatten() },
        { status: 400 }
      )
    );
  }

  let response;

  try {
    response = await generateCoachResponse(parsed.data, request.signal);
  } catch (error) {
    await reportServerError({
      context: "ai-coach.generate-response",
      error,
      metadata: { userId },
    });

    return applySecurityHeaders(
      NextResponse.json(
        { error: "AI Coach is temporarily unavailable. Try again soon." },
        { status: 503 }
      )
    );
  }

  return applySecurityHeaders(
    NextResponse.json(response, {
      headers: {
        "X-RateLimit-Remaining": String(usage.remainingMinute),
        "X-RateLimit-Reset": usage.resetAt,
      },
    })
  );
}
