import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSessionCookieName, verifySessionToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(getSessionCookieName())?.value
  const payload = await verifySessionToken(token)
  const isAuthed = !!payload

  if (req.nextUrl.pathname.startsWith('/api/cart') || req.nextUrl.pathname.startsWith('/api/contact')) {
    if (!isAuthed) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    return NextResponse.next()
  }

  if (req.nextUrl.pathname === '/contact') {
    if (isAuthed) return NextResponse.next()
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('next', '/contact')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/contact', '/api/cart/:path*', '/api/contact/:path*'],
}
