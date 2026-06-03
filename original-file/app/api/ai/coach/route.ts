import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateCoachResponse } from "@/lib/ai/coach";
import {
  applySecurityHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/security";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const coachRequestSchema = z.object({
  message: z.string().min(10).max(4000),
  goal: z.string().max(500).optional(),
  lessonSlug: z.string().max(120).optional(),
  preferredProvider: z.enum(["openai", "anthropic"]).optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`ai-coach:${ip}`, 8, 60_000);

  if (!rateLimit.allowed) {
    return applySecurityHeaders(
      NextResponse.json(
        {
          error: "Too many coach requests. Wait a minute and try again.",
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
          { error: "Sign in to use AI Coach." },
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

  const parsed = coachRequestSchema.safeParse(body);

  if (!parsed.success) {
    return applySecurityHeaders(
      NextResponse.json(
        { error: "Invalid coach request.", issues: parsed.error.flatten() },
        { status: 400 }
      )
    );
  }

  const response = await generateCoachResponse(parsed.data, request.signal);

  return applySecurityHeaders(
    NextResponse.json(response, {
      headers: {
        "X-RateLimit-Remaining": String(rateLimit.remaining),
        "X-RateLimit-Reset": new Date(rateLimit.resetAt).toISOString(),
      },
    })
  );
}
