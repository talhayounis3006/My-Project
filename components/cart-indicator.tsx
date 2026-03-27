"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function CartIndicator() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("/api/cart")
      .then(async (res) => {
        if (!res.ok) return
        const data = (await res.json()) as { items?: Array<{ quantity: number }> }
        const qty = (data.items || []).reduce((sum, item) => sum + item.quantity, 0)
        setCount(qty)
      })
      .catch(() => {})
  }, [])

  return (
    <Link href="/contact" className="text-sm font-medium nav-link-animated text-foreground/80 hover:text-primary transition-colors">
      Cart ({count})
    </Link>
  )
}

