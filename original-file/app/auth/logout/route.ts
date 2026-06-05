import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/security";
import { createSupabaseRouteClient } from "@/lib/supabase/route";

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(`logout:${getClientIp(request)}`, 20, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { applyCookies, supabase } = createSupabaseRouteClient(request);
  await supabase.auth.signOut();

  return applyCookies(NextResponse.redirect(new URL("/login", request.url)));
}
