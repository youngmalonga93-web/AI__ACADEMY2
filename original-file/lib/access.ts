import {
  canAccessCertification,
  canAccessModule,
  canAccessPremium,
  getSubscriptionState,
  getTrialState,
  type SubscriptionState,
  type TrialState,
} from "@/lib/entitlements";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ViewerAccess = {
  isSignedIn: boolean;
  trialState: TrialState;
  subscriptionState: SubscriptionState;
  hasPremiumAccess: boolean;
  canAccessModule: (moduleId: number) => boolean;
  canAccessCertification: (level: number) => boolean;
};

export async function getViewerAccess(): Promise<ViewerAccess> {
  let isSignedIn = false;
  let trialState = getTrialState(null);
  let subscriptionState = getSubscriptionState(null);

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    isSignedIn = Boolean(user);

    if (user) {
      trialState = getTrialState(user.created_at);

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("plan,status,current_period_end,trial_end")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      subscriptionState = getSubscriptionState(subscription);
    }
  } catch {
    isSignedIn = false;
  }

  const hasPremiumAccess = canAccessPremium(
    isSignedIn,
    trialState,
    subscriptionState
  );

  return {
    isSignedIn,
    trialState,
    subscriptionState,
    hasPremiumAccess,
    canAccessModule: (moduleId) =>
      canAccessModule(moduleId, isSignedIn, trialState, subscriptionState),
    canAccessCertification: (level) =>
      canAccessCertification(level, isSignedIn, trialState, subscriptionState),
  };
}
