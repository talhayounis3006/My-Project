"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LogOut } from "lucide-react"
import { CartIndicator } from "@/components/cart-indicator"

export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<{ id: number; email: string; name: string | null } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (res.ok) return res.json()
        return null
      })
      .then((data) => {
        if (data?.ok) setUser(data.user)
        else setUser(null)
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" })
      if (res.ok) {
        setUser(null)
        router.push("/login")
        router.refresh()
      }
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

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
          
          {!loading && user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-muted-foreground hidden lg:inline-block">
                Hi, {user.name || user.email.split("@")[0]}
              </span>
              <button 
                onClick={handleLogout}
                className="text-sm font-medium text-foreground/80 hover:text-red-600 transition-colors flex items-center gap-1.5 group"
              >
                <LogOut className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-sm font-medium nav-link-animated text-foreground/80 hover:text-primary transition-colors">Sign In</Link>
          )}

          <CartIndicator />
          <Link href="/contact" className="btn-premium text-xs px-5 py-2 rounded-full">Order Now</Link>
        </nav>
        <div className="md:hidden">{/* Mobile menu button could go here */}</div>
      </div>
    </header>
  )
}
