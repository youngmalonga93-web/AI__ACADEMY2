import { describe, expect, it } from "vitest";
import { getLessonBySlug, getModuleForLesson } from "../data/content";
import { buildLessonMaterial } from "../lib/lesson-material";

describe("lesson material", () => {
  it("adds deep custom material for module one lessons", () => {
    const lesson = getLessonBySlug("what-ai-really-is");
    const courseModule = getModuleForLesson("what-ai-really-is");

    expect(lesson).toBeDefined();
    expect(courseModule).toBeDefined();

    const material = buildLessonMaterial(lesson!, courseModule!);

    expect(material.explanation.length).toBeGreaterThanOrEqual(4);
    expect(material.workflow.length).toBeGreaterThanOrEqual(6);
    expect(material.videoPlan.length).toBeGreaterThanOrEqual(5);
    expect(material.recommendedVideos.length).toBeGreaterThanOrEqual(2);
    expect(material.sourceCredits.length).toBeGreaterThanOrEqual(2);
    expect(material.quiz.length).toBeGreaterThanOrEqual(3);
    expect(material.rubric.length).toBeGreaterThanOrEqual(4);
    expect(material.worksheet.sections).toContain("Verification source");
  });

  it("adds expanded module-specific material for later modules", () => {
    const lesson = getLessonBySlug("anatomy-perfect-prompt");
    const courseModule = getModuleForLesson("anatomy-perfect-prompt");

    expect(lesson).toBeDefined();
    expect(courseModule).toBeDefined();

    const material = buildLessonMaterial(lesson!, courseModule!);

    expect(material.worksheet.title).toBe(
      "Anatomy of a Perfect Prompt Worksheet"
    );
    expect(material.videoPlan.length).toBeGreaterThanOrEqual(7);
    expect(material.workflow.length).toBeGreaterThanOrEqual(8);
    expect(material.recommendedVideos.length).toBeGreaterThanOrEqual(2);
    expect(
      material.recommendedVideos.every((video) =>
        video.url.startsWith("https://")
      )
    ).toBe(true);
    expect(material.quiz.map((question) => question.answer)).toContain(
      "Produce a reusable artifact or decision improvement"
    );
    expect(material.rubric.map((item) => item.criterion)).toContain(
      "Portfolio readiness"
    );
    expect(material.worksheet.sections).toContain("Portfolio proof");
  });
});
