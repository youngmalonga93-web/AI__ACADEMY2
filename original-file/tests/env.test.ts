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
});
