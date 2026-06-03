import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_ROUTES = ['/', '/login', '/register']
const AUTH_ROUTES   = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken  = request.cookies.get('accessToken')?.value

  // Redirect authenticated users away from login/register
  if (accessToken && AUTH_ROUTES.some(r => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/feed', request.url))
  }

  // Redirect unauthenticated users to login
  if (!accessToken && !PUBLIC_ROUTES.includes(pathname) && !AUTH_ROUTES.some(r => pathname.startsWith(r))) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
}
