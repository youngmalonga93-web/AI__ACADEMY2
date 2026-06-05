import { describe, expect, it } from "vitest";
import { getOAuthProviderLabel, oauthProviders } from "../lib/auth-providers";

describe("auth providers", () => {
  it("keeps launch social login providers explicit and labeled", () => {
    expect(oauthProviders.map((provider) => provider.id)).toEqual(["google"]);
    expect(getOAuthProviderLabel("google")).toBe("Google");
  });

  it("uses a safe fallback label for unknown providers", () => {
    expect(getOAuthProviderLabel("linkedin")).toBe("third-party provider");
    expect(getOAuthProviderLabel(null)).toBe("third-party provider");
  });
});
