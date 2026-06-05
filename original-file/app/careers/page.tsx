import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { careerPaths } from "@/data/content";

export default function CareersPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Badge>Career outcomes</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          AI Career Paths
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Use these paths to decide which modules, projects, and portfolio
          artifacts matter most for your goal.
        </p>
        <Button asChild>
          <Link href="/advisor">Build my AI career roadmap</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {careerPaths.map((career) => (
          <Card key={career.title}>
            <CardHeader>
              <BriefcaseBusiness className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-start justify-between gap-3">
                <CardTitle>{career.title}</CardTitle>
                <span className="text-sm font-semibold">{career.salary}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>{career.description}</p>
              <div className="rounded-md border p-3">
                <p className="font-medium text-foreground">Recommended path</p>
                <p>{career.modulePath}</p>
              </div>
              <Button asChild variant="secondary">
                <Link href="/courses">Find matching modules</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
