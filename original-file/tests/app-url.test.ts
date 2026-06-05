import { afterEach, describe, expect, it } from "vitest";
import { getConfiguredAppUrl } from "../lib/app-url";

const originalEnv = process.env;

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("configured app URL", () => {
  it("uses NEXT_PUBLIC_APP_URL when it is a full URL", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://ai-academy.example.com/path";

    expect(getConfiguredAppUrl("http://localhost:3000")).toBe(
      "https://ai-academy.example.com"
    );
  });

  it("accepts bare Vercel domains without crashing auth routes", () => {
    process.env.NEXT_PUBLIC_APP_URL = "ai-academy-h8r2.vercel.app";

    expect(getConfiguredAppUrl("http://localhost:3000")).toBe(
      "https://ai-academy-h8r2.vercel.app"
    );
  });

  it("falls back when configured URL is invalid", () => {
    process.env.NEXT_PUBLIC_APP_URL = "http://";
    process.env.VERCEL_URL = "";

    expect(getConfiguredAppUrl("https://fallback.example.com")).toBe(
      "https://fallback.example.com"
    );
  });
});
