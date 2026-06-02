import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-3">
        <Badge>Welcome back</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Log in to AI Academy</h1>
        <p className="text-sm leading-6 text-muted-foreground">Continue your courses, prompts, and progress tracking.</p>
      </div>
      <AuthForm mode="login" />
      <p className="text-sm text-muted-foreground">
        New here?{" "}
        <Link className="font-medium text-foreground" href="/signup">
          Create an account
        </Link>
      </p>
    </div>
  );
}
