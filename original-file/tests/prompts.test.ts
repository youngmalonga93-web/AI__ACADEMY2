import { describe, expect, it } from "vitest";
import { prompts } from "../data/content";
import { filterPrompts } from "../lib/prompts";

describe("prompt filters", () => {
  it("filters prompts by category", () => {
    expect(filterPrompts(prompts, { category: "coding" }).map((prompt) => prompt.title)).toEqual(["Code Review Triage"]);
  });

  it("filters prompts by tool", () => {
    const results = filterPrompts(prompts, { tool: "perplexity" });

    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("Evidence Map");
  });

  it("filters prompts by query across tags and text", () => {
    expect(filterPrompts(prompts, { query: "validation" }).map((prompt) => prompt.title)).toEqual(["Business Model Stress Test"]);
  });
});
