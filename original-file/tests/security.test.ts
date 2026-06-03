import { describe, expect, it } from "vitest";
import { getSafeRedirectPath } from "../lib/security";

describe("security helpers", () => {
  it("allows safe internal redirect paths", () => {
    expect(getSafeRedirectPath("/dashboard?tab=progress")).toBe(
      "/dashboard?tab=progress"
    );
    expect(getSafeRedirectPath("/courses/1#lessons")).toBe(
      "/courses/1#lessons"
    );
  });

  it("blocks external and protocol-relative redirects", () => {
    expect(getSafeRedirectPath("https://example.com/phish")).toBe("/dashboard");
    expect(getSafeRedirectPath("//example.com/phish")).toBe("/dashboard");
    expect(getSafeRedirectPath(null)).toBe("/dashboard");
  });
});
