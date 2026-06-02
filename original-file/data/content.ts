import type { CareerPath, Certification, CourseModule, Phase, PromptCategory, PromptTemplate, ToolDefinition } from "./types";

export const phases: Phase[] = [
  { id: "foundation", label: "Foundation", order: 1, accent: "#16a34a" },
  { id: "intermediate", label: "Intermediate", order: 2, accent: "#ca8a04" },
  { id: "advanced", label: "Advanced", order: 3, accent: "#ea580c" },
  { id: "expert", label: "Expert", order: 4, accent: "#7c3aed" },
];

export const modules: CourseModule[] = [
  {
    id: 1,
    phase: "foundation",
    icon: "01",
    title: "The AI Operating System",
    subtitle: "Understand the intelligence revolution from first principles",
    duration: "6 hrs",
    difficulty: "Beginner",
    lessonCount: 12,
    objectives: [
      "Understand what AI is and is not at a fundamental level",
      "Map the modern AI landscape with confidence",
      "Install and configure a complete AI stack",
      "Run the first meaningful AI interaction",
    ],
    lessons: [
      {
        id: "what-ai-really-is",
        moduleId: 1,
        number: "1.1",
        title: "What AI Really Is",
        hook: "You've been lied to about AI. Here is the practical truth.",
        concept: "AI as probabilistic pattern matching rather than magic. Narrow AI, LLMs, and the gap between intelligence and understanding.",
        application: "Understand why ChatGPT can confidently make mistakes and how to catch them.",
        exercise: "Quiz an AI on 10 topics until it produces errors. Document every failure mode.",
        duration: "22 min",
      },
      {
        id: "ai-landscape-map",
        moduleId: 1,
        number: "1.2",
        title: "The AI Landscape Map",
        hook: "Thousands of AI tools exist. Operators need a map, not a pile.",
        concept: "Taxonomy of LLMs, image generation, audio, video, agents, specialized models, and multimodal systems.",
        application: "Pick the correct tool category for a task in under 60 seconds.",
        exercise: "Map 10 real-world problems to the correct AI tool category and refine the choices.",
        duration: "28 min",
      },
    ],
    project: {
      title: "AI Capability Audit",
      description: "Evaluate 10 AI tools against 20 real tasks from the learner's work.",
      deliverable: "A personal AI toolkit manifesto with tool selections, use cases, and cost estimates.",
    },
    tools: ["ChatGPT-4o", "Claude Sonnet", "Gemini", "Perplexity"],
    skills: ["AI literacy", "Tool selection", "Cost awareness", "Critical evaluation"],
    keyTakeaways: ["AI is pattern matching at scale", "The right tool beats the biggest tool", "Verification is mandatory"],
    commonMistakes: ["Treating AI output as ground truth", "Using one tool for every job", "Ignoring context limits"],
  },
  {
    id: 2,
    phase: "foundation",
    icon: "02",
    title: "Prompt Engineering Mastery",
    subtitle: "The highest-leverage skill in the AI age",
    duration: "10 hrs",
    difficulty: "Beginner-Intermediate",
    lessonCount: 18,
    objectives: [
      "Master core prompting frameworks",
      "Build a reusable prompt library",
      "Engineer prompts for consistent production output",
      "Design system prompts and personas",
    ],
    lessons: [
      {
        id: "anatomy-perfect-prompt",
        moduleId: 2,
        number: "2.1",
        title: "Anatomy of a Perfect Prompt",
        hook: "Most bad AI output starts with underspecified human input.",
        concept: "Role, context, instruction, format, and constraints as the backbone of prompt quality.",
        application: "Turn vague requests into precise prompts quickly.",
        exercise: "Rewrite 10 weak prompts and compare the outputs side by side.",
        duration: "30 min",
      },
      {
        id: "prompt-chaining",
        moduleId: 2,
        number: "2.5",
        title: "Prompt Chaining and Pipelines",
        hook: "A chain of prompts turns a tool into a workflow.",
        concept: "Sequential prompting, intermediate outputs, conditional logic, and state passing.",
        application: "Create repeatable content, research, and transformation pipelines.",
        exercise: "Build a five-step research-to-published-post prompt chain.",
        duration: "50 min",
      },
    ],
    project: {
      title: "Professional Prompt Library",
      description: "Build 60 production-ready prompts across business categories.",
      deliverable: "A living prompt library with variables, use cases, and quality benchmarks.",
    },
    tools: ["Claude", "OpenAI Playground", "PromptLayer", "LangSmith"],
    skills: ["Prompt architecture", "Output control", "Persona design", "Security"],
    keyTakeaways: ["Prompt quality drives output quality", "System prompts are product foundations", "Prompt chains create workflows"],
    commonMistakes: ["Writing vague prompts", "Skipping format constraints", "Not testing edge cases"],
  },
  {
    id: 3,
    phase: "foundation",
    icon: "03",
    title: "AI Productivity and Deep Work",
    subtitle: "Reclaim focused time with AI-assisted workflows",
    duration: "8 hrs",
    difficulty: "Beginner",
    lessonCount: 14,
    objectives: ["Automate recurring work", "Build a personal AI second brain", "Create assistants for repeatable tasks", "Measure output gains"],
    lessons: [
      {
        id: "ai-augmented-workday",
        moduleId: 3,
        number: "3.1",
        title: "The AI-Augmented Workday",
        hook: "The best automation starts with a workday audit.",
        concept: "Integration mapping, task frequency, leverage points, and prioritization.",
        application: "Find the highest-return AI opportunities in a workday.",
        exercise: "Record a full workday and identify every AI-assistable task.",
        duration: "25 min",
      },
    ],
    project: {
      title: "Personal AI Operating System",
      description: "Deploy a workflow across email, research, planning, meetings, and learning.",
      deliverable: "A running system saving at least 10 documented hours per week.",
    },
    tools: ["Notion AI", "Otter.ai", "ChatGPT", "Zapier", "NotebookLM"],
    skills: ["Workflow design", "Knowledge management", "Meeting intelligence"],
    keyTakeaways: ["Start with frequent tasks", "Knowledge bases compound", "Measure the time saved"],
    commonMistakes: ["Automating everything at once", "Neglecting knowledge base upkeep", "Skipping measurement"],
  },
  {
    id: 4,
    phase: "intermediate",
    icon: "04",
    title: "AI Content Engine",
    subtitle: "Build a content factory that never sleeps",
    duration: "12 hrs",
    difficulty: "Intermediate",
    lessonCount: 20,
    objectives: ["Build content pipelines", "Master AI writing at scale", "Create distribution systems", "Monetize AI content responsibly"],
    lessons: [
      {
        id: "content-strategy-with-ai",
        moduleId: 4,
        number: "4.1",
        title: "Content Strategy with AI",
        hook: "Publishing quality at scale requires systems.",
        concept: "Content pillars, AI ideation, editorial calendars, and repurposing trees.",
        application: "Build a 90-day content calendar quickly.",
        exercise: "Generate 30 high-quality content ideas from one topic.",
        duration: "40 min",
      },
    ],
    project: {
      title: "Autonomous Content Machine",
      description: "Create an idea-to-distribution content workflow across five platforms.",
      deliverable: "A content engine producing 10 or more pieces per week.",
    },
    tools: ["Claude", "Surfer SEO", "Descript", "Buffer", "Canva AI"],
    skills: ["Content systems", "SEO", "Conversion copywriting", "Distribution"],
    keyTakeaways: ["Scale needs systems", "Every idea should be repurposed", "Voice consistency matters"],
    commonMistakes: ["Publishing without review", "Ignoring platform formats", "Skipping search intent"],
  },
];

