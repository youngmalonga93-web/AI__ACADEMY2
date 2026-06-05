import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
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

const approvedCourseReferenceHosts = [
  "www.deeplearning.ai",
  "learn.deeplearning.ai",
  "developers.google.com",
  "huggingface.co",
  "www.coursera.org",
  "cs50.harvard.edu",
  "course.fast.ai",
  "platform.openai.com",
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
        expect(
          material.establishedCourseReferences.length
        ).toBeGreaterThanOrEqual(3);
        expect(material.workingPromptExample.prompt).toContain("My context:");
        expect(material.workingPromptExample.prompt).toContain(
          "Output format:"
        );
        expect(
          material.workingPromptExample.whyItWorks.length
        ).toBeGreaterThanOrEqual(3);
        expect(material.appliedTrainingLab.title.length).toBeGreaterThan(10);
        expect(material.appliedTrainingLab.scenario.length).toBeGreaterThan(40);
        expect(material.appliedTrainingLab.steps.length).toBeGreaterThanOrEqual(
          4
        );
        expect(material.appliedTrainingLab.promptStarter).toContain(
          "My real context:"
        );
        expect(material.quiz.length).toBeGreaterThanOrEqual(3);
        expect(material.rubric.length).toBeGreaterThanOrEqual(4);

        for (const video of material.recommendedVideos) {
          const host = new URL(video.url).host;
          expect(approvedResourceHosts).toContain(host);
          expect(video.channel.length).toBeGreaterThan(2);
          expect(video.fit.length).toBeGreaterThan(20);
        }

        for (const reference of material.establishedCourseReferences) {
          const host = new URL(reference.url).host;
          expect(approvedCourseReferenceHosts).toContain(host);
          expect(reference.fit.length).toBeGreaterThan(30);
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

  it("shows a clear coming-soon disclosure for original video lessons", () => {
    const lessonPageSource = readFileSync(
      "app/lessons/[slug]/page.tsx",
      "utf8"
    );

    expect(lessonPageSource).toContain("Videos coming soon");
    expect(lessonPageSource).toContain(
      "Original AI Academy video lessons are in production."
    );
    expect(lessonPageSource).toContain(
      "written lesson, applied lab, worksheet, working prompt"
    );
  });

  it("routes social logins through the client callback for accessible errors", () => {
    const authFormSource = readFileSync("components/auth/AuthForm.tsx", "utf8");
    const clientCallbackSource = readFileSync(
      "app/auth/client-callback/page.tsx",
      "utf8"
    );

    expect(authFormSource).toContain("/auth/start");
    expect(clientCallbackSource).toContain("/auth/callback");
    expect(authFormSource).toContain("Continue with");
    expect(clientCallbackSource).toContain("window.location.hash");
    expect(clientCallbackSource).toContain("email signup");
    expect(authFormSource).toContain("Continue with {provider.label}");
    expect(authFormSource).not.toContain("Continue with GitHub");
  });

  it("keeps public launch pages free of stale demo and disabled-provider CTAs", () => {
    const homepageSource = readFileSync("app/page.tsx", "utf8");
    const pricingSource = readFileSync("app/pricing/page.tsx", "utf8");

    expect(homepageSource).not.toContain("Open Module 1 demo");
    expect(homepageSource).not.toContain("Create demo learner");
    expect(homepageSource).not.toContain("Demo path");
    expect(pricingSource).not.toContain("Investor demo templates");
    expect(pricingSource).not.toContain("CheckoutButton");
  });

  it("keeps protected AI workflows visible in navigation and QA", () => {
    const layoutSource = readFileSync("app/layout.tsx", "utf8");
    const qaSource = readFileSync("scripts/qa-site.mjs", "utf8");

    expect(layoutSource).toContain("/coach");
    expect(layoutSource).toContain("/advisor");
    expect(layoutSource).toContain("/reviewer");
    expect(qaSource).toContain("/coach");
    expect(qaSource).toContain("/advisor");
    expect(qaSource).toContain("/reviewer");
  });

  it("shows user-facing error messages in page and global fallbacks", () => {
    const errorPageSource = readFileSync("app/error.tsx", "utf8");
    const globalErrorSource = readFileSync("app/global-error.tsx", "utf8");
    const errorMessageSource = readFileSync(
      "components/ui/error-message.tsx",
      "utf8"
    );

    expect(errorPageSource).toContain("<ErrorMessage");
    expect(errorPageSource).toContain("error.digest");
    expect(errorPageSource).toContain("/api/errors/client");
    expect(errorPageSource).not.toContain("message={error.message}");
    expect(globalErrorSource).toContain('role="alert"');
    expect(globalErrorSource).toContain("Error code:");
    expect(globalErrorSource).toContain("/api/errors/client");
    expect(errorMessageSource).toContain('role="alert"');
  });
});
