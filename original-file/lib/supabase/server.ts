import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getServerEnv } from "@/lib/env";

export async function createSupabaseServerClient() {
  const env = getServerEnv();
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // Force Path=/ : next/headers defaults the cookie path to the
              // current route (e.g. /auth/start), which scopes the cookie so
              // narrowly the browser never sends it back on other pages —
              // silently killing the session on navigation.
              cookieStore.set(name, value, { ...options, path: "/" });
            });
          } catch {
            // Server Components cannot set cookies. Middleware and Server Actions can.
          }
        },
      },
    }
  );
}
