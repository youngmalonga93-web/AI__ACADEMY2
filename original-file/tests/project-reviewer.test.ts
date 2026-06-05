import { afterEach, describe, expect, it } from "vitest";
import { generateProjectReview } from "../lib/ai/project-reviewer";

const originalEnv = process.env;

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("AI Project Reviewer", () => {
  it("returns a deterministic rubric review when provider keys are absent", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key";
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const review = await generateProjectReview({
      title: "RAG Support Assistant",
      audience: "Customer support managers",
      goal: "Prove I can build a reliable AI workflow for business operations.",
      description:
        "A retrieval augmented generation assistant that turns support policy documents into cited answers, flags uncertainty, logs failures, and gives managers a weekly report about unresolved customer issues.",
      evidence:
        "Live demo, README, screenshots, evaluation table, and five test questions with expected answers.",
    });

    expect(review.provider).toBe("fallback");
    expect(review.scores).toHaveLength(7);
    expect(review.nextActions.length).toBeGreaterThan(3);
    expect(review.retrievedContext.some((item) => item.type === "lesson")).toBe(
      true
    );
  });

  it("scores weak evidence lower than a project with proof artifacts", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "publishable-key";
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const weakReview = await generateProjectReview({
      title: "AI Sales Tool",
      audience: "Founders",
      goal: "Get feedback on the idea.",
      description:
        "A tool that uses AI to help founders write sales messages for potential customers.",
    });
    const strongReview = await generateProjectReview({
      title: "AI Sales Tool",
      audience: "Founders",
      goal: "Get feedback on the idea.",
      description:
        "A tool that uses AI to help founders write sales messages for potential customers.",
      evidence:
        "Screenshots, recorded demo, ten sample prompts, conversion baseline, and a before-after comparison table.",
    });
    const weakEvidenceScore = weakReview.scores.find(
      (score) => score.category === "Evidence and evaluation"
    );
    const strongEvidenceScore = strongReview.scores.find(
      (score) => score.category === "Evidence and evaluation"
    );

    expect(weakEvidenceScore?.score).toBeLessThan(
      strongEvidenceScore?.score ?? 0
    );
  });
});
