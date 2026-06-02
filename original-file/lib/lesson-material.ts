import type { CourseModule, Lesson } from "@/data/types";

export function buildLessonMaterial(lesson: Lesson, courseModule: CourseModule) {
  return {
    explanation: [
      lesson.concept,
      `In ${courseModule.title}, this matters because learners need to turn the idea into repeatable judgment, not just remember a definition.`,
      `The practical test is simple: can you use this lesson to make a better decision, produce a stronger artifact, or avoid a common failure mode in real work?`,
    ],
    workflow: [
      `Name the job: write down the exact outcome this lesson should help you create.`,
      `Choose the smallest useful example from your own work, business, study, or creative project.`,
      `Apply the concept once manually so you understand the moving parts before automating it.`,
      `Use one AI tool from this module to improve the result, then compare the before and after output.`,
      `Save the winning version as a reusable checklist, prompt, template, or operating procedure.`,
    ],
    practice: [
      lesson.exercise,
      `Add one constraint that makes the exercise realistic: a deadline, audience, budget, risk, data source, or quality bar.`,
      `Review your output against three standards: accuracy, usefulness, and whether a real person would trust it.`,
    ],
    deliverable: `A finished ${lesson.title.toLowerCase()} artifact you could show in a portfolio, client conversation, team meeting, or learning journal.`,
    reflection: [
      "What did the AI improve?",
      "Where did human judgment still matter?",
      "What would break if this were used with real users or real business data?",
      "What would you turn into a reusable template for next time?",
    ],
  };
}
