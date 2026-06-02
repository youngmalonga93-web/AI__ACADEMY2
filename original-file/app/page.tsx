import Link from "next/link";
import { BookOpen, ClipboardList, GraduationCap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLandingContent } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { careerPaths, certifications, modules, prompts } = await getLandingContent();
  const stats = [
    { label: "Modules live", value: modules.length },
    { label: "Lessons live", value: modules.reduce((sum, module) => sum + module.lessons.length, 0) },
    { label: "Prompts live", value: prompts.length },
    { label: "Certifications", value: certifications.length },
  ];

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
          { icon: BookOpen, label: "Course engine", body: "Catalog, module detail, and lesson routes are live.", href: "/courses" },
          { icon: ClipboardList, label: "Prompt vault", body: "Search and filter over typed prompt templates.", href: "/prompts" },
          { icon: GraduationCap, label: "Certifications", body: "Credential data is ready for the future exam system.", href: "/certifications" },
          { icon: Sparkles, label: "Legacy route", body: "The original prototype remains available while migration continues.", href: "/legacy-prototype" },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader>
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">{item.body}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Credential Tracks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {certifications.map((certification) => (
              <Link key={certification.name} href="/certifications" className="block rounded-md border p-4 transition-colors hover:bg-muted/40">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">{certification.name}</h2>
                  <Badge>Level {certification.level}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{certification.outcome}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Career Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {careerPaths.map((career) => (
              <Link key={career.title} href="/careers" className="block rounded-md border p-4 transition-colors hover:bg-muted/40">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">{career.title}</h2>
                  <span className="text-sm font-semibold">{career.salary}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{career.description}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
