import * as React from "react";
import { cn } from "@/lib/utils";

export function Dialog({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) {
    return null;
  }

  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4">{children}</div>;
}

export function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg", className)} {...props} />;
}

export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />;
}
