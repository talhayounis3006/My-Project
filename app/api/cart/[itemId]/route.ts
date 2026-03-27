import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/session'
import { getDb, get, initDb, run } from '@/lib/db'

export async function PATCH(req: Request, context: { params: Promise<{ itemId: string }> }) {
  await initDb()
  const session = await getSessionUser()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { itemId } = await context.params
  const id = Number(itemId)
  const body = (await req.json().catch(() => null)) as { quantity?: number } | null
  const qty = Number(body?.quantity)
  if (!Number.isInteger(id) || !Number.isInteger(qty) || qty < 1) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const db = await getDb()
  const row = await get<{ id: number }>(db, `SELECT id FROM cart_items WHERE id = ? AND user_id = ?`, [id, session.sub])
  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  await run(db, `UPDATE cart_items SET quantity = ? WHERE id = ?`, [qty, id])
  return NextResponse.json({ ok: true })
}

export async function DELETE(_req: Request, context: { params: Promise<{ itemId: string }> }) {
  await initDb()
  const session = await getSessionUser()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { itemId } = await context.params
  const id = Number(itemId)
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'Invalid item id' }, { status: 400 })

  const db = await getDb()
  await run(db, `DELETE FROM cart_items WHERE id = ? AND user_id = ?`, [id, session.sub])
  return NextResponse.json({ ok: true })
}

