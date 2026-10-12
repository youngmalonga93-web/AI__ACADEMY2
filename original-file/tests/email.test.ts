import { afterEach, describe, expect, it } from "vitest";
import { isEmailConfigured, sendEmail } from "../lib/email/client";
import {
  onboardingDay3Email,
  onboardingDay7Email,
  paymentReceiptEmail,
  trialEndingEmail,
  waitlistConfirmationEmail,
  welcomeEmail,
} from "../lib/email/templates";
import { waitlistSchema } from "../lib/waitlist";

const originalEnv = process.env;

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("email templates", () => {
  it("renders the welcome email without throwing", () => {
    const { subject, html } = welcomeEmail("Sam");
    expect(subject.length).toBeGreaterThan(0);
    expect(html).toContain("Sam");
    expect(html).toContain("AI Academy");
  });

  it("renders onboarding emails without throwing", () => {
    for (const template of [onboardingDay3Email("Sam"), onboardingDay7Email("Sam")]) {
      expect(template.subject.length).toBeGreaterThan(0);
      expect(template.html).toContain("Sam");
    }
  });

  it("renders the trial ending email with the day count", () => {
    const { subject, html } = trialEndingEmail("Sam", 2);
    expect(subject).toContain("2 days");
    expect(html).toContain("2 days");
  });

  it("renders the trial ending email with singular day", () => {
    const { subject } = trialEndingEmail("Sam", 1);
    expect(subject).toContain("1 day");
    expect(subject).not.toContain("1 days");
  });

  it("renders the payment receipt with plan and amount", () => {
    const { subject, html } = paymentReceiptEmail("Sam", "Pro", "$29/mo");
    expect(subject).toContain("Pro");
    expect(html).toContain("$29/mo");
  });

  it("renders the waitlist confirmation", () => {
    const { subject, html } = waitlistConfirmationEmail("sam@example.com");
    expect(subject.length).toBeGreaterThan(0);
    expect(html).toContain("sam@example.com");
  });
});

describe("email client", () => {
  it("reports not-configured when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    expect(isEmailConfigured()).toBe(false);

    const result = await sendEmail({
      to: "sam@example.com",
      subject: "Test",
      html: "<p>Test</p>",
    });

    expect(result).toEqual({ sent: false, reason: "not-configured" });
  });

  it("reports configured when RESEND_API_KEY is present", () => {
    process.env.RESEND_API_KEY = "re_test_key";
    expect(isEmailConfigured()).toBe(true);
  });
});

describe("waitlist schema", () => {
  it("accepts a valid email with optional name", () => {
    const parsed = waitlistSchema.safeParse({
      email: "sam@example.com",
      name: "Sam",
    });
    expect(parsed.success).toBe(true);
  });

  it("accepts an email without a name", () => {
    const parsed = waitlistSchema.safeParse({ email: "sam@example.com" });
    expect(parsed.success).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(waitlistSchema.safeParse({ email: "not-an-email" }).success).toBe(
      false
    );
    expect(waitlistSchema.safeParse({ email: "" }).success).toBe(false);
  });

  it("rejects overlong names", () => {
    const parsed = waitlistSchema.safeParse({
      email: "sam@example.com",
      name: "x".repeat(121),
    });
    expect(parsed.success).toBe(false);
  });
});
