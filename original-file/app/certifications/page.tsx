import { Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { certifications } from "@/data/content";

export default function CertificationsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Badge>Credentials</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">AI Academy Certification Tracks</h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          These are the credential paths learners will unlock as exams, capstones, and certificate generation come online.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {certifications.map((certification) => (
          <Card key={certification.name}>
            <CardHeader>
              <Award className="h-5 w-5 text-muted-foreground" />
              <div className="flex items-start justify-between gap-3">
                <CardTitle>{certification.name}</CardTitle>
                <Badge>Level {certification.level}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>{certification.outcome}</p>
              <div className="rounded-md border p-3">
                <p className="font-medium text-foreground">Modules</p>
                <p>{certification.modules}</p>
              </div>
              <div className="rounded-md border p-3">
                <p className="font-medium text-foreground">Requirement</p>
                <p>{certification.requirement}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
          <CardTitle>What Comes Next</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          <p>Next implementation step: add graded exams, capstone submission, reviewer feedback, and generated certificates.</p>
          <Button asChild>
            <Link href="/courses">Start with the course track</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
