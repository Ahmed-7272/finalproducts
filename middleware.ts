import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the user is accessing the dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check for auth token in cookies
    const authToken = request.cookies.get('auth-token')
    
    if (!authToken) {
      // Redirect to login if no auth token
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*'
}