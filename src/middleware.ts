import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow login page and login API through
  if (pathname === '/dashboard/login' || pathname === '/api/dashboard/login') {
    return NextResponse.next()
  }

  const token = req.cookies.get('dashboard_auth')?.value
  if (token !== process.env.DASHBOARD_TOKEN) {
    return NextResponse.redirect(new URL('/dashboard/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/dashboard/:path*'],
}
