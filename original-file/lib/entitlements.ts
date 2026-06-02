import type { PromptTemplate } from "@/data/types";

export const TRIAL_DAYS = 7;
export const FREE_PROMPT_IDS = [47, 48, 54, 65];

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export type TrialState = {
  startsAt: Date | null;
  endsAt: Date | null;
  daysRemaining: number;
  isActive: boolean;
};

export function getTrialState(createdAt?: string | null, now = new Date()): TrialState {
  if (!createdAt) {
    return {
      startsAt: null,
      endsAt: null,
      daysRemaining: 0,
      isActive: false,
    };
  }

  const startsAt = new Date(createdAt);

  if (Number.isNaN(startsAt.getTime())) {
    return {
      startsAt: null,
      endsAt: null,
      daysRemaining: 0,
      isActive: false,
    };
  }

  const endsAt = new Date(startsAt.getTime() + TRIAL_DAYS * DAY_IN_MS);
  const remainingMs = endsAt.getTime() - now.getTime();
  const isActive = remainingMs > 0;

  return {
    startsAt,
    endsAt,
    daysRemaining: isActive ? Math.max(1, Math.ceil(remainingMs / DAY_IN_MS)) : 0,
    isActive,
  };
}

export function isFreePrompt(promptId: PromptTemplate["id"]) {
  return FREE_PROMPT_IDS.includes(promptId);
}

export function canAccessPrompt(prompt: PromptTemplate, isSignedIn: boolean, trialState: TrialState) {
  return isFreePrompt(prompt.id) || (isSignedIn && trialState.isActive);
}
