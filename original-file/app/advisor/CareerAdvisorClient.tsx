"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";

type CareerAdvisorResponse = {
  summary: string;
  skillGaps: string[];
  roadmap: Array<{
    phase: string;
    focus: string;
    actions: string[];
  }>;
  portfolioProjects: string[];
  weeklyPlan: string[];
  positioning: string;
  retrievedContext: Array<{
    id: string;
    type: string;
    title: string;
    url: string;
  }>;
};

export function CareerAdvisorClient() {
  const [currentRole, setCurrentRole] = useState("Operations coordinator");
  const [targetRole, setTargetRole] = useState("AI Product Manager");
  const [skills, setSkills] = useState(
    "Project management, customer support workflows, basic prompt engineering, spreadsheets, and process documentation."
  );
  const [timeline, setTimeline] = useState("90 days");
  const [constraints, setConstraints] = useState(
    "I can study 8 hours per week and need portfolio projects that do not require paid tools."
  );
  const [response, setResponse] = useState<CareerAdvisorResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submitCareerAdvisor() {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetch("/api/ai/career-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentRole,
          targetRole,
          skills,
          timeline,
          constraints,
        }),
      });
      const data = (await result.json()) as CareerAdvisorResponse & {
        error?: string;
      };

      if (!result.ok) {
        setError(data.error ?? "Career Advisor could not respond yet.");
        setResponse(null);
        return;
      }

      setResponse(data);
    } catch {
      setError("Career Advisor is temporarily unavailable. Try again shortly.");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }

  const canSubmit =
    currentRole.length >= 2 &&
    targetRole.length >= 2 &&
    skills.length >= 10 &&
    timeline.length >= 2;

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <CardHeader>
          <CardTitle>Career Inputs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field
            id="current-role"
            label="Current role"
            onChange={setCurrentRole}
            value={currentRole}
          />
          <Field
            id="target-role"
            label="Target AI role"
            onChange={setTargetRole}
            value={targetRole}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="skills">
              Current skills
            </label>
            <textarea
              className="min-h-32 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              id="skills"
              onChange={(event) => setSkills(event.target.value)}
              value={skills}
            />
          </div>
          <Field
            id="timeline"
            label="Timeline"
            onChange={setTimeline}
            value={timeline}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="constraints">
              Constraints
            </label>
            <textarea
              className="min-h-24 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              id="constraints"
              onChange={(event) => setConstraints(event.target.value)}
              value={constraints}
            />
          </div>
          <ErrorMessage message={error} title="Career Advisor error" />
          <Button
            disabled={isLoading || !canSubmit}
            onClick={submitCareerAdvisor}
          >
            {isLoading ? "Building roadmap..." : "Build career roadmap"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Career Roadmap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {response ? (
              <>
                <p className="text-sm leading-6 text-muted-foreground">
                  {response.summary}
                </p>
                <SimpleList title="Skill gaps" items={response.skillGaps} />
                <div className="grid gap-3 md:grid-cols-3">
                  {response.roadmap.map((phase) => (
                    <div
                      className="rounded-md border bg-muted/30 p-3"
                      key={phase.phase}
                    >
                      <Badge>{phase.phase}</Badge>
                      <p className="mt-3 text-sm font-medium">{phase.focus}</p>
                      <ul className="mt-2 space-y-2 text-xs leading-5 text-muted-foreground">
                        {phase.actions.map((action) => (
                          <li key={action}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <SimpleList
                  title="Portfolio projects"
                  items={response.portfolioProjects}
                />
                <SimpleList title="Weekly plan" items={response.weeklyPlan} />
                <div className="rounded-md border bg-muted/40 p-4">
                  <p className="text-sm font-medium">Positioning</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {response.positioning}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                Enter your current role and target AI outcome. The advisor will
                create a practical plan with skill gaps, portfolio work, weekly
                schedule, and matching Academy resources.
              </p>
            )}
          </CardContent>
        </Card>

        {response ? (
          <Card>
            <CardHeader>
              <CardTitle>Matching Academy Material</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 md:grid-cols-2">
              {response.retrievedContext.slice(0, 6).map((item) => (
                <Link
                  className="rounded-md border bg-card p-3 text-sm hover:bg-muted"
                  href={item.url}
                  key={item.id}
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.type}
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  onChange,
  value,
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </div>
  );
}

function SimpleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <ul className="mt-2 grid gap-2 md:grid-cols-2">
        {items.map((item) => (
          <li
            className="rounded-md border bg-card px-3 py-2 text-sm leading-6 text-muted-foreground"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
