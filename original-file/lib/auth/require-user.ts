import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AuthedContext = {
  user: User;
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
};

/**
 * Standard session check for protected pages and server actions.
 *
 * Returns the authenticated user plus a server Supabase client bound to the
 * request cookies. Redirects to /login (preserving the destination via
 * ?next=) when there is no valid session.
 *
 * Every protected page must use this instead of inline getUser() + redirect
 * logic, so the session check behaves identically everywhere.
 */
export async function requireUser(nextPath?: string): Promise<AuthedContext> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      nextPath ? `/login?next=${encodeURIComponent(nextPath)}` : "/login"
    );
  }

  return { user, supabase };
}

/**
 * Non-redirecting session check for public pages that adapt to signed-in
 * users (course/lesson pages, prompt vault). Returns the user and a server
 * Supabase client, or nulls when there is no session.
 */
export async function getCurrentUser(): Promise<{
  user: User | null;
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
}> {
  const supabase = await createSupabaseServerClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return { user, supabase };
  } catch {
    return { user: null, supabase };
  }
}
