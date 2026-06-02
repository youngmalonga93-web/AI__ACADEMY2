export type PhaseId = "foundation" | "intermediate" | "advanced" | "expert";

export type Phase = {
  id: PhaseId;
  label: string;
  order: number;
  accent: string;
};

export type Lesson = {
  id: string;
  moduleId: number;
  number: string;
  title: string;
  hook: string;
  concept: string;
  application: string;
  exercise: string;
  duration: string;
};

export type CourseModule = {
  id: number;
  phase: PhaseId;
  icon: string;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: string;
  lessonCount: number;
  objectives: string[];
  lessons: Lesson[];
  project: {
    title: string;
    description: string;
    deliverable: string;
  };
  tools: string[];
  skills: string[];
  keyTakeaways: string[];
  commonMistakes: string[];
};

export type PromptTier = "POWER" | "ADVANCED" | "ESSENTIAL";

export type PromptCategory = {
  id: string;
  label: string;
  icon: string;
};

export type PromptTemplate = {
  id: number;
  category: string;
  tier: PromptTier;
  title: string;
  task: string;
  tools: string[];
  prompt: string;
  tags: string[];
  tip?: string;
};

export type ToolDefinition = {
  id: string;
  label: string;
  color: string;
};

export type Certification = {
  level: number;
  name: string;
  color: string;
  modules: string;
  requirement: string;
  outcome: string;
};

export type CareerPath = {
  title: string;
  salary: string;
  modulePath: string;
  color: string;
  description: string;
};
