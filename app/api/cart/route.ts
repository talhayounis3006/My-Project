import { NextResponse } from 'next/server'
import { all, getDb, initDb, run } from '@/lib/db'
import { getSessionUser } from '@/lib/session'
import { products } from '@/lib/products'

type CartRow = {
  id: number
  product_id: number
  quantity: number
}

function toNumberPrice(price: string) {
  return Number(price.replace('$', ''))
}

export async function GET() {
  await initDb()
  const session = await getSessionUser()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = await getDb()
  const rows = await all<CartRow>(db, `SELECT id, product_id, quantity FROM cart_items WHERE user_id = ? ORDER BY id DESC`, [
    session.sub,
  ])
  const items = rows
    .map((row) => {
      const product = products.find((p) => p.id === row.product_id)
      if (!product) return null
      const unitPrice = toNumberPrice(product.price)
      return {
        id: row.id,
        productId: row.product_id,
        quantity: row.quantity,
        unitPrice,
        lineTotal: Number((unitPrice * row.quantity).toFixed(2)),
        product,
      }
    })
    .filter(Boolean)

  const subtotal = Number(items.reduce((acc, item) => acc + (item?.lineTotal || 0), 0).toFixed(2))
  return NextResponse.json({ ok: true, items, subtotal })
}

export async function DELETE() {
  await initDb()
  const session = await getSessionUser()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = await getDb()
  await run(db, `DELETE FROM cart_items WHERE user_id = ?`, [session.sub])
  return NextResponse.json({ ok: true })
}

