"use client"

import Image from "next/image"
import Link from "next/link"
import { CartIndicator } from "@/components/cart-indicator"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
      <div className="container flex h-18 items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-16 h-12 overflow-hidden">
            <Image src="/images/BalkanLogo.png" alt="Balkan Food Logo" width={64} height={48} className="object-contain" priority />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-heading font-bold tracking-tight gradient-text">Balkan Food</span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase -mt-0.5">S.R.L - Authentic Taste</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium nav-link-animated text-foreground/80 hover:text-primary transition-colors">Home</Link>
          <Link href="/menu" className="text-sm font-medium nav-link-animated text-foreground/80 hover:text-primary transition-colors">Products</Link>
          <Link href="/contact" className="text-sm font-medium nav-link-animated text-foreground/80 hover:text-primary transition-colors">Contact</Link>
          <CartIndicator />
          <Link href="/contact" className="btn-premium text-xs px-5 py-2 rounded-full">Order Now</Link>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu could be added here if needed */}
        </div>
      </div>
    </header>
  )
}
