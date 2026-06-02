import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getModuleById } from "@/data/content";

type CourseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  const courseModule = getModuleById(Number(slug));

  if (!courseModule) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Badge>Module {courseModule.id}</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">{courseModule.title}</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">{courseModule.subtitle}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {courseModule.lessons.map((lesson) => (
              <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="block rounded-md border p-4 hover:bg-muted">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{lesson.number}</p>
                    <h2 className="font-medium">{lesson.title}</h2>
                  </div>
                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {courseModule.objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Capstone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{courseModule.project.title}</p>
              <p>{courseModule.project.description}</p>
              <p>{courseModule.project.deliverable}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Button asChild variant="secondary">
        <Link href="/courses">Back to catalog</Link>
      </Button>
    </div>
  );
}
