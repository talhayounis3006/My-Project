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

  const handleClick = () => {
    if (disabled) return
    window.alert('Item added to cart (Demo Mode)')
    router.push('/contact')
  }

  return (
    <button onClick={handleClick} disabled={disabled} className="btn-premium flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
      <ShoppingCart className="h-4 w-4" /> Add to Cart
    </button>
  )
}
