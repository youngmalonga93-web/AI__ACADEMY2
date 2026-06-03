import { describe, expect, it } from "vitest";
import {
  canAccessPrompt,
  getTrialState,
  isFreePrompt,
} from "../lib/entitlements";
import type { PromptTemplate } from "../data/types";

const lockedPrompt: PromptTemplate = {
  id: 1001,
  category: "strategy",
  tier: "POWER",
  title: "Locked",
  task: "Test",
  tools: ["chatgpt"],
  prompt: "Test prompt",
  tags: ["test"],
};

const freePrompt: PromptTemplate = {
  ...lockedPrompt,
  id: 47,
  title: "Free",
};

describe("entitlements", () => {
  it("keeps a 7-day signup trial active until the end date", () => {
    const trial = getTrialState(
      "2026-06-01T12:00:00.000Z",
      new Date("2026-06-03T12:00:00.000Z")
    );

    expect(trial.isActive).toBe(true);
    expect(trial.daysRemaining).toBe(5);
    expect(trial.endsAt?.toISOString()).toBe("2026-06-08T12:00:00.000Z");
  });

  it("expires the trial after seven days", () => {
    const trial = getTrialState(
      "2026-06-01T12:00:00.000Z",
      new Date("2026-06-09T12:00:00.000Z")
    );

    expect(trial.isActive).toBe(false);
    expect(trial.daysRemaining).toBe(0);
  });

  it("allows free prompts without signup and trial prompts during trial", () => {
    const activeTrial = getTrialState(
      "2026-06-01T12:00:00.000Z",
      new Date("2026-06-02T12:00:00.000Z")
    );
    const expiredTrial = getTrialState(
      "2026-06-01T12:00:00.000Z",
      new Date("2026-06-10T12:00:00.000Z")
    );

    expect(isFreePrompt(freePrompt.id)).toBe(true);
    expect(canAccessPrompt(freePrompt, false, expiredTrial)).toBe(true);
    expect(canAccessPrompt(lockedPrompt, true, activeTrial)).toBe(true);
    expect(canAccessPrompt(lockedPrompt, false, expiredTrial)).toBe(false);
  });
});
