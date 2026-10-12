import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email/client";
import { waitlistConfirmationEmail } from "@/lib/email/templates";
import { reportServerError } from "@/lib/error-reporting";
import {
  applySecurityHeaders,
  checkRateLimit,
  getClientIp,
} from "@/lib/security";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { waitlistSchema } from "@/lib/waitlist";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(`waitlist:${ip}`, 5, 60_000);

  if (!rateLimit.allowed) {
    return applySecurityHeaders(
      NextResponse.json(
        { error: "Too many requests. Wait a minute and try again." },
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

  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return applySecurityHeaders(
      NextResponse.json(
        {
          error: "Invalid waitlist request.",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      )
    );
  }

  // Normalize so jane@x.com and Jane@x.com don't create two rows.
  const email = parsed.data.email.toLowerCase().trim();

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("waitlist").insert({
      email,
      name: parsed.data.name?.trim() || null,
      source: "landing",
    });

    // 23505 = unique violation (already on the list). Return success
    // anyway so attackers can't enumerate which emails joined.
    if (error && error.code !== "23505") {
      throw error;
    }
  } catch (error) {
    await reportServerError({
      context: "waitlist.insert",
      error,
      metadata: { ip },
    });

    return applySecurityHeaders(
      NextResponse.json(
        { error: "Could not join the waitlist. Try again soon." },
        { status: 503 }
      )
    );
  }

  // Fire-and-forget confirmation; sendEmail never throws, so a failed
  // email cannot fail the waitlist signup.
  const { subject, html } = waitlistConfirmationEmail(email);
  void sendEmail({ to: email, subject, html });

  return applySecurityHeaders(NextResponse.json({ ok: true }));
}
