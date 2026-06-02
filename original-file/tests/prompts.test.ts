import { describe, expect, it } from "vitest";
import { prompts } from "../data/content";
import { filterPrompts } from "../lib/prompts";

describe("prompt filters", () => {
  it("filters prompts by category", () => {
    const results = filterPrompts(prompts, { category: "coding" });

    expect(results.length).toBeGreaterThan(1);
    expect(results.every((prompt) => prompt.category === "coding")).toBe(true);
  });

  it("filters prompts by tool", () => {
    const results = filterPrompts(prompts, { tool: "perplexity" });

    expect(results.length).toBeGreaterThan(1);
    expect(results.every((prompt) => prompt.tools.includes("perplexity"))).toBe(true);
  });

  it("filters prompts by query across tags and text", () => {
    const results = filterPrompts(prompts, { query: "business model" });

    expect(results.map((prompt) => prompt.title)).toContain("The Business Model Stress Test");
  });
});
