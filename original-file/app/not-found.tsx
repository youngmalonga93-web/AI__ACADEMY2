import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            This link does not point to a current AI Academy page. Start from
            the catalog and choose a live lesson.
          </p>
          <Button asChild>
            <Link href="/courses">Open courses</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
