import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { reportServerError } from "@/lib/error-reporting";
import {
  applySecurityHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/security";

const clientErrorSchema = z.object({
  message: z.string().max(2000).optional(),
  digest: z.string().max(300).optional(),
  path: z.string().max(500).optional(),
  source: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`client-error:${ip}`, 10, 60_000);

  if (!rateLimit.allowed) {
    return applySecurityHeaders(
      NextResponse.json({ received: true }, { status: 202 })
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return applySecurityHeaders(
      NextResponse.json({ received: true }, { status: 202 })
    );
  }

  const parsed = clientErrorSchema.safeParse(body);

  if (parsed.success) {
    await reportServerError({
      context: `client-error.${parsed.data.source ?? "unknown"}`,
      error: parsed.data.message ?? "Client error without message.",
      metadata: {
        digest: parsed.data.digest,
        path: parsed.data.path,
      },
    });
  }

  return applySecurityHeaders(
    NextResponse.json({ received: true }, { status: 202 })
  );
}
