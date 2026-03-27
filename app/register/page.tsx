"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Lock, User, UserPlus } from "lucide-react"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    if (!email || !password || !confirmPassword) {
      setIsLoading(false)
      setError('Please fill all required fields')
      return
    }
    if (password !== confirmPassword) {
      setIsLoading(false)
      setError('Passwords do not match')
      return
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setIsLoading(false)
        setError(data?.error || 'Registration failed')
        return
      }
      window.location.href = '/'
    } catch {
      setIsLoading(false)
      setError('Registration failed')
    }
  }

  return (
    <main className="flex min-h-screen flex-col relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 gradient-warm opacity-50" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/40 backdrop-blur-md border-b border-white/20">
        <div className="container flex h-18 items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-16 h-12 overflow-hidden">
              <Image src="/images/BalkanLogo.png" alt="Balkan Food Logo" width={64} height={48} className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-bold tracking-tight gradient-text">Balkan Food</span>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase -mt-0.5">S.R.L - Authentic Taste</span>
            </div>
          </Link>
          <Link href="/" className="text-sm font-medium flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Register Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-[500px] animate-fade-in-up">
          <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-bl-full" />
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 shadow-lg shadow-primary/20">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <h1 className="font-heading text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">Join our community and experience authenticity</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    className="h-12 pl-12 rounded-xl border-border/60 bg-white/50 focus:bg-white transition-all shadow-sm"
                    required
                    value={name}
                    onChange={(e) => setName((e.target as HTMLInputElement).value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="h-12 pl-12 rounded-xl border-border/60 bg-white/50 focus:bg-white transition-all shadow-sm"
                    required
                    value={email}
                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider ml-1">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 pl-12 rounded-xl border-border/60 bg-white/50 focus:bg-white transition-all shadow-sm"
                      required
                      value={password}
                      onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm-password" className="text-xs font-semibold uppercase tracking-wider ml-1">Confirm</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 pl-12 rounded-xl border-border/60 bg-white/50 focus:bg-white transition-all shadow-sm"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword((e.target as HTMLInputElement).value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-1 pt-2">
                <input type="checkbox" id="terms" className="rounded-sm border-border accent-primary h-4 w-4" required />
                <label htmlFor="terms" className="text-[10px] text-muted-foreground leading-tight">
                  I agree to the <Link href="#" className="font-bold text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="font-bold text-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn-premium w-full py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign Up <UserPlus className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary hover:underline transition-all">
                Sign In Instead
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full p-8 relative z-10">
        <p className="text-center text-[10px] text-muted-foreground/60 uppercase tracking-widest">
          © {new Date().getFullYear()} Balkan Food S.R.L - Pure Authentic Experience
        </p>
      </footer>
    </main>
  )
}
