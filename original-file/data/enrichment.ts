import type { CourseModule } from "./types";

type ModuleEnrichment = Pick<CourseModule, "expertLens" | "realWorldExamples" | "resources" | "masteryChecks">;

const builderResources = [
  {
    title: "OpenAI Prompt Engineering Guide",
    url: "https://platform.openai.com/docs/guides/prompt-engineering",
    source: "OpenAI",
    note: "Use as the baseline for practical prompting, context design, and structured task instructions.",
  },
  {
    title: "Anthropic Prompt Engineering",
    url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
    source: "Anthropic",
    note: "Compare prompting guidance across model families and learn how to evaluate behavior, not just single outputs.",
  },
  {
    title: "Hugging Face Course",
    url: "https://huggingface.co/learn",
    source: "Hugging Face",
    note: "Use this for model, dataset, transformer, and open-source deployment fundamentals.",
  },
];

const infrastructureResources = [
  {
    title: "NVIDIA Generative AI Developer Resources",
    url: "https://developer.nvidia.com/generative-ai",
    source: "NVIDIA",
    note: "Study how production AI depends on inference, acceleration, deployment, and model-serving infrastructure.",
  },
  {
    title: "NVIDIA Generative AI Examples",
    url: "https://nvidia.github.io/GenerativeAIExamples/0.5.0/index.html",
    source: "NVIDIA",
    note: "Reference real RAG and LLM application workflows when moving from prototype to production.",
  },
];

const operatorLens = {
  founder: "Think like a founder: what user pain, distribution channel, pricing, and retention loop does this AI capability unlock?",
  systems: "Think like a first-principles systems builder: separate demos from durable products, and measure the bottleneck the model actually removes.",
  infrastructure: "Think like an AI infrastructure leader: account for data, latency, cost, reliability, evaluation, and deployment constraints before scaling.",
};

function enrichment(overrides: Partial<ModuleEnrichment>): ModuleEnrichment {
  return {
    expertLens: operatorLens,
    realWorldExamples: [
      "A solo operator replaces repetitive research, drafting, and QA loops with an AI-assisted workflow while preserving human review.",
      "A startup validates an AI feature by measuring time saved, accuracy, user retention, and willingness to pay before building a platform.",
      "An enterprise team moves from chatbot demo to governed internal assistant with retrieval, permissions, observability, and escalation.",
    ],
    resources: builderResources,
    masteryChecks: [
      "Explain the core concept without buzzwords.",
      "Build a small working artifact, not just a note or prompt.",
      "Define an evaluation rubric and test against at least five edge cases.",
      "Estimate operational cost, failure modes, and human review requirements.",
    ],
    ...overrides,
  };
}

export const moduleEnrichments: Record<number, ModuleEnrichment> = {
  1: enrichment({
    realWorldExamples: [
      "Map ChatGPT, Claude, Gemini, Perplexity, NotebookLM, and local models to different jobs instead of treating them as interchangeable.",
      "Audit a real business workflow and mark which steps need generation, retrieval, classification, automation, or human judgment.",
      "Compare cloud model convenience with local/open-source model control for privacy-sensitive work.",
    ],
  }),
  2: enrichment({
    resources: builderResources,
    masteryChecks: [
      "Write prompts that specify role, context, task, constraints, output format, and evaluation criteria.",
      "Run the same prompt across at least two model families and document behavior differences.",
      "Turn a successful prompt into a reusable template with variables and test cases.",
    ],
  }),
  3: enrichment({
    realWorldExamples: [
      "Build an inbox triage workflow that drafts replies but keeps final send authority with the user.",
      "Create a personal knowledge base for recurring decisions, client context, and meeting history.",
      "Measure weekly time saved and quality improvement instead of relying on vibes.",
    ],
  }),
  4: enrichment({
    realWorldExamples: [
      "Repurpose one research memo into a newsletter, LinkedIn post, sales email, short script, and SEO article.",
      "Use AI for ideation and first draft speed while humans preserve taste, fact-checking, and brand judgment.",
    ],
  }),
  5: enrichment({
    resources: [
      ...builderResources,
      {
        title: "Runway Academy",
        url: "https://academy.runwayml.com/",
        source: "Runway",
        note: "Study modern AI video workflows, visual prompting, and creative production constraints.",
      },
    ],
  }),
  6: enrichment({
    realWorldExamples: [
      "Use AI to generate landing page variants, then judge them against real conversion data.",
      "Build a sales-assist workflow that drafts account research and outreach while preserving human relationship context.",
    ],
  }),
  7: enrichment({
    realWorldExamples: [
      "Ship a no-code lead qualification assistant before investing in custom infrastructure.",
      "Automate internal reporting with Zapier/Make first, then replace brittle steps with code once usage proves value.",
    ],
  }),
  8: enrichment({
    resources: [
      ...builderResources,
      {
        title: "OpenAI API Documentation",
        url: "https://platform.openai.com/docs",
        source: "OpenAI",
        note: "Use this for current API patterns, structured outputs, tool use, and production integration details.",
      },
    ],
  }),
  9: enrichment({
    resources: [...builderResources, ...infrastructureResources],
    masteryChecks: [
      "Build a small retrieval system with source attribution.",
      "Test hallucination, missing-context, conflicting-source, and stale-document cases.",
      "Explain chunking, embeddings, ranking, citations, and access control tradeoffs.",
    ],
  }),
  10: enrichment({
    resources: [...builderResources, ...infrastructureResources],
    realWorldExamples: [
      "Create a coding agent that can inspect a repo, propose a change, run tests, and produce a reviewable diff.",
      "Define tool permissions so the agent can help without silently taking destructive actions.",
    ],
  }),
  11: enrichment({
    realWorldExamples: [
      "Evaluate an AI feature with a golden dataset before launch.",
      "Track regressions when prompts, models, retrieval data, or product requirements change.",
    ],
  }),
  12: enrichment({
    resources: infrastructureResources,
    masteryChecks: [
      "Estimate inference cost at 100, 1,000, and 100,000 users.",
      "Identify when to use hosted APIs, open models, batching, caching, or smaller specialized models.",
    ],
  }),
  13: enrichment({ resources: [...builderResources, ...infrastructureResources] }),
  14: enrichment({ resources: infrastructureResources }),
  15: enrichment({
    realWorldExamples: [
      "Map where AI changes a department's operating rhythm, incentives, hiring plan, and software stack.",
      "Build executive-ready ROI models with realistic adoption and risk assumptions.",
    ],
  }),
  16: enrichment({
    masteryChecks: [
      "Design a privacy and access-control plan for user data.",
      "Write a red-team checklist for prompt injection, data leakage, and unsafe automation.",
      "Define incident response ownership for AI failures.",
    ],
  }),
  17: enrichment({
    resources: [...builderResources, ...infrastructureResources],
    realWorldExamples: [
      "Choose between fine-tuning, RAG, prompt engineering, and workflow redesign before touching model training.",
      "Document model cards, evaluation data, and deployment assumptions for every serious model decision.",
    ],
  }),
  18: enrichment({
    resources: [...builderResources, ...infrastructureResources],
    realWorldExamples: [
      "Track frontier-model capability changes and translate them into product, labor, and infrastructure implications.",
      "Separate hype cycles from durable platform shifts by watching cost curves, developer adoption, and deployment bottlenecks.",
    ],
  }),
};
