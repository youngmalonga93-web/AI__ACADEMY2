import { describe, expect, it } from "vitest";
import {
  canAccessPrompt,
  canAccessPremium,
  getSubscriptionState,
  getTrialState,
  hasActiveSubscription,
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

  it("treats active Stripe subscriptions as premium access", () => {
    const subscription = getSubscriptionState({
      plan: "pro",
      status: "active",
      current_period_end: "2026-07-01T12:00:00.000Z",
      trial_end: null,
    });
    const expiredTrial = getTrialState(
      "2026-06-01T12:00:00.000Z",
      new Date("2026-06-10T12:00:00.000Z")
    );

    expect(
      hasActiveSubscription(subscription, new Date("2026-06-15T12:00:00.000Z"))
    ).toBe(true);
    expect(canAccessPremium(true, expiredTrial, subscription)).toBe(true);
  });

  it("blocks premium access when subscription period has ended", () => {
    const subscription = getSubscriptionState({
      plan: "pro",
      status: "active",
      current_period_end: "2026-06-01T12:00:00.000Z",
      trial_end: null,
    });
    const expiredTrial = getTrialState(
      "2026-05-01T12:00:00.000Z",
      new Date("2026-06-10T12:00:00.000Z")
    );

    expect(
      hasActiveSubscription(subscription, new Date("2026-06-10T12:00:00.000Z"))
    ).toBe(false);
    expect(canAccessPremium(true, expiredTrial, subscription)).toBe(false);
  });
});
