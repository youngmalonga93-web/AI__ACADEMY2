import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateCareerAdvice } from "@/lib/ai/career-advisor";
import { checkAiUsageLimit } from "@/lib/ai/limits";
import { applySecurityHeaders } from "@/lib/security";
import { reportServerError } from "@/lib/error-reporting";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const careerAdvisorRequestSchema = z.object({
  currentRole: z.string().min(2).max(160),
  targetRole: z.string().min(2).max(160),
  skills: z.string().min(10).max(1200),
  timeline: z.string().min(2).max(120),
  constraints: z.string().max(800).optional(),
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
          { error: "Sign in to use AI Career Advisor." },
          { status: 401 }
        )
      );
    }

    userId = user.id;
  } catch (error) {
    await reportServerError({
      context: "career-advisor.auth-check",
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
    usage = await checkAiUsageLimit(supabase, userId, "career-advisor");
  } catch (error) {
    await reportServerError({
      context: "career-advisor.usage-check",
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

  const parsed = careerAdvisorRequestSchema.safeParse(body);

  if (!parsed.success) {
    return applySecurityHeaders(
      NextResponse.json(
        {
          error: "Invalid career advisor request.",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      )
    );
  }

  let response;

  try {
    response = generateCareerAdvice(parsed.data);
  } catch (error) {
    await reportServerError({
      context: "career-advisor.generate-advice",
      error,
      metadata: { userId },
    });

    return applySecurityHeaders(
      NextResponse.json(
        {
          error: "Career Advisor is temporarily unavailable. Try again soon.",
        },
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
