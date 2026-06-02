import { describe, expect, it } from "vitest";
import type { CourseModule } from "../data/types";
import { filterCourses } from "../lib/courses";
import { getNextLesson, summarizeModuleProgress, type CompletedLesson } from "../lib/progress-summary";

const modules: CourseModule[] = [
  {
    id: 1,
    phase: "foundation",
    icon: "Brain",
    title: "AI Fundamentals",
    subtitle: "Build a practical base",
    duration: "2 hours",
    difficulty: "Beginner",
    lessonCount: 2,
    objectives: ["Explain model behavior"],
    lessons: [
      {
        id: "intro",
        moduleId: 1,
        number: "1.1",
        title: "Intro to AI",
        hook: "",
        concept: "",
        application: "",
        exercise: "",
        duration: "20 min",
      },
      {
        id: "prompting",
        moduleId: 1,
        number: "1.2",
        title: "Prompting",
        hook: "",
        concept: "",
        application: "",
        exercise: "",
        duration: "20 min",
      },
    ],
    project: {
      title: "AI briefing",
      description: "Create a briefing",
      deliverable: "Brief",
    },
    tools: ["ChatGPT"],
    skills: ["Prompting"],
    keyTakeaways: [],
    commonMistakes: [],
  },
  {
    id: 2,
    phase: "advanced",
    icon: "Bot",
    title: "Agent Systems",
    subtitle: "Design production agents",
    duration: "3 hours",
    difficulty: "Advanced",
    lessonCount: 1,
    objectives: ["Ship agent workflows"],
    lessons: [
      {
        id: "agents",
        moduleId: 2,
        number: "2.1",
        title: "Agent architecture",
        hook: "",
        concept: "",
        application: "",
        exercise: "",
        duration: "30 min",
      },
    ],
    project: {
      title: "Agent workflow",
      description: "Build an agent workflow",
      deliverable: "Workflow",
    },
    tools: ["Claude"],
    skills: ["Agents"],
    keyTakeaways: [],
    commonMistakes: [],
  },
];

describe("course filters", () => {
  it("filters by query, phase, difficulty, and tool", () => {
    expect(filterCourses(modules, { query: "agent" }).map((module) => module.id)).toEqual([2]);
    expect(filterCourses(modules, { phase: "foundation" }).map((module) => module.id)).toEqual([1]);
    expect(filterCourses(modules, { difficulty: "Advanced", tool: "Claude" }).map((module) => module.id)).toEqual([2]);
  });

  it("returns every module when no filters are active", () => {
    expect(filterCourses(modules, {}).map((module) => module.id)).toEqual([1, 2]);
  });
});

describe("course progress summaries", () => {
  const completedLessons: CompletedLesson[] = [
    {
      slug: "intro",
      title: "Intro to AI",
      lessonNumber: "1.1",
      moduleId: 1,
      completedAt: "2026-06-02T12:00:00.000Z",
    },
  ];

  it("summarizes module completion percentages", () => {
    expect(summarizeModuleProgress(modules, completedLessons)).toMatchObject([
      { moduleId: 1, completedCount: 1, totalCount: 2, percent: 50 },
      { moduleId: 2, completedCount: 0, totalCount: 1, percent: 0 },
    ]);
  });

  it("finds the next incomplete lesson in course order", () => {
    expect(getNextLesson(modules, completedLessons)?.id).toBe("prompting");
  });
});