export const promptCategories: PromptCategory[] = [
  { id: "all", label: "All Prompts", icon: "all" },
  { id: "writing", label: "Writing", icon: "write" },
  { id: "business", label: "Business", icon: "briefcase" },
  { id: "coding", label: "Coding", icon: "code" },
  { id: "research", label: "Research", icon: "search" },
  { id: "marketing", label: "Marketing", icon: "megaphone" },
];

export const tools: ToolDefinition[] = [
  { id: "claude", label: "Claude", color: "#E8844A" },
  { id: "chatgpt", label: "ChatGPT", color: "#10A37F" },
  { id: "gemini", label: "Gemini", color: "#4285F4" },
  { id: "perplexity", label: "Perplexity", color: "#20B8CD" },
  { id: "cursor", label: "Cursor", color: "#7c3aed" },
];

export const prompts: PromptTemplate[] = [
  {
    id: 1,
    category: "writing",
    tier: "POWER",
    title: "The Expert Voice Transfer",
    task: "Rewrite any content in the authoritative voice of a domain expert.",
    tools: ["claude", "chatgpt"],
    prompt: "Rewrite the following content as a senior expert in [domain]. Preserve the core meaning, remove vague claims, add precise language, and return the revised version plus a short rationale.",
    tags: ["voice", "editing", "writing"],
    tip: "Use a real audience and domain for better style transfer.",
  },
  {
    id: 2,
    category: "business",
    tier: "ADVANCED",
    title: "Business Model Stress Test",
    task: "Pressure-test a business idea for weak assumptions.",
    tools: ["claude", "chatgpt", "gemini"],
    prompt: "Act as a skeptical operator. Analyze this business model, identify the five riskiest assumptions, propose validation tests, and rank the next actions by speed, cost, and signal.",
    tags: ["strategy", "validation", "startup"],
  },
  {
    id: 3,
    category: "coding",
    tier: "ESSENTIAL",
    title: "Code Review Triage",
    task: "Find bugs and risky implementation gaps in a code diff.",
    tools: ["claude", "chatgpt", "cursor"],
    prompt: "Review this code as a senior engineer. Prioritize bugs, regressions, security issues, missing tests, and confusing abstractions. Return findings with severity and file references.",
    tags: ["review", "engineering", "quality"],
  },
  {
    id: 4,
    category: "research",
    tier: "POWER",
    title: "Evidence Map",
    task: "Turn a research question into a structured evidence brief.",
    tools: ["perplexity", "claude", "chatgpt"],
    prompt: "Research this question and produce an evidence map with claims, supporting sources, counter-evidence, confidence, and open questions. Separate facts from inference.",
    tags: ["research", "synthesis", "verification"],
  },
];

export const certifications: Certification[] = [
  { level: 1, name: "AI Foundations", color: "#16a34a", modules: "1-3", requirement: "Modules 1-3 plus exam", outcome: "Core AI literacy and practical tool proficiency" },
  { level: 2, name: "AI Operator", color: "#ca8a04", modules: "1-6", requirement: "Foundation plus applied project", outcome: "Repeatable AI workflows for business execution" },
];

export const careerPaths: CareerPath[] = [
  { title: "AI Engineer", salary: "$160K-$350K", modulePath: "1,2,8,9,10,13,17", color: "#16a34a", description: "Build AI products, integrate LLMs, and deploy agents and RAG systems." },
  { title: "AI Product Manager", salary: "$140K-$260K", modulePath: "1,2,6,7,11,15", color: "#2563eb", description: "Lead AI product discovery, delivery, evaluation, and adoption." },
];

export function getModuleById(id: number) {
  return modules.find((module) => module.id === id);
}

export function getLessonBySlug(slug: string) {
  return modules.flatMap((module) => module.lessons).find((lesson) => lesson.id === slug);
}

export function getModuleForLesson(slug: string) {
  return modules.find((module) => module.lessons.some((lesson) => lesson.id === slug));
}
