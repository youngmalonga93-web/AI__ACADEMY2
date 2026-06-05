import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ProjectReviewerClient } from "./ProjectReviewerClient";

export const dynamic = "force-dynamic";

export default async function ProjectReviewerPage() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login?next=%2Freviewer");
    }
  } catch {
    redirect("/login?next=%2Freviewer");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Badge>AI Project Reviewer</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Turn learner projects into portfolio-grade proof.
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          Submit an AI project idea, prototype, or case study. The reviewer
          grades it against a practical rubric and recommends the fastest path
          to a stronger demo, portfolio artifact, or customer-ready workflow.
        </p>
      </div>
      <ProjectReviewerClient />
    </div>
  );
}
