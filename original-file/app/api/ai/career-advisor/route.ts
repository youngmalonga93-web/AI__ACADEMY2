import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateCareerAdvice } from "@/lib/ai/career-advisor";
import {
  applySecurityHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/security";
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
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`career-advisor:${ip}`, 8, 60_000);

  if (!rateLimit.allowed) {
    return applySecurityHeaders(
      NextResponse.json(
        { error: "Too many career advisor requests. Try again in a minute." },
        { status: 429 }
      )
    );
  }

  try {
    const supabase = await createSupabaseServerClient();
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
  } catch (error) {
    await reportServerError({
      context: "career-advisor.auth-check",
      error,
      metadata: { ip },
    });

    return applySecurityHeaders(
      NextResponse.json(
        { error: "We could not verify your session. Please log in again." },
        { status: 401 }
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
      metadata: { ip },
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
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": new Date(rateLimit.resetAt).toISOString(),
      },
    })
  );
}
