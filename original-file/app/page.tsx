import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  ClipboardList,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLandingContent } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { careerPaths, certifications, modules, prompts } =
    await getLandingContent();
  const stats = [
    { label: "Live modules", value: modules.length },
    {
      label: "Structured lessons",
      value: modules.reduce((sum, module) => sum + module.lessons.length, 0),
    },
    { label: "Prompt templates", value: prompts.length },
    { label: "Credential tracks", value: certifications.length },
  ];
  const demoPath = [
    {
      label: "Start",
      title: "Production overview",
      href: "/",
      body: "See the platform thesis, live content depth, and career outcomes.",
    },
    {
      label: "Learn",
      title: "Module 1 gold standard",
      href: "/courses/1",
      body: "Open the first course and inspect the deeper lesson experience.",
    },
    {
      label: "Practice",
      title: "Prompt vault",
      href: "/prompts",
      body: "Show reusable AI workflows learners can copy and apply immediately.",
    },
    {
      label: "Outcome",
      title: "Careers and credentials",
      href: "/careers",
      body: "Connect the learning product to jobs, certifications, and monetization.",
    },
    {
      label: "Proof",
      title: "Pricing and trial",
      href: "/pricing",
      body: "Review the 7-day trial, free prompt access, and subscription plan.",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="grid min-h-[520px] items-center gap-8 rounded-lg border bg-card p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <Badge>Production build</Badge>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-5xl">
              AI Academy trains practical AI operators, builders, and founders.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              A production SaaS learning platform with live curriculum, progress
              tracking, prompt workflows, credential paths, and a clear roadmap
              toward AI coaching, original video lessons, and paid
              subscriptions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/courses/1">Open Module 1 demo</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/pricing">See pricing plan</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/prompts">Open prompt vault</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                label: "Auth + progress",
                body: "Supabase-backed user accounts and completion state.",
              },
              {
                icon: BrainCircuit,
                label: "AI-native content",
                body: "Courses, labs, prompts, and video lesson plans.",
              },
              {
                icon: TrendingUp,
                label: "Revenue path",
                body: "Subscriptions, credentials, coaching, and B2B training.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-md border bg-background p-4"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Platform Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-md bg-muted px-3 py-2"
              >
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <span className="text-sm font-semibold">{stat.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Badge>Demo path</Badge>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              What to explore first
            </h2>
          </div>
          <Button asChild variant="secondary">
            <Link href="/signup">Create demo learner</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {demoPath.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <Card className="h-full transition-colors hover:bg-muted/40">
                <CardHeader>
                  <Badge>{item.label}</Badge>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.body}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: BookOpen,
            label: "Course engine",
            body: "Catalog, Module 1 deep lessons, labs, worksheets, and progress tracking.",
            href: "/courses",
          },
          {
            icon: ClipboardList,
            label: "Prompt vault",
            body: "Copyable workflows for writing, research, automation, coding, and careers.",
            href: "/prompts",
          },
          {
            icon: GraduationCap,
            label: "Certifications",
            body: "Credential tracks ready for exams, capstones, and certificate generation.",
            href: "/certifications",
          },
          {
            icon: Sparkles,
            label: "Prototype archive",
            body: "The original experience remains available for comparison during migration.",
            href: "/legacy-prototype",
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader>
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.body}
                </p>
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
              <Link
                key={certification.name}
                href="/certifications"
                className="block rounded-md border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">{certification.name}</h2>
                  <Badge>Level {certification.level}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {certification.outcome}
                </p>
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
              <Link
                key={career.title}
                href="/careers"
                className="block rounded-md border p-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-medium">{career.title}</h2>
                  <span className="text-sm font-semibold">{career.salary}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {career.description}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
