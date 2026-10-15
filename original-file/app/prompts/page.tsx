import { Badge } from "@/components/ui/badge";
import { getPromptVaultContent } from "@/lib/content/repository";
import { getTrialState } from "@/lib/entitlements";
import { getCurrentUser } from "@/lib/auth/require-user";
import { PromptVault } from "./PromptVault";

export const dynamic = "force-dynamic";

export default async function PromptsPage() {
  const { categories, prompts, tools } = await getPromptVaultContent();
  const { user } = await getCurrentUser();
  const isSignedIn = user !== null;
  const trialState = getTrialState(user?.created_at);

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
        prompts={prompts}
        tools={tools}
        trialDaysRemaining={trialState.daysRemaining}
        trialEndsAt={trialState.endsAt?.toISOString() ?? null}
        trialIsActive={trialState.isActive}
      />
    </div>
  );
}
