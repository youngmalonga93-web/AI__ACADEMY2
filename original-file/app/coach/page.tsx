import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/auth/require-user";
import { CoachClient } from "./CoachClient";

export const dynamic = "force-dynamic";

export default async function CoachPage() {
  await requireUser("/coach");

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Badge>AI Coach</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Get guidance from your AI Academy learning coach.
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Ask for lesson help, project feedback, study plans, prompt
          improvement, or career direction. The coach retrieves relevant Academy
          content before answering.
        </p>
      </div>
      <CoachClient />
    </div>
  );
}
