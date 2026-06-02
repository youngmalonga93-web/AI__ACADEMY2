import { Badge } from "@/components/ui/badge";
import { promptCategories, prompts, tools } from "@/data/content";
import { PromptVault } from "./PromptVault";

export default function PromptsPage() {
  return (
    <div className="space-y-8">
      <div>
        <Badge>Prompt vault</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Production Prompt Vault</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Initial prompt data is extracted into typed records. The next pass can add client-side search, favorites, and Supabase-backed persistence.
        </p>
      </div>

      <PromptVault categories={promptCategories} prompts={prompts} tools={tools} />
    </div>
  );
}
