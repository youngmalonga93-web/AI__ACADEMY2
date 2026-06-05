import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";

const PasswordResetForm = dynamic(() =>
  import("@/components/auth/PasswordResetForm").then(
    (module) => module.PasswordResetForm
  )
);

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-3">
        <Badge>Account access</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Set a new password
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Use the secure email link to choose a new password for AI Academy.
        </p>
      </div>
      <Suspense
        fallback={
          <p className="rounded-lg border bg-card p-5 text-sm text-muted-foreground">
            Loading secure password reset...
          </p>
        }
      >
        <PasswordResetForm />
      </Suspense>
    </div>
  );
}
