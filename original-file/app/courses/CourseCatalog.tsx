"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CourseModule, Phase } from "@/data/types";
import { filterCourses } from "@/lib/courses";
import { coursePath } from "@/lib/routes";

type CourseCatalogProps = {
  modules: CourseModule[];
  phases: Phase[];
};

export function CourseCatalog({ modules, phases }: CourseCatalogProps) {
  const [query, setQuery] = useState("");
  const [phase, setPhase] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [tool, setTool] = useState("all");

  const difficulties = useMemo(
    () =>
      Array.from(new Set(modules.map((module) => module.difficulty))).filter(
        Boolean
      ),
    [modules]
  );
  const tools = useMemo(
    () =>
      Array.from(new Set(modules.flatMap((module) => module.tools)))
        .filter(Boolean)
        .sort(),
    [modules]
  );
  const filteredModules = useMemo(
    () => filterCourses(modules, { difficulty, phase, query, tool }),
    [difficulty, modules, phase, query, tool]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
        <Input
          placeholder="Search titles, skills, objectives, and tools"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="h-10 rounded-md border bg-card px-3 text-sm"
          value={phase}
          onChange={(event) => setPhase(event.target.value)}
        >
          <option value="all">All phases</option>
          {phases.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          className="h-10 rounded-md border bg-card px-3 text-sm"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
        >
          <option value="all">All levels</option>
          {difficulties.map((item) => (
            <option key={item} value={item}>
              {item}
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
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-muted-foreground">
        {filteredModules.length} modules match the current filters.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredModules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge>Module {module.id}</Badge>
                  <CardTitle className="mt-3">{module.title}</CardTitle>
                </div>
                <span className="rounded-md bg-muted px-3 py-2 text-sm font-semibold">
                  {module.icon}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">
                {module.subtitle}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span>{module.duration}</span>
                <span>{module.difficulty}</span>
                <span>{module.lessons.length} lessons</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {module.tools.slice(0, 5).map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
              <Button asChild>
                <Link href={coursePath(module.id)} prefetch={false}>
                  Open module
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
