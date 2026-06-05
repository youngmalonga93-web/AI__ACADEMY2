import { afterEach, describe, expect, it } from "vitest";
import { getClientEnv, getServerEnv } from "../lib/env";

const originalEnv = process.env;

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("environment validation", () => {
  it("accepts valid public Supabase configuration", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key";

    expect(getClientEnv()).toEqual({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable-key",
    });
  });

  it("keeps backward compatibility with the legacy anon key name", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    expect(getClientEnv().NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).toBe(
      "anon-key"
    );
  });

  it("rejects missing public Supabase configuration", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    expect(() => getClientEnv()).toThrow();
  });

  it("allows service role key to be absent for non-admin server operations", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key";
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    expect(getServerEnv().SUPABASE_SERVICE_ROLE_KEY).toBeUndefined();
  });

  it("accepts optional Stripe billing configuration", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key";
    process.env.NEXT_PUBLIC_APP_URL = "https://ai-academy.example.com";
    process.env.STRIPE_SECRET_KEY = "sk_test_example";
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_example";
    process.env.STRIPE_PRO_PRICE_ID = "price_pro";
    process.env.STRIPE_BUILDER_PRICE_ID = "price_builder";

    expect(getServerEnv()).toMatchObject({
      NEXT_PUBLIC_APP_URL: "https://ai-academy.example.com",
      STRIPE_SECRET_KEY: "sk_test_example",
      STRIPE_WEBHOOK_SECRET: "whsec_example",
      STRIPE_PRO_PRICE_ID: "price_pro",
      STRIPE_BUILDER_PRICE_ID: "price_builder",
    });
  });

  it("accepts optional AI provider configuration", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key";
    process.env.OPENAI_API_KEY = "openai-key";
    process.env.OPENAI_MODEL = "openai-model";
    process.env.ANTHROPIC_API_KEY = "anthropic-key";
    process.env.ANTHROPIC_MODEL = "anthropic-model";

    expect(getServerEnv()).toMatchObject({
      OPENAI_API_KEY: "openai-key",
      OPENAI_MODEL: "openai-model",
      ANTHROPIC_API_KEY: "anthropic-key",
      ANTHROPIC_MODEL: "anthropic-model",
    });
  });

  it("accepts optional private error alert email configuration", () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key";
    process.env.RESEND_API_KEY = "resend-key";
    process.env.ERROR_ALERT_EMAIL = "alerts@example.com";
    process.env.ERROR_ALERT_FROM = "AI Academy <alerts@example.com>";

    expect(getServerEnv()).toMatchObject({
      RESEND_API_KEY: "resend-key",
      ERROR_ALERT_EMAIL: "alerts@example.com",
      ERROR_ALERT_FROM: "AI Academy <alerts@example.com>",
    });
  });
});
