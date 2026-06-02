import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCourseModules } from "@/lib/content/repository";
import { calculateProgressPercent } from "@/lib/progress";
import { getNextLesson, summarizeModuleProgress, type CompletedLesson } from "@/lib/progress-summary";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let email = "";
  let role = "learner";
  let completedLessons: CompletedLesson[] = [];
  const modules = await getCourseModules();
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

    const { data: progressRows } = await supabase
      .from("user_progress")
      .select("completed_at, lessons(slug,title,lesson_number,module_id)")
      .eq("user_id", user.id)
      .not("completed_at", "is", null)
      .order("completed_at", { ascending: false });

    completedLessons =
      progressRows?.flatMap((row) => {
        const lesson = row.lessons as { slug?: string; title?: string; lesson_number?: string; module_id?: number } | null;
        if (!lesson?.slug || !row.completed_at) {
          return [];
        }

        return [
          {
            slug: lesson.slug,
            title: lesson.title ?? lesson.slug,
            lessonNumber: lesson.lesson_number ?? "",
            moduleId: lesson.module_id ?? 0,
            completedAt: row.completed_at,
          },
        ];
      }) ?? [];
  } catch {
    redirect("/login");
  }

  const progressPercent = calculateProgressPercent(completedLessons.length, totalLessons);
  const moduleProgress = summarizeModuleProgress(modules, completedLessons);
  const nextLesson = getNextLesson(modules, completedLessons);

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
            This route is protected by Supabase auth and now summarizes your live lesson progress.
          </p>
          {nextLesson ? (
            <Button asChild>
              <Link href={`/lessons/${nextLesson.id}`}>Continue learning</Link>
            </Button>
          ) : null}
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
            {completedLessons.length} of {totalLessons} lessons complete. {progressPercent}% complete.
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Module Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {moduleProgress.map((module) => (
              <div key={module.moduleId} className="space-y-2 rounded-md border p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">{module.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {module.completedCount}/{module.totalCount}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-foreground" style={{ width: `${module.percent}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Completions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedLessons.length === 0 ? (
              <p className="text-sm text-muted-foreground">No completed lessons yet.</p>
            ) : (
              completedLessons.slice(0, 8).map((lesson) => (
                <Link key={`${lesson.slug}-${lesson.completedAt}`} href={`/lessons/${lesson.slug}`} className="block rounded-md border p-3 text-sm hover:bg-muted">
                  <span className="font-medium">{lesson.lessonNumber} {lesson.title}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(lesson.completedAt).toLocaleString()}</p>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
