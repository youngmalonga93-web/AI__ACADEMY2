import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getModuleById } from "@/data/content";
import { lessonPath } from "@/lib/routes";

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
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {courseModule.lessons.map((lesson) => (
                <Link key={lesson.id} href={lessonPath(lesson)} prefetch={false} className="block rounded-md border p-4 hover:bg-muted">
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

          {courseModule.expertLens ? (
            <Card>
              <CardHeader>
                <CardTitle>Expert Lens</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground md:grid-cols-3">
                {courseModule.expertLens.founder ? (
                  <div>
                    <p className="font-medium text-foreground">Founder</p>
                    <p>{courseModule.expertLens.founder}</p>
                  </div>
                ) : null}
                {courseModule.expertLens.systems ? (
                  <div>
                    <p className="font-medium text-foreground">Systems</p>
                    <p>{courseModule.expertLens.systems}</p>
                  </div>
                ) : null}
                {courseModule.expertLens.infrastructure ? (
                  <div>
                    <p className="font-medium text-foreground">Infrastructure</p>
                    <p>{courseModule.expertLens.infrastructure}</p>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ) : null}
        </div>

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
          {courseModule.realWorldExamples?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Real Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {courseModule.realWorldExamples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}
          {courseModule.masteryChecks?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Mastery Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {courseModule.masteryChecks.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : null}
          {courseModule.resources?.length ? (
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {courseModule.resources.map((resource) => (
                  <a
                    key={resource.url}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-md border p-3 text-sm hover:bg-muted"
                  >
                    <span className="font-medium text-foreground">{resource.title}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{resource.source}</span>
                    <p className="mt-1 text-muted-foreground">{resource.note}</p>
                  </a>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>

      <Button asChild variant="secondary">
        <Link href="/courses">Back to catalog</Link>
      </Button>
    </div>
  );
}
