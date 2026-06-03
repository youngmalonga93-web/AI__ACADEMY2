import fullContent from "./full-content.json";
import { additionalPrompts } from "./additional-prompts";
import { moduleEnrichments } from "./enrichment";
import { expandedPrompts } from "./prompt-expansion";
import type {
  CareerPath,
  Certification,
  CourseModule,
  Phase,
  PromptCategory,
  PromptTemplate,
  ToolDefinition,
} from "./types";

export const phases = fullContent.phases as Phase[];
export const modules = fullContent.modules.map((module) => ({
  ...module,
  ...moduleEnrichments[module.id],
})) as CourseModule[];
export const promptCategories =
  fullContent.promptCategories as PromptCategory[];
export const tools = fullContent.tools as ToolDefinition[];
export const prompts = [
  ...(fullContent.prompts as PromptTemplate[]),
  ...additionalPrompts,
  ...expandedPrompts,
];
export const certifications = fullContent.certifications as Certification[];
export const careerPaths = fullContent.careerPaths as CareerPath[];

export function getModuleById(id: number) {
  return modules.find((module) => module.id === id);
}

export function getLessonBySlug(slug: string) {
  return modules
    .flatMap((module) => module.lessons)
    .find((lesson) => lesson.id === slug);
}

export function getModuleForLesson(slug: string) {
  return modules.find((module) =>
    module.lessons.some((lesson) => lesson.id === slug)
  );
}
