"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("Inquiry from Balkan Food website")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !subject || !message) {
      window.alert("Please fill all fields")
      return
    }
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      window.alert("Thank you for your message! We will get back to you soon.")
      setName("")
      setEmail("")
      setMessage("")
      setIsSubmitting(false)
    }, 1000)
  }

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
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                <Textarea
                  placeholder="Your message..."
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
