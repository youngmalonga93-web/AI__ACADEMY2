"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type {
  PromptCategory,
  PromptTemplate,
  ToolDefinition,
} from "@/data/types";
import {
  FREE_PROMPT_IDS,
  canAccessPrompt,
  isFreePrompt,
} from "@/lib/entitlements";
import { filterPrompts } from "@/lib/prompts";

type PromptVaultProps = {
  categories: PromptCategory[];
  isSignedIn: boolean;
  prompts: PromptTemplate[];
  tools: ToolDefinition[];
  trialDaysRemaining: number;
  trialEndsAt: string | null;
  trialIsActive: boolean;
};

export function PromptVault({
  categories,
  isSignedIn,
  prompts,
  tools,
  trialDaysRemaining,
  trialEndsAt,
  trialIsActive,
}: PromptVaultProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [tool, setTool] = useState("all");
  const [selectedPromptId, setSelectedPromptId] = useState<number | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  const selectedPrompt = prompts.find(
    (prompt) => prompt.id === selectedPromptId
  );
  const trialState = useMemo(
    () => ({
      startsAt: null,
      endsAt: trialEndsAt ? new Date(trialEndsAt) : null,
      daysRemaining: trialDaysRemaining,
      isActive: trialIsActive,
    }),
    [trialDaysRemaining, trialEndsAt, trialIsActive]
  );
  const freePromptCount = prompts.filter((prompt) =>
    isFreePrompt(prompt.id)
  ).length;
  const selectedPromptIsAccessible = selectedPrompt
    ? canAccessPrompt(selectedPrompt, isSignedIn, trialState)
    : false;

  const filteredPrompts = useMemo(() => {
    return filterPrompts(prompts, { category, query, tool });
  }, [category, prompts, query, tool]);

  function copyWithTextArea(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const didCopy = document.execCommand("copy");
    document.body.removeChild(textArea);

    return didCopy;
  }

  async function copyPrompt(prompt: PromptTemplate) {
    if (!canAccessPrompt(prompt, isSignedIn, trialState)) {
      setCopyStatus("Start the free trial to copy this prompt.");
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(prompt.prompt);
        } catch {
          if (!copyWithTextArea(prompt.prompt)) {
            throw new Error("Clipboard fallback failed");
          }
        }
      } else {
        if (!copyWithTextArea(prompt.prompt)) {
          throw new Error("Clipboard fallback failed");
        }
      }

      setCopyStatus(`Copied ${prompt.title}`);
    } catch {
      setCopyStatus(
        "Copy failed. Select the prompt text and copy it manually."
      );
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-foreground/20 bg-muted/30">
        <CardContent className="grid gap-4 p-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-medium">
              {trialIsActive
                ? `Trial active: ${trialDaysRemaining} day${trialDaysRemaining === 1 ? "" : "s"} left.`
                : isSignedIn
                  ? "Your trial has ended. Stripe upgrade is the next implementation step."
                  : `Start free with ${freePromptCount} powerful prompts.`}
            </p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Free prompts are open to everyone. A new account unlocks the full
              vault for 7 days before paid plans begin.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {!isSignedIn ? (
              <Button asChild>
                <Link href="/signup">Start 7-day trial</Link>
              </Button>
            ) : null}
            <Button asChild variant="secondary">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Input
          placeholder="Search prompts, tasks, and tags"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="h-10 rounded-md border bg-card px-3 text-sm"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          className="h-10 rounded-md border bg-card px-3 text-sm"
          value={tool}
          onChange={(event) => setTool(event.target.value)}
        >
          <option value="all">All tools</option>
          {tools.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredPrompts.length} prompts match the current filters.
      </p>
      <p className="sr-only" role="status" aria-live="polite">
        {copyStatus}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPrompts.map((prompt) => {
          const isAccessible = canAccessPrompt(prompt, isSignedIn, trialState);
          const isFree = FREE_PROMPT_IDS.includes(prompt.id);

          return (
            <Card
              key={prompt.id}
              className={!isAccessible ? "border-dashed" : undefined}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge>{prompt.tier}</Badge>
                    <CardTitle className="mt-3">{prompt.title}</CardTitle>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge>{prompt.category}</Badge>
                    <Badge>
                      {isAccessible ? (isFree ? "Free" : "Trial") : "Locked"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  {prompt.task}
                </p>
                <div className="rounded-md bg-muted p-3 text-sm leading-6 text-muted-foreground">
                  {isAccessible
                    ? prompt.prompt
                    : "Locked prompt. Start the 7-day trial to view and copy the full workflow."}
                </div>
                <div className="flex flex-wrap gap-2">
                  {prompt.tools.map((toolId) => {
                    const promptTool = tools.find((item) => item.id === toolId);
                    return (
                      <Badge key={toolId}>{promptTool?.label ?? toolId}</Badge>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    disabled={!isAccessible}
                    type="button"
                    onClick={() => setSelectedPromptId(prompt.id)}
                    variant="secondary"
                  >
                    View details
                  </Button>
                  {isAccessible ? (
                    <Button
                      type="button"
                      onClick={() => copyPrompt(prompt)}
                      aria-label={`Copy ${prompt.title} prompt`}
                    >
                      Copy prompt
                    </Button>
                  ) : (
                    <Button asChild>
                      <Link href={isSignedIn ? "/pricing" : "/signup"}>
                        {isSignedIn ? "Upgrade soon" : "Start trial"}
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={selectedPrompt !== undefined && selectedPromptIsAccessible}>
        {selectedPrompt ? (
          <DialogContent
            role="dialog"
            aria-modal="true"
            aria-labelledby="prompt-detail-title"
          >
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <Badge>{selectedPrompt.tier}</Badge>
                  <DialogTitle id="prompt-detail-title">
                    {selectedPrompt.title}
                  </DialogTitle>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedPromptId(null)}
                  aria-label="Close prompt details"
                >
                  Close
                </Button>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                {selectedPrompt.task}
              </p>

              <div className="rounded-md bg-muted p-4 text-sm leading-6 text-muted-foreground">
                {selectedPrompt.prompt}
              </div>

              {selectedPrompt.tip ? (
                <div className="rounded-md border p-3 text-sm leading-6 text-muted-foreground">
                  <span className="font-medium text-foreground">Tip: </span>
                  {selectedPrompt.tip}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {selectedPrompt.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => copyPrompt(selectedPrompt)}
                  aria-label={`Copy ${selectedPrompt.title} prompt from details`}
                >
                  Copy prompt
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setSelectedPromptId(null)}
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
}
