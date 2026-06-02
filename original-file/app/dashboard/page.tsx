import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let email = "";

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    email = user.email ?? "";
  } catch {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Signed in as {email}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Protected learning workspace</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-6 text-muted-foreground">
            This route is protected by Supabase auth and is ready for progress summaries, saved prompts, and account-specific learning state.
          </p>
          <form action="/auth/logout" method="post">
            <Button type="submit" variant="secondary">
              Log out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
