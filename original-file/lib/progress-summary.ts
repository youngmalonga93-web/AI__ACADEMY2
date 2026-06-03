import type { CourseModule } from "@/data/types";
import { calculateProgressPercent } from "./progress";

export type CompletedLesson = {
  slug: string;
  title: string;
  lessonNumber: string;
  moduleId: number;
  completedAt: string;
};

export function summarizeModuleProgress(
  modules: CourseModule[],
  completedLessons: CompletedLesson[]
) {
  const completedSlugs = new Set(completedLessons.map((lesson) => lesson.slug));

  return modules.map((module) => {
    const completedCount = module.lessons.filter((lesson) =>
      completedSlugs.has(lesson.id)
    ).length;

    return {
      moduleId: module.id,
      title: module.title,
      completedCount,
      totalCount: module.lessons.length,
      percent: calculateProgressPercent(completedCount, module.lessons.length),
    };
  });
}

export function getNextLesson(
  modules: CourseModule[],
  completedLessons: CompletedLesson[]
) {
  const completedSlugs = new Set(completedLessons.map((lesson) => lesson.slug));

  return modules
    .flatMap((module) => module.lessons)
    .find((lesson) => !completedSlugs.has(lesson.id));
}
