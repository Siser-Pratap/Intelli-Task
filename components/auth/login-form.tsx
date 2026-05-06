"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import {
  Eye,
  EyeOff,
  Zap,
  Crown,
  Shield,
  UserCheck,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react"

interface LoginFormProps {
  onToggleMode: () => void
}

const QUICK_LOGIN = [
  {
    role: "Admin",
    email: "admin1@example.com",
    password: "admin-1",
    icon: Crown,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 hover:bg-amber-500/18 border-amber-500/25 hover:border-amber-500/40",
    badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    desc: "Full system access",
  },
  {
    role: "Manager",
    email: "manager1@example.com",
    password: "manager-1",
    icon: Shield,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10 hover:bg-indigo-500/18 border-indigo-500/25 hover:border-indigo-500/40",
    badge: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400",
    desc: "Team management",
  },
  {
    role: "Member",
    email: "member1@example.com",
    password: "member-1",
    icon: UserCheck,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 hover:bg-emerald-500/18 border-emerald-500/25 hover:border-emerald-500/40",
    badge: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    desc: "Personal workspace",
  },
]

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [quickLoading, setQuickLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      await login(email, password)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = async (cred: (typeof QUICK_LOGIN)[0]) => {
    setError(null)
    setQuickLoading(cred.role)
    try {
      await login(cred.email, cred.password)
      router.push("/")
    } catch (err: any) {
      setError(err.message || "Quick login failed")
    } finally {
      setQuickLoading(null)
    }
  }

  return (
    <div className="w-full space-y-5">
      {/* Brand */}
      <div className="text-center mb-2">
        <div className="inline-flex items-center justify-center w-12 h-12 brand-gradient rounded-2xl shadow-lg mb-4">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground mt-1">Sign in to your IntelliTask workspace</p>
      </div>

      {/* Quick login — demo roles */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2.5 text-center uppercase tracking-wider">
          Quick demo login
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {QUICK_LOGIN.map((cred) => (
            <button
              key={cred.role}
              type="button"
              onClick={() => handleQuickLogin(cred)}
              disabled={!!quickLoading || isLoading}
              className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${cred.bg} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {quickLoading === cred.role ? (
                <Loader2 className={`w-5 h-5 animate-spin ${cred.color}`} />
              ) : (
                <cred.icon className={`w-5 h-5 ${cred.color}`} />
              )}
              <span className={`text-xs font-semibold ${cred.color}`}>{cred.role}</span>
              <span className="text-[10px] text-muted-foreground leading-tight text-center">{cred.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border/60" />
        <span className="text-xs text-muted-foreground">or sign in manually</span>
        <div className="flex-1 h-px bg-border/60" />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-destructive/8 border border-destructive/25 text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="text-xs">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium text-foreground">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null) }}
            className="h-10 bg-background/60 border-border/70 focus:border-primary/60 focus:bg-background text-sm transition-all"
            placeholder="you@company.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-medium text-foreground">
              Password
            </Label>
            <button type="button" className="text-xs text-primary hover:underline">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null) }}
              className="h-10 bg-background/60 border-border/70 focus:border-primary/60 focus:bg-background text-sm pr-10 transition-all"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-10 brand-gradient text-white hover:opacity-90 transition-opacity font-medium text-sm gap-2 shadow-sm"
          disabled={isLoading || !!quickLoading}
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</>
          ) : (
            <div className="text-black flex">Sign in <ArrowRight className="w-4 h-4 mt-1 text-black" /></div>
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        Don't have an account?{" "}
        <button
          onClick={onToggleMode}
          className="text-primary font-medium hover:underline"
        >
          Create one
        </button>
      </p>
    </div>
  )
}
