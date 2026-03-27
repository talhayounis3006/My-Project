import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getSessionCookieName, verifySessionToken } from '@/lib/auth'
import { getDb, get, initDb } from '@/lib/db'

type UserRow = { id: number; email: string; name: string | null }

export async function GET() {
  await initDb()
  const jar = await cookies()
  const token = jar.get(getSessionCookieName())?.value
  const payload = await verifySessionToken(token)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  const user = await get<UserRow>(db, `SELECT id, email, name FROM users WHERE id = ?`, [payload.sub])
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  return NextResponse.json({ ok: true, user })
}
