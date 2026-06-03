import type { PromptTemplate } from "@/data/types";

export type PromptFilters = {
  query?: string;
  category?: string;
  tool?: string;
};

export function filterPrompts(
  prompts: PromptTemplate[],
  filters: PromptFilters
) {
  const normalizedQuery = filters.query?.trim().toLowerCase() ?? "";
  const category = filters.category ?? "all";
  const tool = filters.tool ?? "all";

  return prompts.filter((prompt) => {
    const matchesCategory = category === "all" || prompt.category === category;
    const matchesTool = tool === "all" || prompt.tools.includes(tool);
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [prompt.title, prompt.task, prompt.prompt, ...prompt.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    return matchesCategory && matchesTool && matchesQuery;
  });
}
