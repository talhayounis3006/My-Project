import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSessionToken, getSessionCookieName, hashPassword } from '@/lib/auth'
import { getDb, get, initDb, run } from '@/lib/db'

type ExistingRow = { id: number }

export async function POST(req: Request) {
  await initDb()
  const body = (await req.json().catch(() => null)) as { email?: string; password?: string; name?: string } | null
  const email = body?.email?.trim().toLowerCase()
  const password = body?.password
  const name = body?.name?.trim() || null

  if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  if (password.length < 6) return NextResponse.json({ error: 'Password too short' }, { status: 400 })

  const db = getDb()
  const existing = await get<ExistingRow>(db, `SELECT id FROM users WHERE email = ?`, [email])
  if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 })

  const password_hash = await hashPassword(password)
  await run(db, `INSERT INTO users (email, name, password_hash) VALUES (?, ?, ?)`, [email, name, password_hash])

  const created = await get<{ id: number; email: string; name: string | null }>(
    db,
    `SELECT id, email, name FROM users WHERE email = ?`,
    [email]
  )
  if (!created) return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })

  const maxAgeSeconds = 60 * 60 * 24 * 30
  const token = await createSessionToken({ sub: created.id, email: created.email }, maxAgeSeconds)
  const jar = await cookies()
  jar.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds,
  })

  return NextResponse.json({ ok: true, user: created })
}

