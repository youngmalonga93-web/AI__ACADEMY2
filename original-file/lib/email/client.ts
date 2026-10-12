import { welcomeEmail } from "./templates";

// Resend email client. Uses the Resend HTTP API directly (same pattern as
// lib/error-reporting.ts), so no SDK dependency is needed.
//
// Graceful degradation: if RESEND_API_KEY is not configured, sends are
// skipped with a logged reason instead of throwing. Callers must never
// let email delivery break the user-facing flow.

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

export type SendEmailResult =
  | { sent: true; id: string }
  | { sent: false; reason: "not-configured" | "send-failed" };

function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() || undefined,
    from: process.env.EMAIL_FROM?.trim() || "AI Academy <onboarding@resend.dev>",
  };
}

export function isEmailConfigured(): boolean {
  return Boolean(getEmailConfig().apiKey);
}

export async function sendEmail(
  input: SendEmailInput
): Promise<SendEmailResult> {
  const config = getEmailConfig();

  if (!config.apiKey) {
    console.log("[email] RESEND_API_KEY not configured; skipping send", {
      to: input.to,
      subject: input.subject,
    });
    return { sent: false, reason: "not-configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
      }),
    });

    if (!response.ok) {
      console.error("[email] Resend send failed", {
        status: response.status,
        to: input.to,
      });
      return { sent: false, reason: "send-failed" };
    }

    const data = (await response.json()) as { id?: string };
    return { sent: true, id: data.id ?? "unknown" };
  } catch (error) {
    console.error("[email] send threw", error);
    return { sent: false, reason: "send-failed" };
  }
}

function nameFromEmail(email: string): string {
  const prefix = email.split("@")[0] ?? "";
  const first = prefix.split(/[._-]+/)[0] ?? "";
  return first ? first.charAt(0).toUpperCase() + first.slice(1) : "there";
}

// Fire-and-forget welcome email for new signups. Never throws and never
// rejects — signup must not fail because email delivery did.
export async function sendWelcomeEmail(to: string): Promise<void> {
  try {
    const { subject, html } = welcomeEmail(nameFromEmail(to));
    const result = await sendEmail({ to, subject, html });

    if (!result.sent) {
      console.log("[email] welcome email not sent", {
        to,
        reason: result.reason,
      });
    }
  } catch (error) {
    console.error("[email] welcome email threw", error);
  }
}
