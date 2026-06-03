import { describe, expect, it } from "vitest";
import { modules } from "../data/content";
import { moduleEnrichments } from "../data/enrichment";
import { buildLessonMaterial } from "../lib/lesson-material";
import { coursePath, lessonPath } from "../lib/routes";

const approvedResourceHosts = [
  "www.youtube.com",
  "youtu.be",
  "learn.deeplearning.ai",
  "platform.openai.com",
  "huggingface.co",
  "developer.nvidia.com",
];

describe("site quality guardrails", () => {
  it("keeps every course and lesson route internally resolvable", () => {
    const moduleIds = new Set(modules.map((module) => module.id));
    const lessonIds = new Set(
      modules.flatMap((module) => module.lessons.map((lesson) => lesson.id))
    );

    for (const courseModule of modules) {
      expect(coursePath(courseModule.id)).toBe(`/courses/${courseModule.id}`);
      expect(moduleIds.has(courseModule.id)).toBe(true);

      for (const lesson of courseModule.lessons) {
        expect(lessonPath(lesson)).toBe(`/lessons/${lesson.id}`);
        expect(lessonIds.has(lesson.id)).toBe(true);
      }
    }
  });

  it("links every lesson to approved third-party teachings with shout outs", () => {
    for (const courseModule of modules) {
      for (const lesson of courseModule.lessons) {
        const material = buildLessonMaterial(lesson, courseModule);

        expect(material.recommendedVideos.length).toBeGreaterThanOrEqual(2);
        expect(material.sourceCredits.length).toBeGreaterThanOrEqual(2);
        expect(material.quiz.length).toBeGreaterThanOrEqual(3);
        expect(material.rubric.length).toBeGreaterThanOrEqual(4);

        for (const video of material.recommendedVideos) {
          const host = new URL(video.url).host;
          expect(approvedResourceHosts).toContain(host);
          expect(video.channel.length).toBeGreaterThan(2);
          expect(video.fit.length).toBeGreaterThan(20);
        }
      }
    }
  });

  it("keeps module enrichments aligned to the correct modules", () => {
    expect(moduleEnrichments[6].realWorldExamples?.join(" ")).toContain(
      "Zapier/Make"
    );
    expect(moduleEnrichments[7].realWorldExamples?.join(" ")).toContain(
      "sales"
    );
    expect(moduleEnrichments[10].masteryChecks?.join(" ")).toContain(
      "retrieval"
    );
    expect(moduleEnrichments[15].realWorldExamples?.join(" ")).toContain(
      "local models"
    );
  });
});
