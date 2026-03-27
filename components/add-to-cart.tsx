"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

interface Props {
  disabled?: boolean
  productId: number
}

export default function AddToCartButton({ disabled, productId }: Props) {
  const router = useRouter()

  const handleClick = async () => {
    if (disabled) return
    try {
      const res = await fetch('/api/auth/me', { method: 'GET' })
      if (!res.ok) {
        router.push('/login?next=/menu')
        return
      }
      const addRes = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      })
      if (!addRes.ok) {
        window.alert('Failed to add item to cart')
        return
      }
      window.alert('Item added to cart')
      router.push('/contact')
    } catch {
      router.push('/login')
    }
  }

  return (
    <button onClick={handleClick} disabled={disabled} className="btn-premium flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
      <ShoppingCart className="h-4 w-4" /> Add to Cart
    </button>
  )
}
