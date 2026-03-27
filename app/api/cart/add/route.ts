import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/session'
import { getDb, get, initDb, run } from '@/lib/db'
import { products } from '@/lib/products'

export async function POST(req: Request) {
  try {
    await initDb()
    const session = await getSessionUser()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { productId, quantity } = body || {}
    const parsedId = Number(productId)
    const qty = Math.max(1, Number(quantity || 1))
    if (!Number.isInteger(parsedId)) return NextResponse.json({ error: 'Invalid product id' }, { status: 400 })
    const product = products.find((p) => p.id === parsedId)
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

    const db = await getDb()
    const existing = await get<{ id: number; quantity: number }>(
      db,
      `SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?`,
      [session.sub, parsedId]
    )
    if (existing) {
      await run(db, `UPDATE cart_items SET quantity = ? WHERE id = ?`, [existing.quantity + qty, existing.id])
    } else {
      await run(db, `INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)`, [session.sub, parsedId, qty])
    }
    return NextResponse.json({ ok: true, productId: parsedId, quantity: qty })
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}
