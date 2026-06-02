import { describe, expect, it } from "vitest";
import { getLessonBySlug, getModuleById, getModuleForLesson, modules, prompts } from "../data/content";

describe("content data utilities", () => {
  it("finds modules by numeric id", () => {
    expect(getModuleById(1)?.title).toBe("The AI Operating System");
    expect(getModuleById(999)).toBeUndefined();
  });

  it("finds lessons and their owning modules by slug", () => {
    const lesson = getLessonBySlug("anatomy-perfect-prompt");

    expect(lesson?.number).toBe("2.1");
    expect(getModuleForLesson("anatomy-perfect-prompt")?.id).toBe(2);
  });

  it("keeps seed content connected enough for first routes", () => {
    expect(modules.length).toBeGreaterThanOrEqual(4);
    expect(prompts.length).toBeGreaterThanOrEqual(4);
    expect(modules.every((module) => module.lessons.length > 0)).toBe(true);
  });
});
