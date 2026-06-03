import { describe, expect, it } from "vitest";
import { modules } from "../data/content";
import { coursePath, lessonPath, loginPath } from "../lib/routes";

describe("route helpers", () => {
  it("builds course and lesson paths", () => {
    expect(coursePath(2)).toBe("/courses/2");
    expect(lessonPath({ id: "anatomy-perfect-prompt" })).toBe(
      "/lessons/anatomy-perfect-prompt"
    );
  });

  it("builds login paths with optional return targets", () => {
    expect(loginPath()).toBe("/login");
    expect(loginPath("/dashboard")).toBe("/login?next=%2Fdashboard");
  });

  it("covers every module and lesson with internal app routes", () => {
    const courseLinks = modules.map((module) => coursePath(module.id));
    const lessonLinks = modules.flatMap((module) =>
      module.lessons.map((lesson) => lessonPath(lesson))
    );

    expect(courseLinks).toHaveLength(18);
    expect(lessonLinks).toHaveLength(106);
    expect(courseLinks.every((path) => /^\/courses\/\d+$/.test(path))).toBe(
      true
    );
    expect(
      lessonLinks.every((path) => /^\/lessons\/[a-z0-9-]+$/.test(path))
    ).toBe(true);
    expect(["/pricing", "/prompts", "/careers"]).toContain("/pricing");
  });
});
