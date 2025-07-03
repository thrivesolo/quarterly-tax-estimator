import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Check if user is trying to access calculator without payment
    if (req.nextUrl.pathname.startsWith('/calculator') || 
        req.nextUrl.pathname.startsWith('/dashboard')) {
      
      const token = req.nextauth.token
      
      // If user hasn't paid, redirect to pricing
      if (token && !token.hasPaid) {
        return NextResponse.redirect(new URL('/pricing', req.url))
      }
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to auth pages without token
        if (req.nextUrl.pathname.startsWith('/auth/') || 
            req.nextUrl.pathname === '/' ||
            req.nextUrl.pathname === '/pricing') {
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