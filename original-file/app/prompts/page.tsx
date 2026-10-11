import { Badge } from "@/components/ui/badge";
import type { PromptTemplate } from "@/data/types";
import { getPromptVaultContent } from "@/lib/content/repository";
import {
  canAccessPrompt,
  getTrialState,
  type TrialState,
} from "@/lib/entitlements";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PromptVault } from "./PromptVault";

export const dynamic = "force-dynamic";

// SECURITY: the prompt vault tables are public-read in the database by
// design, so the paywall boundary must be enforced here on the server.
// Strip the prompt body (and tip) for anything the viewer cannot access —
// the client component only ever renders locked cards, so this changes
// nothing visually, but view-source no longer leaks premium content.
function toViewerPrompt(
  prompt: PromptTemplate,
  isSignedIn: boolean,
  trialState: TrialState
): PromptTemplate {
  if (canAccessPrompt(prompt, isSignedIn, trialState)) {
    return prompt;
  }

  return { ...prompt, prompt: "", tip: undefined };
}

export default async function PromptsPage() {
  const { categories, prompts, tools } = await getPromptVaultContent();
  let isSignedIn = false;
  let trialState = getTrialState(null);

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    isSignedIn = Boolean(user);
    trialState = getTrialState(user?.created_at);
  } catch {
    isSignedIn = false;
  }

  const viewerPrompts = prompts.map((prompt) =>
    toViewerPrompt(prompt, isSignedIn, trialState)
  );

  return (
    <div className="space-y-8">
      <div>
        <Badge>Prompt vault</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Production Prompt Vault
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Copy a free starter set now, or create an account to unlock every
          production-grade prompt during the 7-day trial.
        </p>
      </div>

      <PromptVault
        categories={categories}
        isSignedIn={isSignedIn}
        prompts={viewerPrompts}
        tools={tools}
        trialDaysRemaining={trialState.daysRemaining}
        trialEndsAt={trialState.endsAt?.toISOString() ?? null}
        trialIsActive={trialState.isActive}
      />
    </div>
  );
}
