import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Supabase-backed per-user rate limiting for AI endpoints.
//
// Why this exists: lib/security.ts's checkRateLimit keeps buckets in an
// in-memory Map. On Vercel's serverless runtime every instance gets its own
// bucket, so a burst of requests spread across instances never trips the
// limit. These checks run against Postgres, so they hold globally.

export const AI_REQUESTS_PER_MINUTE = 10;
export const AI_REQUESTS_PER_DAY = 100;

export type AiEndpoint = "ai-coach" | "career-advisor" | "project-reviewer";

export type AiUsageCheck = {
  allowed: boolean;
  remainingMinute: number;
  remainingDay: number;
  /** ISO timestamp for the X-RateLimit-Reset header. */
  resetAt: string;
  message?: string;
};

type ServerClient = Awaited<ReturnType<typeof createSupabaseServerClient>>;

// Keep the parameter type loose enough for tests: anything shaped like the
// server client works.
export async function checkAiUsageLimit(
  supabase: Pick<ServerClient, "from" | "rpc"> | SupabaseClient,
  userId: string,
  endpoint: AiEndpoint,
  now = new Date()
): Promise<AiUsageCheck> {
  const minuteStart = new Date(now);
  minuteStart.setSeconds(0, 0);
  const dayStart = new Date(now);
  dayStart.setHours(0, 0, 0, 0);
  const resetAt = new Date(minuteStart.getTime() + 60_000).toISOString();

  // Daily cap first: one cheap aggregate read.
  const { data: dayRows, error: dayError } = await supabase
    .from("ai_usage")
    .select("request_count")
    .eq("user_id", userId)
    .eq("endpoint", endpoint)
    .gte("window_start", dayStart.toISOString());

  if (dayError) {
    throw new Error(`AI usage daily check failed: ${dayError.message}`);
  }

  const dayTotal = (dayRows ?? []).reduce(
    (sum: number, row: { request_count?: number | null }) =>
      sum + (row.request_count ?? 0),
    0
  );
  const remainingDay = Math.max(0, AI_REQUESTS_PER_DAY - dayTotal);

  if (dayTotal >= AI_REQUESTS_PER_DAY) {
    return {
      allowed: false,
      remainingMinute: 0,
      remainingDay: 0,
      resetAt,
      message:
        "You have reached your daily AI usage limit. It resets at midnight UTC.",
    };
  }

  // Atomic per-minute increment via the increment_ai_usage() function.
  const { data: minuteCount, error: rpcError } = await supabase.rpc(
    "increment_ai_usage",
    {
      p_user_id: userId,
      p_endpoint: endpoint,
      p_window: minuteStart.toISOString(),
    }
  );

  if (rpcError) {
    throw new Error(`AI usage increment failed: ${rpcError.message}`);
  }

  const usedMinute = typeof minuteCount === "number" ? minuteCount : 1;
  const remainingMinute = Math.max(0, AI_REQUESTS_PER_MINUTE - usedMinute);

  if (usedMinute > AI_REQUESTS_PER_MINUTE) {
    return {
      allowed: false,
      remainingMinute: 0,
      remainingDay,
      resetAt,
      message: "Too many requests. Wait a minute and try again.",
    };
  }

  return { allowed: true, remainingMinute, remainingDay, resetAt };
}
