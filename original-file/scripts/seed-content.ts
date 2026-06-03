import dotenv from "dotenv";
import { createSupabaseAdminClient } from "../lib/supabase/admin";
import {
  certifications,
  modules,
  promptCategories,
  prompts,
  tools,
} from "../data/content";

dotenv.config({ path: ".env.local" });

async function seedContent() {
  const supabase = createSupabaseAdminClient();

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .upsert(
      {
        slug: "ai-mastery-academy",
        title: "AI Mastery Academy",
        subtitle:
          "Practical AI education for builders, operators, and professionals.",
        description:
          "A production curriculum covering AI foundations, prompting, productivity, content systems, and applied AI workflows.",
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single();

  if (courseError) {
    throw courseError;
  }

  if (!course) {
    throw new Error("Failed to create or load seed course.");
  }

  const { error: modulesError } = await supabase.from("modules").upsert(
    modules.map((module, index) => ({
      id: module.id,
      course_id: course.id,
      phase: module.phase,
      title: module.title,
      subtitle: module.subtitle,
      duration: module.duration,
      difficulty: module.difficulty,
      lesson_count: module.lessonCount,
      display_order: index + 1,
      objectives: module.objectives,
      skills: module.skills,
      key_takeaways: module.keyTakeaways,
      common_mistakes: module.commonMistakes,
    }))
  );

  if (modulesError) {
    throw modulesError;
  }

  const { error: lessonsError } = await supabase.from("lessons").upsert(
    modules.flatMap((module) =>
      module.lessons.map((lesson, index) => ({
        module_id: module.id,
        slug: lesson.id,
        lesson_number: lesson.number,
        title: lesson.title,
        hook: lesson.hook,
        concept: lesson.concept,
        application: lesson.application,
        exercise: lesson.exercise,
        duration: lesson.duration,
        display_order: index + 1,
      }))
    ),
    { onConflict: "slug" }
  );

  if (lessonsError) {
    throw lessonsError;
  }

  const moduleIds = modules.map((module) => module.id);

  const { error: deleteProjectsError } = await supabase
    .from("projects")
    .delete()
    .in("module_id", moduleIds);

  if (deleteProjectsError) {
    throw deleteProjectsError;
  }

  const { error: projectsError } = await supabase.from("projects").insert(
    modules.map((module) => ({
      module_id: module.id,
      title: module.project.title,
      description: module.project.description,
      deliverable: module.project.deliverable,
    }))
  );

  if (projectsError) {
    throw projectsError;
  }

  const { error: categoriesError } = await supabase
    .from("prompt_categories")
    .upsert(
      promptCategories
        .filter((category) => category.id !== "all")
        .map((category) => ({
          id: category.id,
          label: category.label,
          icon: category.icon,
        }))
    );

  if (categoriesError) {
    throw categoriesError;
  }

  const { error: toolsError } = await supabase.from("prompt_tools").upsert(
    tools.map((tool) => ({
      id: tool.id,
      label: tool.label,
      color: tool.color,
    }))
  );

  if (toolsError) {
    throw toolsError;
  }

  const { error: promptsError } = await supabase
    .from("prompt_templates")
    .upsert(
      prompts.map((prompt) => ({
        id: prompt.id,
        category_id: prompt.category,
        tier: prompt.tier,
        title: prompt.title,
        task: prompt.task,
        prompt: prompt.prompt,
        tags: prompt.tags,
        tip: prompt.tip,
      }))
    );

  if (promptsError) {
    throw promptsError;
  }

  const { error: promptToolsError } = await supabase
    .from("prompt_template_tools")
    .upsert(
      prompts.flatMap((prompt) =>
        prompt.tools.map((toolId) => ({
          prompt_template_id: prompt.id,
          prompt_tool_id: toolId,
        }))
      )
    );

  if (promptToolsError) {
    throw promptToolsError;
  }

  const { error: certificationsError } = await supabase
    .from("certifications")
    .upsert(
      certifications.map((certification) => ({
        level: certification.level,
        name: certification.name,
        color: certification.color,
        modules: certification.modules,
        requirement: certification.requirement,
        outcome: certification.outcome,
      })),
      { onConflict: "level" }
    );

  if (certificationsError) {
    throw certificationsError;
  }

  console.log("Seeded AI Academy content successfully.");
}

seedContent().catch((error) => {
  console.error(error);
  process.exit(1);
});
