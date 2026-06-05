"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorMessage } from "@/components/ui/error-message";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error", {
      message: error.message,
      digest: error.digest,
    });

    void fetch("/api/errors/client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "route-boundary",
        message: error.message,
        digest: error.digest,
        path: window.location.pathname,
      }),
    }).catch(() => undefined);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ErrorMessage
            message="This page could not load correctly. Try again, or return to the course catalog."
            title="Application error"
          />
          {error.digest ? (
            <p className="text-xs leading-5 text-muted-foreground">
              Error code: {error.digest}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={reset}>
              Try again
            </Button>
            <Button asChild variant="secondary">
              <Link href="/courses">Go to courses</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
