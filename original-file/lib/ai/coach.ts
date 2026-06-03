import { getServerEnv } from "@/lib/env";
import {
  formatRetrievedContext,
  retrieveRelevantContent,
  type RetrievedContent,
} from "@/lib/ai/retrieval";

export type CoachProvider = "openai" | "anthropic" | "fallback";

export type CoachRequest = {
  message: string;
  goal?: string;
  lessonSlug?: string;
  preferredProvider?: Exclude<CoachProvider, "fallback">;
};

export type CoachResponse = {
  answer: string;
  provider: CoachProvider;
  model: string;
  retrievedContext: RetrievedContent[];
};

function buildCoachPrompt(request: CoachRequest, context: RetrievedContent[]) {
  const retrievedContext = formatRetrievedContext(context);

  return [
    "You are AI Academy Coach, a practical AI learning mentor.",
    "Help the learner make progress with clear, honest, step-by-step guidance.",
    "Use the retrieved AI Academy context when relevant.",
    "Do not invent course facts. If context is missing, say what to verify.",
    "Give concise advice, a next action, and a useful practice exercise.",
    "",
    `Learner goal: ${request.goal || "Not provided"}`,
    `Current lesson slug: ${request.lessonSlug || "Not provided"}`,
    "",
    "Retrieved AI Academy context:",
    retrievedContext || "No matching internal context found.",
    "",
    `Learner question: ${request.message}`,
  ].join("\n");
}

function buildFallbackAnswer(
  request: CoachRequest,
  context: RetrievedContent[]
) {
  const topContext = context.slice(0, 3);
  const references = topContext.length
    ? topContext.map((item) => `- ${item.title}: ${item.url}`).join("\n")
    : "- No direct content match found yet. Start with the course catalog and prompt vault.";

  return [
    "Here is the fastest useful path:",
    "",
    `1. Clarify the target outcome: ${request.goal || "write the exact result you want before choosing tools."}`,
    "2. Use the related AI Academy material below as your starting context.",
    "3. Create one small deliverable today, then compare it against accuracy, usefulness, and trust.",
    "",
    "Relevant AI Academy material:",
    references,
    "",
    "Practice exercise:",
    "Write your desired outcome in one sentence, paste one rough attempt or idea, then ask the coach to turn it into a stronger workflow with constraints, examples, and a quality checklist.",
    "",
    "Note: live AI provider keys are not configured yet, so this response is using the built-in deterministic coach fallback.",
  ].join("\n");
}

async function callOpenAi(prompt: string, signal?: AbortSignal) {
  const env = getServerEnv();
  const apiKey = env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model = env.OPENAI_MODEL ?? "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a careful AI education coach. Be practical, concise, and honest.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const answer = data.choices?.[0]?.message?.content?.trim();

  return answer ? { answer, model } : null;
}

async function callAnthropic(prompt: string, signal?: AbortSignal) {
  const env = getServerEnv();
  const apiKey = env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return null;
  }

  const model = env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest";
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 900,
      temperature: 0.4,
      system:
        "You are a careful AI education coach. Be practical, concise, and honest.",
      messages: [{ role: "user", content: prompt }],
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed with ${response.status}`);
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

export async function generateCoachResponse(
  request: CoachRequest,
  signal?: AbortSignal
): Promise<CoachResponse> {
  const retrievedContext = retrieveRelevantContent(
    [request.message, request.goal, request.lessonSlug]
      .filter(Boolean)
      .join(" ")
  );
  const prompt = buildCoachPrompt(request, retrievedContext);
  const providers =
    request.preferredProvider === "anthropic"
      ? [callAnthropic, callOpenAi]
      : [callOpenAi, callAnthropic];

  for (const provider of providers) {
    try {
      const result = await provider(prompt, signal);

      if (result) {
        return {
          answer: result.answer,
          provider: provider === callOpenAi ? "openai" : "anthropic",
          model: result.model,
          retrievedContext,
        };
      }
    } catch {
      // Fall through to the next provider, then the deterministic fallback.
    }
  }

  return {
    answer: buildFallbackAnswer(request, retrievedContext),
    provider: "fallback",
    model: "local-ai-academy-coach",
    retrievedContext,
  };
}
