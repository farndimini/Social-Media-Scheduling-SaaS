import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(request: NextRequest) {
  try {
    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req: request, res: NextResponse.next() })

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()

    // Get the current session
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if the request is for a protected route
    const isProtectedRoute =
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/create-post") ||
      request.nextUrl.pathname.startsWith("/create-video-post")

    // If accessing a protected route without a session, redirect to login
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // If accessing login/signup with a session, redirect to dashboard
    if ((request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup") && session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  } catch (error) {
    console.error("Middleware error:", error)
  }

  return NextResponse.next()
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/create-post", "/create-video-post", "/login", "/signup"],
}
