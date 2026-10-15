import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";

type CookieToSet = {
  name: string;
  value: string;
  options?: Parameters<NextResponse["cookies"]["set"]>[2];
};

export function createSupabaseRouteClient(request: NextRequest) {
  const env = getServerEnv();
  const cookiesToSet: CookieToSet[] = [];

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(nextCookies) {
          cookiesToSet.push(...nextCookies);
        },
      },
    }
  );

  function applyCookies(response: NextResponse) {
    cookiesToSet.forEach(({ name, value, options }) => {
      // Explicit Path=/ : without it, cookies can be scoped to the current
      // route and the browser will not send them back on other pages,
      // silently killing the session on navigation.
      response.cookies.set(name, value, { ...options, path: "/" });
    });

    return response;
  }

  return { applyCookies, supabase };
}
