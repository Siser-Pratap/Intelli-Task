"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { useAuth } from "@/hooks/use-auth"
import { Zap, BrainCircuit, LayoutGrid, Sparkles, BarChart3, Users } from "lucide-react"

const FEATURES = [
  { icon: BrainCircuit, label: "AI-powered task routing" },
  { icon: LayoutGrid, label: "Kanban, List & Timeline views" },
  { icon: Sparkles, label: "Smart insights & anomaly alerts" },
  { icon: BarChart3, label: "Role-scoped analytics" },
  { icon: Users, label: "Real-time team collaboration" },
]

export default function LoginPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // If already logged in, go straight to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  if (user) return null

  return (
    <div className="min-h-screen bg-background flex">
      {/* ── Left panel: branding ── */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden brand-gradient flex-col justify-between p-12">
        {/* Mesh glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="w-9 h-9 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center border border-white/30">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">IntelliTask</span>
        </div>

        {/* Hero copy */}
        <div className="relative space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-white/80 text-xs font-medium backdrop-blur">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Native Project Management
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Your team's<br />AI command<br />centre
            </h2>
            <p className="text-white/70 text-base max-w-sm leading-relaxed">
              IntelliTask combines the power of AI with the simplicity of Jira, Monday, and Trello — built for high-performance Indian teams.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {FEATURES.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                  <f.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white/80 text-sm">{f.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer note */}
        <p className="relative text-white/40 text-xs">
          © 2026 IntelliTask. Built with AI for modern teams.
        </p>
      </div>

      {/* ── Right panel: login form ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 brand-gradient rounded-xl flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">IntelliTask</span>
          </div>

          {/* Glass card */}
          <div className="glass-card p-7 shadow-xl">
            <LoginForm onToggleMode={() => router.push("/signup")} />
          </div>

          {/* Credentials hint */}
          <div className="mt-5 glass-card p-4">
            <p className="text-xs font-semibold text-foreground mb-2.5">Demo credentials</p>
            <div className="space-y-1.5">
              {[
                { role: "Admin", email: "admin1@example.com", pass: "admin-1" },
                { role: "Manager", email: "manager1@example.com", pass: "manager-1" },
                { role: "Member", email: "member1@example.com", pass: "member-1" },
              ].map((c) => (
                <div key={c.role} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-14 shrink-0">{c.role}</span>
                  <code className="flex-1 text-foreground font-mono bg-muted/50 px-2 py-0.5 rounded text-[11px] truncate">
                    {c.email}
                  </code>
                  <code className="text-muted-foreground font-mono text-[11px]">{c.pass}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
