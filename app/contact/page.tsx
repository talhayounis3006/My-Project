"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

type CartItem = {
  id: number
  productId: number
  quantity: number
  unitPrice: number
  lineTotal: number
  product: { id: number; name: string; price: string }
}

export default function ContactPage() {
  const router = useRouter()
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoadingCart, setIsLoadingCart] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("New order from Balkan Food website")
  const [message, setMessage] = useState("")

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.lineTotal, 0), [cartItems])

  const loadCart = async () => {
    setIsLoadingCart(true)
    try {
      const res = await fetch("/api/cart")
      if (!res.ok) {
        setCartItems([])
        return
      }
      const data = (await res.json()) as { items?: CartItem[] }
      setCartItems(data.items || [])
    } catch {
      setCartItems([])
    } finally {
      setIsLoadingCart(false)
    }
  }

  useEffect(() => {
    const check = () => {
      fetch('/api/auth/me')
        .then((r) => {
          if (!r.ok) {
            router.push('/login?next=/contact')
            return
          }
          setIsAuthChecked(true)
          void loadCart()
        })
        .catch(() => router.push('/login?next=/contact'))
    }
    void check()
  }, [router])

  const updateQty = async (itemId: number, quantity: number) => {
    const safeQty = Math.max(1, quantity)
    await fetch(`/api/cart/${itemId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ quantity: safeQty }),
    })
    await loadCart()
  }

  const removeItem = async (itemId: number) => {
    await fetch(`/api/cart/${itemId}`, { method: "DELETE" })
    await loadCart()
  }

  const clearCart = async () => {
    await fetch("/api/cart", { method: "DELETE" })
    await loadCart()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !subject || !message) {
      window.alert("Please fill all fields")
      return
    }
    setIsSubmitting(true)
    try {
      const orderLines = cartItems.map((item) => `- ${item.product.name} x${item.quantity} (${item.product.price})`).join("\n")
      const finalMessage = `${message}\n\nOrder Items:\n${orderLines || "- No items in cart"}\nSubtotal: $${subtotal.toFixed(2)}`
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, subject, message: finalMessage }),
      })
      const data = (await res.json().catch(() => null)) as { error?: string; message?: string } | null
      if (!res.ok) {
        window.alert(data?.error || "Failed to send")
        setIsSubmitting(false)
        return
      }
      window.alert("Order submitted successfully!")
      setMessage("")
      await clearCart()
    } catch {
      window.alert("Failed to send")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthChecked) return null

  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      {/* Page Hero Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="container relative z-10 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-white/70 mb-3">✦ Get In Touch ✦</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3">Contact Us</h1>
          <p className="text-white/70 max-w-lg mx-auto">We&apos;d love to hear from you</p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="rounded-2xl p-8 bg-white shadow-xl border border-border/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-bl-full" />
            <h2 className="font-heading text-2xl font-bold mb-1">Send Us a Message</h2>
            <p className="text-sm text-muted-foreground mb-6">Fill out the form and we&apos;ll get back to you shortly.</p>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Name</label>
                <Input
                  placeholder="John Doe"
                  className="h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-white transition-colors"
                  value={name}
                  required
                  onChange={(e) => setName((e.target as HTMLInputElement).value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-white transition-colors"
                  value={email}
                  required
                  onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</label>
                <Input
                  placeholder="How can we help?"
                  className="h-12 rounded-xl border-border/60 bg-muted/30 focus:bg-white transition-colors"
                  value={subject}
                  required
                  onChange={(e) => setSubject((e.target as HTMLInputElement).value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message / Order Notes</label>
                <Textarea
                  placeholder="Tell us more about your order or questions..."
                  className="min-h-[150px] rounded-xl border-border/60 bg-muted/30 focus:bg-white transition-colors"
                  value={message}
                  required
                  onChange={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
                />
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-premium w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm">
                <Send className="h-4 w-4" /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-1">Contact Information</h2>
              <p className="text-sm text-muted-foreground">Reach out through any of these channels.</p>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-card border border-border/50 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">Your Cart</h3>
                  <button onClick={clearCart} className="text-xs text-red-600 hover:underline" type="button">Clear Cart</button>
                </div>
                {isLoadingCart ? (
                  <p className="text-sm text-muted-foreground">Loading cart...</p>
                ) : cartItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your cart is empty. Add items from product pages.</p>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="rounded-lg border border-border/40 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <button type="button" className="text-xs text-red-600 hover:underline" onClick={() => removeItem(item.id)}>Remove</button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button type="button" className="px-2 py-1 border rounded" onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                            <span className="text-sm">{item.quantity}</span>
                            <button type="button" className="px-2 py-1 border rounded" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                          </div>
                          <span className="text-sm font-semibold">${item.lineTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between border-t pt-3">
                      <span className="text-sm font-semibold">Subtotal</span>
                      <span className="text-sm font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
              {[
                { icon: MapPin, label: "Address", value: "123 Balkan Street, Foodville, NY 10001", color: "from-red-500 to-rose-600" },
                { icon: Phone, label: "Phone", value: "(123) 456-7890", color: "from-emerald-500 to-teal-600" },
                { icon: Mail, label: "Email", value: "info@balkanfoods.com", color: "from-blue-500 to-indigo-600" },
                { icon: Clock, label: "Business Hours", value: "Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM", color: "from-amber-500 to-orange-600" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 shadow-sm card-hover-lift group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.label}</h3>
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
