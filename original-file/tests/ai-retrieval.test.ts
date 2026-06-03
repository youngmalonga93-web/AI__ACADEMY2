import { describe, expect, it } from "vitest";
import {
  buildRetrievalCorpus,
  retrieveRelevantContent,
} from "../lib/ai/retrieval";

describe("AI content retrieval", () => {
  it("indexes courses, lessons, projects, and prompts", () => {
    const corpus = buildRetrievalCorpus();
    const types = new Set(corpus.map((item) => item.type));

    expect(types.has("course")).toBe(true);
    expect(types.has("lesson")).toBe(true);
    expect(types.has("project")).toBe(true);
    expect(corpus.length).toBeGreaterThan(120);
  });

  it("retrieves relevant RAG and prompt engineering context", () => {
    const ragResults = retrieveRelevantContent(
      "How do I build retrieval augmented generation with citations?"
    );
    const promptResults = retrieveRelevantContent(
      "Help me write a stronger prompt with role context and constraints"
    );

    expect(ragResults.some((item) => /rag|retrieval/i.test(item.title))).toBe(
      true
    );
    expect(
      promptResults.some((item) => /prompt/i.test(`${item.title} ${item.body}`))
    ).toBe(true);
  });
});
