"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      if (!email || !password) {
        setIsLoading(false)
        setError('Please enter email and password')
        return
      }
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        setIsLoading(false)
        setError(data?.error || 'Login failed')
        return
      }
      window.location.href = '/'
    } catch {
      setIsLoading(false)
      setError('Login failed')
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

      {/* Login Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-[450px] animate-fade-in-up">
          <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-5 rounded-bl-full" />
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6 shadow-lg shadow-primary/20">
                <LogIn className="h-8 w-8 text-white" />
              </div>
              <h1 className="font-heading text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              <div className="space-y-2">
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

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider">Password</Label>
                  <Link href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
                </div>
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

              <button 
                type="submit" 
                className="btn-premium w-full py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <LogIn className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Social sign-in options removed per request */}

            <p className="mt-10 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline transition-all">
                Sign Up Now
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
