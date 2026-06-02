import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLessonBySlug, getModuleForLesson } from "@/data/content";

type LessonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);
  const courseModule = getModuleForLesson(slug);

  if (!lesson || !courseModule) {
    notFound();
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

      <div className="flex flex-wrap gap-3">
        <Button>Mark complete</Button>
        <Button asChild variant="secondary">
          <Link href={`/courses/${courseModule.id}`}>Back to module</Link>
        </Button>
      </div>
    </div>
  );
}
