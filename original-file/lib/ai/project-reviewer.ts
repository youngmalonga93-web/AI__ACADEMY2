import {
  formatRetrievedContext,
  retrieveRelevantContent,
  type RetrievedContent,
} from "./retrieval";
import { getServerEnv } from "../env";

export type ProjectReviewProvider = "openai" | "anthropic" | "fallback";

export type ProjectReviewRequest = {
  title: string;
  audience: string;
  goal: string;
  description: string;
  evidence?: string;
  preferredProvider?: Exclude<ProjectReviewProvider, "fallback">;
};

export type ProjectReviewScore = {
  category: string;
  score: number;
  rationale: string;
};

export type ProjectReviewResponse = {
  summary: string;
  scores: ProjectReviewScore[];
  strengths: string[];
  risks: string[];
  nextActions: string[];
  portfolioUpgrade: string;
  provider: ProjectReviewProvider;
  model: string;
  retrievedContext: RetrievedContent[];
};

const RUBRIC = [
  "Problem clarity",
  "User value",
  "AI workflow quality",
  "Evidence and evaluation",
  "Technical reliability",
  "Security and ethics",
  "Presentation quality",
] as const;

function clampScore(score: number) {
  return Math.max(1, Math.min(10, Math.round(score)));
}

function scoreFromSignals(description: string, signals: string[]) {
  const text = description.toLowerCase();
  const matches = signals.filter((signal) => text.includes(signal)).length;

  return clampScore(4 + matches * 1.4);
}

function buildProjectReviewPrompt(
  request: ProjectReviewRequest,
  context: RetrievedContent[]
) {
  return [
    "You are AI Academy Project Reviewer, a strict but useful product, portfolio, and AI systems evaluator.",
    "Review the learner project using the rubric below. Be specific, practical, and honest.",
    "Do not invent facts. If evidence is missing, mark it as a risk and suggest how to prove it.",
    "Return concise sections: summary, scores, strengths, risks, next actions, and portfolio upgrade.",
    "",
    `Project title: ${request.title}`,
    `Audience: ${request.audience}`,
    `Goal: ${request.goal}`,
    "",
    "Project description:",
    request.description,
    "",
    "Evidence, links, or artifacts:",
    request.evidence || "No evidence provided.",
    "",
    "Rubric:",
    RUBRIC.map((item, index) => `${index + 1}. ${item}`).join("\n"),
    "",
    "Relevant AI Academy context:",
    formatRetrievedContext(context) || "No matching internal context found.",
  ].join("\n");
}

function buildFallbackReview(
  request: ProjectReviewRequest,
  context: RetrievedContent[]
): ProjectReviewResponse {
  const combined = [
    request.title,
    request.audience,
    request.goal,
    request.description,
    request.evidence,
  ]
    .filter(Boolean)
    .join(" ");

  const hasEvidence = Boolean(request.evidence && request.evidence.length > 30);
  const scores: ProjectReviewScore[] = [
    {
      category: "Problem clarity",
      score: scoreFromSignals(combined, [
        "problem",
        "pain",
        "user",
        "customer",
        "need",
      ]),
      rationale:
        "The review looks for a clear user, painful problem, and job to be done.",
    },
    {
      category: "User value",
      score: scoreFromSignals(combined, [
        "outcome",
        "save",
        "reduce",
        "increase",
        "decision",
      ]),
      rationale:
        "Strong projects explain the measurable result a real user receives.",
    },
    {
      category: "AI workflow quality",
      score: scoreFromSignals(combined, [
        "prompt",
        "rag",
        "retrieval",
        "agent",
        "workflow",
        "model",
      ]),
      rationale:
        "The project should show where AI improves the workflow, not just that AI is present.",
    },
    {
      category: "Evidence and evaluation",
      score: hasEvidence ? 7 : 4,
      rationale: hasEvidence
        ? "Evidence was provided, so the next step is to tighten evaluation criteria."
        : "No proof artifact was provided. Add screenshots, metrics, test cases, or before/after outputs.",
    },
    {
      category: "Technical reliability",
      score: scoreFromSignals(combined, [
        "test",
        "monitor",
        "fallback",
        "database",
        "api",
        "deploy",
      ]),
      rationale:
        "Production-ready projects show data flow, failure handling, and repeatable deployment.",
    },
    {
      category: "Security and ethics",
      score: scoreFromSignals(combined, [
        "privacy",
        "permission",
        "security",
        "bias",
        "policy",
        "safe",
      ]),
      rationale:
        "Trust signals are strongest when privacy, permissions, and misuse risks are named directly.",
    },
    {
      category: "Presentation quality",
      score: scoreFromSignals(combined, [
        "demo",
        "case study",
        "portfolio",
        "readme",
        "video",
      ]),
      rationale:
        "A strong portfolio project needs a short narrative, a demo path, and visible proof.",
    },
  ];

  const contextLinks = context
    .slice(0, 3)
    .map((item) => `${item.title} (${item.url})`);

  return {
    summary: `${request.title} has the shape of a useful AI Academy portfolio project, but it needs sharper proof before it can impress testers, employers, or customers.`,
    scores,
    strengths: [
      `The goal is pointed at ${request.audience || "a defined audience"}.`,
      "The project can become stronger by tying every AI step to a business or learner outcome.",
      contextLinks.length
        ? `It connects well to Academy material such as ${contextLinks.join(", ")}.`
        : "It can be mapped to Academy lessons once the workflow is more specific.",
    ],
    risks: [
      "The value proposition may feel generic unless the target user and before/after result are concrete.",
      "AI quality is hard to trust without sample inputs, outputs, and evaluation criteria.",
      "Portfolio credibility will be limited if there is no live demo, case study, or artifact trail.",
    ],
    nextActions: [
      "Rewrite the project in one sentence: user, problem, AI workflow, measurable result.",
      "Add three realistic test cases with expected outputs and failure modes.",
      "Create a simple demo path that a tester can complete in under three minutes.",
      "Add a security note covering data used, permissions, and what the system should never do.",
      "Turn the project into a portfolio case study with screenshots, metrics, and lessons learned.",
    ],
    portfolioUpgrade:
      "Package this as a one-page case study: problem, user, workflow diagram, demo screenshots, evaluation table, risks handled, and the exact business result the AI system creates.",
    provider: "fallback",
    model: "local-ai-academy-project-reviewer",
    retrievedContext: context,
  };
}

