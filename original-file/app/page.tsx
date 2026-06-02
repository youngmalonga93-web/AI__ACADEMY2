import Link from "next/link";
import { BookOpen, ClipboardList, GraduationCap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { careerPaths, certifications, modules, prompts } from "@/data/content";

const stats = [
  { label: "Modules seeded", value: modules.length },
  { label: "Lessons seeded", value: modules.reduce((sum, module) => sum + module.lessons.length, 0) },
  { label: "Prompts seeded", value: prompts.length },
  { label: "Certifications", value: certifications.length },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <Badge>Production scaffold</Badge>
          <div className="space-y-3">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight">AI Academy is moving from prototype to SaaS.</h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              This shell uses typed content data, production routes, reusable UI primitives, and a preserved legacy prototype route for reference during migration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/courses">Browse courses</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/prompts">Open prompt vault</Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Readiness Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between rounded-md bg-muted px-3 py-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <span className="text-sm font-semibold">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: BookOpen, label: "Course engine", body: "Catalog, module detail, and lesson routes are live." },
          { icon: ClipboardList, label: "Prompt vault", body: "Search and filter over typed prompt templates." },
          { icon: GraduationCap, label: "Certifications", body: "Credential data is ready for the future exam system." },
          { icon: Sparkles, label: "Legacy route", body: "The original prototype remains available while migration continues." },
        ].map((item) => (
          <Card key={item.label}>
            <CardHeader>
              <item.icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle>{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{item.body}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Credential Tracks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {certifications.map((certification) => (
              <div key={certification.name} className="rounded-md border p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">{certification.name}</h2>
                  <Badge>Level {certification.level}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{certification.outcome}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Career Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {careerPaths.map((career) => (
              <div key={career.title} className="rounded-md border p-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">{career.title}</h2>
                  <span className="text-sm font-semibold">{career.salary}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{career.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
