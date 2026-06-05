import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateProjectReview } from "@/lib/ai/project-reviewer";
import {
  applySecurityHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const projectReviewRequestSchema = z.object({
  title: z.string().min(3).max(160),
  audience: z.string().min(3).max(160),
  goal: z.string().min(10).max(400),
  description: z.string().min(40).max(5000),
  evidence: z.string().max(2500).optional(),
  preferredProvider: z.enum(["openai", "anthropic"]).optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`project-reviewer:${ip}`, 6, 60_000);

  if (!rateLimit.allowed) {
    return applySecurityHeaders(
      NextResponse.json(
        {
          error: "Too many project reviews. Wait a minute and try again.",
        },
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
          { error: "Sign in to use AI Project Reviewer." },
          { status: 401 }
        )
      );
    }
  } catch {
    return applySecurityHeaders(
      NextResponse.json({ error: "Unable to verify session." }, { status: 401 })
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

  const parsed = projectReviewRequestSchema.safeParse(body);

  if (!parsed.success) {
    return applySecurityHeaders(
      NextResponse.json(
        {
          error: "Invalid project review request.",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      )
    );
  }

  const response = await generateProjectReview(parsed.data, request.signal);

  return applySecurityHeaders(
    NextResponse.json(response, {
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": new Date(rateLimit.resetAt).toISOString(),
      },
    })
  );
}
