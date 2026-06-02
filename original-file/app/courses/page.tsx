import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { modules, phases } from "@/data/content";
import { coursePath } from "@/lib/routes";

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge>Learning</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Course Catalog</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            The first production catalog reads from extracted content modules and is ready for search, auth, and progress tracking.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/legacy-prototype">View legacy prototype</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {phases.map((phase) => (
          <Badge key={phase.id}>{phase.label}</Badge>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge>Module {module.id}</Badge>
                  <CardTitle className="mt-3">{module.title}</CardTitle>
                </div>
                <span className="rounded-md bg-muted px-3 py-2 text-sm font-semibold">{module.icon}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">{module.subtitle}</p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>{module.duration}</span>
                <span>{module.difficulty}</span>
                <span>{module.lessonCount} lessons planned</span>
              </div>
              <Button asChild>
                <Link href={coursePath(module.id)}>Open module</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
