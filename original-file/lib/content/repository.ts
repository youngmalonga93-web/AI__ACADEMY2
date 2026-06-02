import { createClient } from "@supabase/supabase-js";
import {
  careerPaths as localCareerPaths,
  certifications as localCertifications,
  modules as localModules,
  phases as localPhases,
  promptCategories as localPromptCategories,
  prompts as localPrompts,
  tools as localTools,
} from "@/data/content";
import { moduleEnrichments } from "@/data/enrichment";
import type { CourseModule, Lesson, PromptCategory, PromptTemplate, ToolDefinition } from "@/data/types";

type ModuleRow = {
  id: number;
  phase: CourseModule["phase"];
  title: string;
  subtitle: string | null;
  duration: string | null;
  difficulty: string | null;
  lesson_count: number;
  display_order: number;
  objectives: string[];
  skills: string[];
  key_takeaways: string[];
  common_mistakes: string[];
};

type LessonRow = {
  module_id: number;
  slug: string;
  lesson_number: string;
  title: string;
  hook: string | null;
  concept: string | null;
  application: string | null;
  exercise: string | null;
  duration: string | null;
  display_order: number;
};

type ProjectRow = {
  module_id: number;
  title: string;
  description: string | null;
  deliverable: string | null;
};

type PromptTemplateRow = {
  id: number;
  category_id: string;
  tier: PromptTemplate["tier"];
  title: string;
  task: string;
  prompt: string;
  tags: string[];
  tip: string | null;
};

type PromptTemplateToolRow = {
  prompt_template_id: number;
  prompt_tool_id: string;
};

function createPublicContentClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function mapModules(moduleRows: ModuleRow[], lessonRows: LessonRow[], projectRows: ProjectRow[]): CourseModule[] {
  return moduleRows
    .sort((a, b) => a.display_order - b.display_order)
    .map((module) => {
      const lessons: Lesson[] = lessonRows
        .filter((lesson) => lesson.module_id === module.id)
        .sort((a, b) => a.display_order - b.display_order)
        .map((lesson) => ({
          id: lesson.slug,
          moduleId: lesson.module_id,
          number: lesson.lesson_number,
          title: lesson.title,
          hook: lesson.hook ?? "",
          concept: lesson.concept ?? "",
          application: lesson.application ?? "",
          exercise: lesson.exercise ?? "",
          duration: lesson.duration ?? "",
        }));

      const project = projectRows.find((item) => item.module_id === module.id);

      return {
        id: module.id,
        phase: module.phase,
        icon: String(module.id).padStart(2, "0"),
        title: module.title,
        subtitle: module.subtitle ?? "",
        duration: module.duration ?? "",
        difficulty: module.difficulty ?? "",
        lessonCount: module.lesson_count,
        objectives: module.objectives ?? [],
        lessons,
        project: {
          title: project?.title ?? `${module.title} Project`,
          description: project?.description ?? "",
          deliverable: project?.deliverable ?? "",
        },
        tools: localModules.find((item) => item.id === module.id)?.tools ?? [],
        skills: module.skills ?? [],
        keyTakeaways: module.key_takeaways ?? [],
        commonMistakes: module.common_mistakes ?? [],
        ...moduleEnrichments[module.id],
      };
    });
}

export async function getCourseModules(): Promise<CourseModule[]> {
  const supabase = createPublicContentClient();

  if (!supabase) {
    return localModules;
  }

  try {
    const [modulesResult, lessonsResult, projectsResult] = await Promise.all([
      supabase.from("modules").select("*").order("display_order"),
      supabase.from("lessons").select("*").order("display_order"),
      supabase.from("projects").select("*"),
    ]);

    if (modulesResult.error || lessonsResult.error || projectsResult.error) {
      return localModules;
    }

    return mapModules(
      (modulesResult.data ?? []) as ModuleRow[],
      (lessonsResult.data ?? []) as LessonRow[],
      (projectsResult.data ?? []) as ProjectRow[]
    );
  } catch {
    return localModules;
  }
}

export async function getCourseModuleById(id: number) {
  return (await getCourseModules()).find((module) => module.id === id);
}

export async function getLessonBySlugFromContent(slug: string) {
  return (await getCourseModules()).flatMap((module) => module.lessons).find((lesson) => lesson.id === slug);
}

export async function getModuleForLessonFromContent(slug: string) {
  return (await getCourseModules()).find((module) => module.lessons.some((lesson) => lesson.id === slug));
}

export async function getPromptVaultContent(): Promise<{
  categories: PromptCategory[];
  prompts: PromptTemplate[];
  tools: ToolDefinition[];
}> {
  const supabase = createPublicContentClient();

  if (!supabase) {
    return { categories: localPromptCategories, prompts: localPrompts, tools: localTools };
  }

  try {
    const [categoriesResult, toolsResult, promptsResult, promptToolsResult] = await Promise.all([
      supabase.from("prompt_categories").select("*"),
      supabase.from("prompt_tools").select("*"),
      supabase.from("prompt_templates").select("*").order("id"),
      supabase.from("prompt_template_tools").select("*"),
    ]);

    if (categoriesResult.error || toolsResult.error || promptsResult.error || promptToolsResult.error) {
      return { categories: localPromptCategories, prompts: localPrompts, tools: localTools };
    }

    const categories: PromptCategory[] = [
      localPromptCategories.find((category) => category.id === "all") ?? { id: "all", label: "All Prompts", icon: "all" },
      ...((categoriesResult.data ?? []) as Array<{ id: string; label: string; icon: string | null }>).map((category) => ({
        id: category.id,
        label: category.label,
        icon: category.icon ?? category.id,
      })),
    ];

    const tools: ToolDefinition[] = ((toolsResult.data ?? []) as Array<{ id: string; label: string; color: string | null }>).map((tool) => ({
      id: tool.id,
      label: tool.label,
      color: tool.color ?? "#525252",
    }));

    const promptTools = (promptToolsResult.data ?? []) as PromptTemplateToolRow[];
    const prompts: PromptTemplate[] = ((promptsResult.data ?? []) as PromptTemplateRow[]).map((prompt) => ({
      id: prompt.id,
      category: prompt.category_id,
      tier: prompt.tier,
      title: prompt.title,
      task: prompt.task,
      prompt: prompt.prompt,
      tags: prompt.tags ?? [],
      tip: prompt.tip ?? undefined,
      tools: promptTools.filter((item) => item.prompt_template_id === prompt.id).map((item) => item.prompt_tool_id),
    }));

    const promptIds = new Set(prompts.map((prompt) => prompt.id));
    const mergedPrompts = [...prompts, ...localPrompts.filter((prompt) => !promptIds.has(prompt.id))];

    return { categories, prompts: mergedPrompts, tools };
  } catch {
    return { categories: localPromptCategories, prompts: localPrompts, tools: localTools };
  }
}

export async function getLandingContent() {
  const modules = await getCourseModules();
  const { prompts } = await getPromptVaultContent();

  return {
    modules,
    prompts,
    certifications: localCertifications,
    careerPaths: localCareerPaths,
    phases: localPhases,
  };
}
