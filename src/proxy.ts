import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin routes (not /admin/login itself)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session')

    if (!adminSession || adminSession.value !== 'authenticated') {
      // Also check for Supabase auth token cookies
      const hasSupabaseSession = Array.from(request.cookies.getAll()).some(
        (cookie) => cookie.name.startsWith('sb-') && cookie.name.includes('-auth-token')
      )

      if (!hasSupabaseSession) {
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
