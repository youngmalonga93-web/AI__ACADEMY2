"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { PromptCategory, PromptTemplate, ToolDefinition } from "@/data/types";

type PromptVaultProps = {
  categories: PromptCategory[];
  prompts: PromptTemplate[];
  tools: ToolDefinition[];
};

export function PromptVault({ categories, prompts, tools }: PromptVaultProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [tool, setTool] = useState("all");

  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesCategory = category === "all" || prompt.category === category;
      const matchesTool = tool === "all" || prompt.tools.includes(tool);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [prompt.title, prompt.task, prompt.prompt, ...prompt.tags].join(" ").toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesTool && matchesQuery;
    });
  }, [category, prompts, query, tool]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
        <Input placeholder="Search prompts, tasks, and tags" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="h-10 rounded-md border bg-card px-3 text-sm" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <select className="h-10 rounded-md border bg-card px-3 text-sm" value={tool} onChange={(event) => setTool(event.target.value)}>
          <option value="all">All tools</option>
          {tools.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted-foreground">{filteredPrompts.length} prompts match the current filters.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge>{prompt.tier}</Badge>
                  <CardTitle className="mt-3">{prompt.title}</CardTitle>
                </div>
                <Badge>{prompt.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">{prompt.task}</p>
              <div className="rounded-md bg-muted p-3 text-sm leading-6 text-muted-foreground">{prompt.prompt}</div>
              <div className="flex flex-wrap gap-2">
                {prompt.tools.map((toolId) => {
                  const promptTool = tools.find((item) => item.id === toolId);
                  return <Badge key={toolId}>{promptTool?.label ?? toolId}</Badge>;
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
