import { NextResponse } from 'next/server'
import { getDb, initDb, run } from '@/lib/db'
import { getSessionUser } from '@/lib/session'

export async function POST(req: Request) {
  await initDb()
  const session = await getSessionUser()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await req.json().catch(() => null)) as
    | { name?: string; email?: string; subject?: string; message?: string }
    | null

  const name = body?.name?.trim()
  const email = body?.email?.trim()
  const subject = body?.subject?.trim()
  const message = body?.message?.trim()
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Please fill all fields' }, { status: 400 })
  }

  const db = await getDb()
  await run(db, `INSERT INTO contact_messages (user_id, name, email, subject, message) VALUES (?, ?, ?, ?, ?)`, [
    session.sub,
    name,
    email,
    subject,
    message,
  ])
  return NextResponse.json({ ok: true, message: 'Email sent successfully' })
}

