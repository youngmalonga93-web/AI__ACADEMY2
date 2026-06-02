import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { modules } from "@/data/content";
import { calculateProgressPercent } from "@/lib/progress";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let email = "";
  let role = "learner";
  let completedLessons = 0;
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    email = user.email ?? "";

    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
    role = profile?.role ?? "learner";

    const { count } = await supabase
      .from("user_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .not("completed_at", "is", null);

    completedLessons = count ?? 0;
  } catch {
    redirect("/login");
  }

  const progressPercent = calculateProgressPercent(completedLessons, totalLessons);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as {email} with {role} access.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Protected learning workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            This route is protected by Supabase auth and is ready for progress summaries, saved prompts, and account-specific learning state.
          </p>
          <form action="/auth/logout" method="post">
            <Button type="submit" variant="secondary">
              Log out
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div className="h-full bg-foreground" style={{ width: `${progressPercent}%` }} />
          </div>
          <p className="text-sm text-muted-foreground">
            {completedLessons} of {totalLessons} seeded lessons complete. {progressPercent}% complete.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
