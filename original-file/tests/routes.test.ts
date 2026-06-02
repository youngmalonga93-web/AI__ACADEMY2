import { describe, expect, it } from "vitest";
import { coursePath, lessonPath, loginPath } from "../lib/routes";

describe("route helpers", () => {
  it("builds course and lesson paths", () => {
    expect(coursePath(2)).toBe("/courses/2");
    expect(lessonPath({ id: "anatomy-perfect-prompt" })).toBe("/lessons/anatomy-perfect-prompt");
  });

  it("builds login paths with optional return targets", () => {
    expect(loginPath()).toBe("/login");
    expect(loginPath("/dashboard")).toBe("/login?next=%2Fdashboard");
  });
});
