import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Exchange auth code for session
  await supabase.auth.exchangeCodeForSession(
    requestUrl.searchParams.get("code")!
  );

  // Redirect to dashboard after login
  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}
