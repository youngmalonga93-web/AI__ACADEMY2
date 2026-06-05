"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ProjectReviewResponse = {
  summary: string;
  scores: Array<{
    category: string;
    score: number;
    rationale: string;
  }>;
  strengths: string[];
  risks: string[];
  nextActions: string[];
  portfolioUpgrade: string;
  provider: string;
  model: string;
  retrievedContext: Array<{
    id: string;
    type: string;
    title: string;
    url: string;
  }>;
};

const starterDescription =
  "I built an AI assistant that helps small business owners turn messy customer notes into a weekly action plan. It asks for the business goal, summarizes customer pain points, suggests follow-up messages, and produces a checklist the owner can use immediately.";

export function ProjectReviewerClient() {
  const [title, setTitle] = useState("Customer Notes to Action Plan");
  const [audience, setAudience] = useState("Small business owners");
  const [goal, setGoal] = useState(
    "Show that I can build a useful AI workflow with real business value."
  );
  const [description, setDescription] = useState(starterDescription);
  const [evidence, setEvidence] = useState(
    "Prototype screens, three sample inputs, three outputs, and a before/after checklist."
  );
  const [response, setResponse] = useState<ProjectReviewResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submitProjectReview() {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetch("/api/ai/project-reviewer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          audience,
          goal,
          description,
          evidence,
        }),
      });
      const data = (await result.json()) as ProjectReviewResponse & {
        error?: string;
      };

      if (!result.ok) {
        setError(data.error ?? "Project Reviewer could not respond yet.");
        setResponse(null);
        return;
      }

      setResponse(data);
    } catch {
      setError(
        "Project Reviewer is temporarily unavailable. Try again in a moment."
      );
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }

  const canSubmit =
    title.length >= 3 &&
    audience.length >= 3 &&
    goal.length >= 10 &&
    description.length >= 40;

  return (
    <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <CardHeader>
          <CardTitle>Submit a Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="project-title">
              Project title
            </label>
            <Input
              id="project-title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="project-audience">
              Target user
            </label>
            <Input
              id="project-audience"
              onChange={(event) => setAudience(event.target.value)}
              value={audience}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="project-goal">
              Review goal
            </label>
            <Input
              id="project-goal"
              onChange={(event) => setGoal(event.target.value)}
              value={goal}
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium"
              htmlFor="project-description"
            >
              Project description
            </label>
            <textarea
              className="min-h-44 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              id="project-description"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="project-evidence">
              Evidence or links
            </label>
            <textarea
              className="min-h-24 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              id="project-evidence"
              onChange={(event) => setEvidence(event.target.value)}
              value={evidence}
            />
          </div>
          {error ? (
            <p className="rounded-md border border-destructive/30 bg-muted p-3 text-sm text-muted-foreground">
              {error}
            </p>
          ) : null}
          <Button
            disabled={isLoading || !canSubmit}
            onClick={submitProjectReview}
          >
            {isLoading ? "Reviewing..." : "Review project"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle>Reviewer Output</CardTitle>
              {response ? (
                <Badge>
                  {response.provider} - {response.model}
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {response ? (
              <>
                <p className="text-sm leading-6 text-muted-foreground">
                  {response.summary}
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {response.scores.map((score) => (
                    <div
                      className="rounded-md border bg-muted/30 p-3"
                      key={score.category}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium">{score.category}</p>
                        <Badge>{score.score}/10</Badge>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        {score.rationale}
                      </p>
                    </div>
                  ))}
                </div>
                <ReviewList title="Strengths" items={response.strengths} />
                <ReviewList title="Risks" items={response.risks} />
                <ReviewList title="Next Actions" items={response.nextActions} />
                <div className="rounded-md border bg-muted/40 p-4">
                  <p className="text-sm font-medium">Portfolio Upgrade</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {response.portfolioUpgrade}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-sm leading-6 text-muted-foreground">
                Submit a project and the reviewer will score it against a
                practical AI portfolio rubric: problem clarity, user value,
                workflow quality, evidence, reliability, security, and
                presentation.
              </p>
            )}
          </CardContent>
        </Card>

        {response ? (
          <Card>
            <CardHeader>
              <CardTitle>Relevant Academy Material</CardTitle>
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

function ReviewList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium">{title}</p>
      <ul className="mt-2 space-y-2">
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
