import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLessonBySlugFromContent, getModuleForLessonFromContent } from "@/lib/content/repository";
import { buildLessonMaterial } from "@/lib/lesson-material";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { completeLessonAction } from "./actions";

type LessonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = await getLessonBySlugFromContent(slug);
  const courseModule = await getModuleForLessonFromContent(slug);
  let isSignedIn = false;
  let isComplete = false;

  if (!lesson || !courseModule) {
    notFound();
  }

  const material = buildLessonMaterial(lesson, courseModule);
  const lessonIndex = courseModule.lessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = lessonIndex > 0 ? courseModule.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex >= 0 && lessonIndex < courseModule.lessons.length - 1 ? courseModule.lessons[lessonIndex + 1] : null;

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    isSignedIn = user !== null;

    if (user) {
      const { data: persistedLesson } = await supabase.from("lessons").select("id").eq("slug", slug).maybeSingle();

      if (persistedLesson) {
        const { data: progress } = await supabase
          .from("user_progress")
          .select("completed_at")
          .eq("user_id", user.id)
          .eq("lesson_id", persistedLesson.id)
          .maybeSingle();

        isComplete = Boolean(progress?.completed_at);
      }
    }
  } catch {
    isSignedIn = false;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Badge>
          {lesson.number} in {courseModule.title}
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight">{lesson.title}</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{lesson.hook}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Concept</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">{lesson.concept}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Application</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">{lesson.application}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exercise</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">{lesson.exercise}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Deep Lesson Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            {material.explanation.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Tutorial Blueprint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Use this structure when we produce the video lesson.</p>
            <ul className="space-y-2">
              {material.videoPlan.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Step-by-Step Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm leading-6 text-muted-foreground">
              {material.workflow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Practice Lab</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
              {material.practice.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Deliverable</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>{material.deliverable}</p>
            <div className="rounded-md border p-3">
              <p className="font-medium text-foreground">{material.worksheet.title}</p>
              <ul className="mt-2 space-y-2">
                {material.worksheet.sections.map((section) => (
                  <li key={section}>{section}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground">Reflection prompts</p>
              <ul className="mt-2 space-y-2">
                {material.reflection.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        {isSignedIn ? (
          <form action={completeLessonAction}>
            <input name="slug" type="hidden" value={slug} />
            <Button disabled={isComplete} type="submit">
              {isComplete ? "Completed" : "Mark complete"}
            </Button>
          </form>
        ) : (
          <Button asChild>
            <Link href="/login">Log in to save progress</Link>
          </Button>
        )}
        <Button asChild variant="secondary">
          <Link href={`/courses/${courseModule.id}`}>Back to module</Link>
        </Button>
      </div>

      <div className="grid gap-3 border-t pt-6 md:grid-cols-2">
        {previousLesson ? (
          <Button asChild variant="secondary">
            <Link href={`/lessons/${previousLesson.id}`}>Previous: {previousLesson.title}</Link>
          </Button>
        ) : (
          <Button asChild variant="secondary">
            <Link href={`/courses/${courseModule.id}`}>Module overview</Link>
          </Button>
        )}
        {nextLesson ? (
          <Button asChild>
            <Link href={`/lessons/${nextLesson.id}`}>Next: {nextLesson.title}</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/courses">Choose next module</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
