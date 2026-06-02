import { Badge } from "@/components/ui/badge";
import { getPromptVaultContent } from "@/lib/content/repository";
import { PromptVault } from "./PromptVault";

export const dynamic = "force-dynamic";

export default async function PromptsPage() {
  const { categories, prompts, tools } = await getPromptVaultContent();

  return (
    <div className="space-y-8">
      <div>
        <Badge>Prompt vault</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Production Prompt Vault</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Search and copy production-grade prompts loaded from Supabase with local fallback content for development.
        </p>
      </div>

      <PromptVault categories={categories} prompts={prompts} tools={tools} />
    </div>
  );
}
