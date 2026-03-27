import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSessionToken, getSessionCookieName, verifyPassword } from '@/lib/auth'
import { getDb, get, initDb } from '@/lib/db'

type UserRow = { id: number; email: string; password_hash: string }

export async function POST(req: Request) {
  await initDb()
  const body = (await req.json().catch(() => null)) as { email?: string; password?: string } | null
  const email = body?.email?.trim().toLowerCase()
  const password = body?.password
  if (!email || !password) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })

  const db = await getDb()
  const user = await get<UserRow>(db, `SELECT id, email, password_hash FROM users WHERE email = ?`, [email])
  if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  const ok = await verifyPassword(password, user.password_hash)
  if (!ok) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })

  const maxAgeSeconds = 60 * 60 * 24 * 30
  const token = await createSessionToken({ sub: user.id, email: user.email }, maxAgeSeconds)

  const jar = await cookies()
  jar.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds,
  })

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } })
}
