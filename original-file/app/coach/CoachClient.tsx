"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";

type CoachApiResponse = {
  answer: string;
  provider: string;
  model: string;
  retrievedContext: Array<{
    id: string;
    type: string;
    title: string;
    url: string;
  }>;
};

export function CoachClient() {
  const [goal, setGoal] = useState("");
  const [message, setMessage] = useState(
    "I want to become better at using AI for real business workflows. What should I practice next?"
  );
  const [response, setResponse] = useState<CoachApiResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submitCoachRequest() {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetch("/api/ai/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, message }),
      });
      const data = (await result.json()) as CoachApiResponse & {
        error?: string;
      };

      if (!result.ok) {
        setError(data.error ?? "AI Coach could not respond yet.");
        setResponse(null);
        return;
      }

      setResponse(data);
    } catch {
      setError("AI Coach is temporarily unavailable. Try again in a moment.");
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Ask AI Coach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="goal">
              Learning goal
            </label>
            <Input
              id="goal"
              onChange={(event) => setGoal(event.target.value)}
              placeholder="Example: build AI automations for my business"
              value={goal}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="message">
              Question
            </label>
            <textarea
              className="min-h-40 w-full rounded-md border border-border bg-card px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              id="message"
              onChange={(event) => setMessage(event.target.value)}
              value={message}
            />
          </div>
          <ErrorMessage message={error} title="AI Coach error" />
          <Button
            disabled={isLoading || message.length < 10}
            onClick={submitCoachRequest}
          >
            {isLoading ? "Thinking..." : "Get coaching"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Coach Response</CardTitle>
            {response ? (
              <Badge>
                {response.provider} · {response.model}
              </Badge>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {response ? (
            <>
              <div className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                {response.answer}
              </div>
              <div className="rounded-md border bg-muted/40 p-3">
                <p className="text-sm font-medium">Retrieved context</p>
                <div className="mt-3 space-y-2">
                  {response.retrievedContext.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No direct course match was found.
                    </p>
                  ) : (
                    response.retrievedContext.slice(0, 5).map((item) => (
                      <Link
                        className="block rounded-md border bg-card p-3 text-sm hover:bg-muted"
                        href={item.url}
                        key={item.id}
                      >
                        <span className="font-medium">{item.title}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {item.type}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">
              Ask a question and AI Coach will retrieve the most relevant
              course, lesson, project, and prompt-vault context before
              answering.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
