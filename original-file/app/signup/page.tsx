import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { Badge } from "@/components/ui/badge";

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-3">
        <Badge>Start learning</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Create your AI Academy account</h1>
        <p className="text-sm leading-6 text-muted-foreground">Sign up to unlock the full prompt vault, protected lessons, and progress tracking for 7 days.</p>
      </div>
      <AuthForm mode="signup" />
      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link className="font-medium text-foreground" href="/login">
          Log in
        </Link>
      </p>
    </div>
  );
}
