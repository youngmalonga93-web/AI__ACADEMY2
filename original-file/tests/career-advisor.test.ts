import { describe, expect, it } from "vitest";
import { generateCareerAdvice } from "../lib/ai/career-advisor";

describe("AI Career Advisor", () => {
  it("creates a practical roadmap from career inputs", () => {
    const advice = generateCareerAdvice({
      currentRole: "Operations coordinator",
      targetRole: "AI Product Manager",
      skills:
        "Project management, workflow documentation, customer interviews, prompt engineering, and spreadsheet analysis.",
      timeline: "90 days",
      constraints: "Eight hours per week and no paid tools.",
    });

    expect(advice.summary).toContain("AI Product Manager");
    expect(advice.skillGaps.length).toBeGreaterThanOrEqual(4);
    expect(advice.roadmap).toHaveLength(3);
    expect(advice.portfolioProjects.length).toBeGreaterThanOrEqual(3);
    expect(advice.weeklyPlan.join(" ")).toContain("project");
    expect(advice.retrievedContext.length).toBeGreaterThan(0);
  });

  it("adapts recommendations for technical AI targets", () => {
    const advice = generateCareerAdvice({
      currentRole: "Frontend developer",
      targetRole: "AI Engineer",
      skills:
        "React, APIs, TypeScript, basic prompt engineering, and product prototyping.",
      timeline: "12 weeks",
    });

    expect(advice.skillGaps.join(" ")).toContain("RAG");
    expect(advice.portfolioProjects.join(" ")).toContain("Retrieval");
  });
});
