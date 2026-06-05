import { describe, expect, it } from "vitest";
import { getPublicAuthErrorMessage } from "../lib/auth-errors";

describe("public auth error messages", () => {
  it("shows a safe email-confirmation message", () => {
    expect(
      getPublicAuthErrorMessage({ message: "Email not confirmed" }, "login")
    ).toContain("Confirm your email");
  });

  it("shows a safe invalid credentials message", () => {
    expect(
      getPublicAuthErrorMessage(
        { message: "Invalid login credentials" },
        "login"
      )
    ).toBe("Invalid email or password.");
  });

  it("shows a safe existing account message", () => {
    expect(
      getPublicAuthErrorMessage(
        { message: "User already registered" },
        "signup"
      )
    ).toContain("already exists");
  });

  it("does not expose unknown backend auth details", () => {
    expect(
      getPublicAuthErrorMessage(
        { message: "database connection leaked internal detail" },
        "signup"
      )
    ).toBe(
      "We could not create this account. Check your email and password, then try again."
    );
  });
});
