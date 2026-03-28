"use client"

import Link from "next/link"

export function CartIndicator() {
  return (
    <Link href="/contact" className="text-sm font-medium nav-link-animated text-foreground/80 hover:text-primary transition-colors">
      Cart
    </Link>
  )
}

