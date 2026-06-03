import Link from "next/link";
import {
  Activity,
  BadgeCheck,
  BookOpen,
  ClipboardList,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLandingContent } from "@/lib/content/repository";

export const dynamic = "force-dynamic";

const roadmap = [
  "Stripe Checkout and Customer Portal",
  "Subscription entitlement checks",
  "Certification exams and certificate generation",
  "AI Coach and project reviewer",
  "Admin analytics backed by live events",
];

export default async function InvestorPage() {
  const { careerPaths, certifications, modules, prompts } =
    await getLandingContent();
  const lessonCount = modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );
  const metrics = [
    { label: "Modules", value: modules.length, icon: BookOpen },
    { label: "Lessons", value: lessonCount, icon: BadgeCheck },
    { label: "Prompt templates", value: prompts.length, icon: ClipboardList },
    {
      label: "Credential tracks",
      value: certifications.length,
      icon: TrendingUp,
    },
    { label: "Worksheets", value: lessonCount, icon: Activity },
    { label: "Video blueprints", value: lessonCount, icon: ShieldCheck },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <Badge>Investor snapshot</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            AI Academy is an investor-demo-ready AI education SaaS.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            The platform now has a working curriculum engine, progress tracking,
            7-day trial foundation, prompt vault, pricing model, approved
            third-party learning references, and production build safeguards.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          <Button asChild>
            <Link href="/courses/1">Open demo module</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <metric.icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle>{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{metric.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Business Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Starter gives free prompt value and previews.</p>
            <p>
              Pro at $29/month is the default learner plan with a 7-day trial.
            </p>
            <p>
              Builder at $99/month targets founders, consultants, and advanced
              operators.
            </p>
            <p>
              Team is the future B2B plan for cohorts, reporting, and enterprise
              pilots.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trust And Reliability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              Build, type, import, lint, formatting, and chunk checks are
              automated.
            </p>
            <p>
              Lesson resources include third-party attribution instead of copied
              material.
            </p>
            <p>Auth redirects are protected against external redirect abuse.</p>
            <p>The app exposes a health endpoint for deployment checks.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
              {roadmap.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Career Outcomes</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {careerPaths.map((career) => (
            <div key={career.title} className="rounded-md border p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{career.title}</p>
                <span className="text-sm font-semibold">{career.salary}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {career.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
