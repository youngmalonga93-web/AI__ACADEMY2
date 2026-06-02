import type { Lesson } from "@/data/types";

export function coursePath(moduleId: number) {
  return `/courses/${moduleId}`;
}

export function lessonPath(lesson: Pick<Lesson, "id">) {
  return `/lessons/${lesson.id}`;
}

export function loginPath(next?: string) {
  if (!next) {
    return "/login";
  }

  return `/login?next=${encodeURIComponent(next)}`;
}
