import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware() {
    // Simply allow access to authenticated users
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages without token
        if (req.nextUrl.pathname.startsWith('/auth/') || 
            req.nextUrl.pathname === '/') {
          return true
        }
        
        // Require token for protected routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/calculator/:path*', '/dashboard/:path*']
}