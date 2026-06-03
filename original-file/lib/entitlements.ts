import type { PromptTemplate } from "@/data/types";

export const TRIAL_DAYS = 7;
export const FREE_PROMPT_IDS = [47, 48, 54, 65];
export const FREE_MODULE_IDS = [1];
export const FREE_CERTIFICATION_LEVELS = [1];

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export type TrialState = {
  startsAt: Date | null;
  endsAt: Date | null;
  daysRemaining: number;
  isActive: boolean;
};

export type SubscriptionState = {
  plan: string | null;
  status: string | null;
  currentPeriodEnd: Date | null;
  trialEnd: Date | null;
};

const ACTIVE_SUBSCRIPTION_STATUSES = new Set([
  "active",
  "trialing",
  "past_due",
]);

function parseDate(value?: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getTrialState(
  createdAt?: string | null,
  now = new Date()
): TrialState {
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
    daysRemaining: isActive
      ? Math.max(1, Math.ceil(remainingMs / DAY_IN_MS))
      : 0,
    isActive,
  };
}

export function isFreePrompt(promptId: PromptTemplate["id"]) {
  return FREE_PROMPT_IDS.includes(promptId);
}

export function isFreeModule(moduleId: number) {
  return FREE_MODULE_IDS.includes(moduleId);
}

export function isFreeCertification(level: number) {
  return FREE_CERTIFICATION_LEVELS.includes(level);
}

export function canAccessPrompt(
  prompt: PromptTemplate,
  isSignedIn: boolean,
  trialState: TrialState
) {
  return isFreePrompt(prompt.id) || (isSignedIn && trialState.isActive);
}

export function getSubscriptionState(
  row?: {
    plan?: string | null;
    status?: string | null;
    current_period_end?: string | null;
    trial_end?: string | null;
  } | null
): SubscriptionState {
  return {
    plan: row?.plan ?? null,
    status: row?.status ?? null,
    currentPeriodEnd: parseDate(row?.current_period_end),
    trialEnd: parseDate(row?.trial_end),
  };
}

export function hasActiveSubscription(
  subscription: SubscriptionState,
  now = new Date()
) {
  if (
    !subscription.status ||
    !ACTIVE_SUBSCRIPTION_STATUSES.has(subscription.status)
  ) {
    return false;
  }

  const accessEnd = subscription.currentPeriodEnd ?? subscription.trialEnd;
  return accessEnd ? accessEnd.getTime() > now.getTime() : true;
}

export function canAccessPremium(
  isSignedIn: boolean,
  trialState: TrialState,
  subscription: SubscriptionState
) {
  return (
    isSignedIn && (trialState.isActive || hasActiveSubscription(subscription))
  );
}

export function canAccessModule(
  moduleId: number,
  isSignedIn: boolean,
  trialState: TrialState,
  subscription: SubscriptionState
) {
  return (
    isFreeModule(moduleId) ||
    canAccessPremium(isSignedIn, trialState, subscription)
  );
}

export function canAccessCertification(
  level: number,
  isSignedIn: boolean,
  trialState: TrialState,
  subscription: SubscriptionState
) {
  return (
    isFreeCertification(level) ||
    canAccessPremium(isSignedIn, trialState, subscription)
  );
}