function parseJsonReview(
  value: string,
  request: ProjectReviewRequest,
  context: RetrievedContent[],
  provider: Exclude<ProjectReviewProvider, "fallback">,
  model: string
): ProjectReviewResponse {
  try {
    const parsed = JSON.parse(value) as Partial<ProjectReviewResponse>;

    if (
      parsed.summary &&
      Array.isArray(parsed.scores) &&
      Array.isArray(parsed.strengths) &&
      Array.isArray(parsed.risks) &&
      Array.isArray(parsed.nextActions) &&
      parsed.portfolioUpgrade
    ) {
      return {
        summary: parsed.summary,
        scores: parsed.scores.map((score) => ({
          category: String(score.category),
          score: clampScore(Number(score.score)),
          rationale: String(score.rationale),
        })),
        strengths: parsed.strengths.map(String).slice(0, 6),
        risks: parsed.risks.map(String).slice(0, 6),
        nextActions: parsed.nextActions.map(String).slice(0, 8),
        portfolioUpgrade: parsed.portfolioUpgrade,
        provider,
        model,
        retrievedContext: context,
      };
    }
  } catch {
    // Fall back to the deterministic review if the provider does not return JSON.
  }

  return buildFallbackReview(request, context);
}

async function callOpenAiForReview(prompt: string, signal?: AbortSignal) {
  const env = getServerEnv();

  if (!env.OPENAI_API_KEY) {
    return null;
  }

  const model = env.OPENAI_MODEL ?? "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "Return strict JSON with summary, scores, strengths, risks, nextActions, and portfolioUpgrade.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.25,
      response_format: { type: "json_object" },
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`OpenAI project review failed with ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const answer = data.choices?.[0]?.message?.content?.trim();

  return answer ? { answer, model } : null;
}

async function callAnthropicForReview(prompt: string, signal?: AbortSignal) {
  const env = getServerEnv();

  if (!env.ANTHROPIC_API_KEY) {
    return null;
  }

  const model = env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest";
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1200,
      temperature: 0.25,
      system:
        "Return only valid JSON with summary, scores, strengths, risks, nextActions, and portfolioUpgrade.",
      messages: [{ role: "user", content: prompt }],
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Anthropic project review failed with ${response.status}`);
  }

  const data = (await response.json()) as {
    content?: Array<{ type?: string; text?: string }>;
  };
  const answer = data.content
    ?.filter((item) => item.type === "text")
    .map((item) => item.text)
    .join("\n")
    .trim();

  return answer ? { answer, model } : null;
}

export async function generateProjectReview(
  request: ProjectReviewRequest,
  signal?: AbortSignal
): Promise<ProjectReviewResponse> {
  const retrievedContext = retrieveRelevantContent(
    [
      request.title,
      request.audience,
      request.goal,
      request.description,
      request.evidence,
    ]
      .filter(Boolean)
      .join(" "),
    8
  );
  const prompt = buildProjectReviewPrompt(request, retrievedContext);
  const providers =
    request.preferredProvider === "anthropic"
      ? [
          { id: "anthropic" as const, call: callAnthropicForReview },
          { id: "openai" as const, call: callOpenAiForReview },
        ]
      : [
          { id: "openai" as const, call: callOpenAiForReview },
          { id: "anthropic" as const, call: callAnthropicForReview },
        ];

  for (const provider of providers) {
    try {
      const result = await provider.call(prompt, signal);

      if (result) {
        return parseJsonReview(
          result.answer,
          request,
          retrievedContext,
          provider.id,
          result.model
        );
      }
    } catch {
      // Fall through to the next provider, then deterministic fallback.
    }
  }

  return buildFallbackReview(request, retrievedContext);
}
