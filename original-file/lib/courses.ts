import type { CourseModule } from "@/data/types";

export type CourseFilters = {
  query?: string;
  phase?: string;
  difficulty?: string;
  tool?: string;
};

export function filterCourses(modules: CourseModule[], filters: CourseFilters) {
  const query = filters.query?.trim().toLowerCase() ?? "";
  const phase = filters.phase ?? "all";
  const difficulty = filters.difficulty ?? "all";
  const tool = filters.tool ?? "all";

  return modules.filter((module) => {
    const haystack = [module.title, module.subtitle, module.difficulty, module.phase, ...module.objectives, ...module.skills, ...module.tools]
      .join(" ")
      .toLowerCase();

    const matchesQuery = query.length === 0 || haystack.includes(query);
    const matchesPhase = phase === "all" || module.phase === phase;
    const matchesDifficulty = difficulty === "all" || module.difficulty === difficulty;
    const matchesTool = tool === "all" || module.tools.includes(tool);

    return matchesQuery && matchesPhase && matchesDifficulty && matchesTool;
  });
}
