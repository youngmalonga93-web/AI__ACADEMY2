import { Badge } from "@/components/ui/badge";
import { requireUser } from "@/lib/auth/require-user";
import { CareerAdvisorClient } from "./CareerAdvisorClient";

export const dynamic = "force-dynamic";

export default async function CareerAdvisorPage() {
  await requireUser("/advisor");

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Badge>AI Career Advisor</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Build a practical AI career roadmap.
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Turn your current background into a clear 90-day plan with skill gaps,
          portfolio projects, weekly practice, and matching AI Academy material.
        </p>
      </div>
      <CareerAdvisorClient />
    </div>
  );
}
