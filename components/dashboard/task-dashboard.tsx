"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { AdminDashboard } from "./admin-dashboard"
import { ManagerDashboard } from "./manager-dashboard"
import { MemberDashboard } from "./member-dashboard"
import { TaskTable } from "./task-table"
import { KanbanBoard } from "./kanban-board"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { AdminAnalytics } from "@/components/analytics/admin-analytics"
import { ManagerAnalytics } from "@/components/analytics/manager-analytics"
import { MemberAnalytics } from "@/components/analytics/member-analytics"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "next-themes"
import { Sparkles, BrainCircuit, User, Bell, Palette, Shield, LogOut, Sun, Moon } from "lucide-react"

type ViewType = "dashboard" | "tasks" | "analytics" | "kanban" | "ai-insights" | "settings"

export function TaskDashboard() {
  const [selectedWorkspace, setSelectedWorkspace] = useState("ws1")
  const [currentView, setCurrentView] = useState<ViewType>("dashboard")
  const { user } = useAuth()

  const renderContent = () => {
    switch (currentView) {
      case "tasks":
        return <TaskTable />

      case "kanban":
        return <KanbanBoard />

      case "analytics":
        switch (user?.role) {
          case "admin": return <AdminAnalytics />
          case "manager": return <ManagerAnalytics />
          case "member": return <MemberAnalytics />
          default: return <AnalyticsDashboard />
        }

      case "ai-insights":
        return <AIInsightsView role={user?.role} />

      case "settings":
        return <SettingsView />

      default:
        switch (user?.role) {
          case "admin": return <AdminDashboard />
          case "manager": return <ManagerDashboard onViewChange={setCurrentView} />
          case "member": return <MemberDashboard onViewChange={setCurrentView} />
          default: return <MemberDashboard onViewChange={setCurrentView} />
        }
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        selectedWorkspace={selectedWorkspace}
        onWorkspaceChange={setSelectedWorkspace}
        onViewChange={setCurrentView}
        currentView={currentView}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-6 overflow-auto scrollbar-glass">{renderContent()}</main>
      </div>
    </div>
  )
}

function SettingsView() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "admin":   return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      case "manager": return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
      default:        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-base font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-semibold text-foreground">Profile</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 brand-gradient rounded-2xl flex items-center justify-center text-white font-bold text-base">
            {user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <span className={`inline-flex items-center mt-1.5 text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${getRoleColor(user?.role)}`}>
              {user?.role}
            </span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border/50 space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Company</span>
            <span className="text-foreground">{user?.company || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>User ID</span>
            <code className="text-foreground font-mono text-[11px]">{user?.id}</code>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-4 h-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-foreground">Appearance</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: "light", label: "Light", icon: Sun },
            { value: "dark",  label: "Dark",  icon: Moon },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                theme === opt.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-primary/40 hover:bg-foreground/5"
              }`}
            >
              <opt.icon className="w-4 h-4" />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications info */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          In-app notifications are active. Click the bell icon in the top bar to view and manage your notifications.
        </p>
      </div>

      {/* Security */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-foreground">Security</h3>
        </div>
        <div className="flex items-center justify-between py-2 text-xs">
          <span className="text-muted-foreground">Session</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-border/50 text-xs">
          <span className="text-muted-foreground">Auth mode</span>
          <span className="text-foreground font-medium">Demo / Local</span>
        </div>
        <button
          onClick={logout}
          className="mt-4 w-full flex items-center justify-center gap-2 h-9 text-xs font-medium rounded-xl border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out of IntelliTask
        </button>
      </div>
    </div>
  )
}

// Minimal AI Insights page — static showcase panel
function AIInsightsView({ role }: { role?: string }) {
  const insights = {
    admin: [
      { category: "Anomaly Detection", severity: "high", icon: "🔴", title: "Unusual inactivity detected", body: "5 tasks have had zero updates for 5+ days. Bot suggests escalation to managers: Sneha Iyer (DB Optimisation), Vikram Nair (JWT Auth)." },
      { category: "Capacity Planning", severity: "info", icon: "🔵", title: "Next sprint projection", body: "Based on current velocity (87%), the team can absorb ~14 additional story points next sprint without risk." },
      { category: "Retention Risk", severity: "warning", icon: "🟡", title: "Burnout signal", body: "Ananya Krishnan has completed 18 tasks in the last 2 weeks — AI flags potential overloading. Recommend 1-on-1 check-in." },
      { category: "Auto-Assignment", severity: "success", icon: "🟢", title: "AI task routing active", body: "IntelliTask auto-assigned 12 tasks this sprint based on skill vectors and historical performance." },
    ],
    manager: [
      { category: "Sprint Health", severity: "warning", icon: "🟡", title: "Sprint at 72% velocity", body: "AI predicts current sprint will end at 72% capacity. Recommend adding 2-3 low-priority tasks to the backlog now." },
      { category: "Bottleneck", severity: "high", icon: "🔴", title: "Dependency chain blocked", body: "'JWT Auth' blocks 3 downstream tasks. Unblocking this one task will unlock 15% of the sprint's work." },
      { category: "Team Mood", severity: "info", icon: "🔵", title: "Positive momentum detected", body: "Team activity increased 23% Mon–Wed. Engagement signals suggest high morale — good time for stretch goals." },
    ],
    member: [
      { category: "Focus Time", severity: "info", icon: "🔵", title: "Best focus window detected", body: "Your task completion rate is 3× higher between 9–11 AM IST. AI recommends scheduling deep work in this window." },
      { category: "Streak", severity: "success", icon: "🟢", title: "5-day productivity streak!", body: "You've completed at least 2 tasks every day this week — a personal best! Keep it going to earn the 'Consistent' badge." },
      { category: "Skill Growth", severity: "info", icon: "🔵", title: "Backend proficiency rising", body: "4 of your last 6 completed tasks were backend-tagged. AI notes growing expertise in Node.js and API design." },
    ],
  }

  const roleInsights = insights[role as keyof typeof insights] || insights.member

  const severityConfig: Record<string, string> = {
    high: "insight-danger",
    warning: "insight-warning",
    success: "insight-success",
    info: "insight-info",
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="glass-card p-5 flex items-center gap-4">
        <div className="w-12 h-12 brand-gradient rounded-2xl flex items-center justify-center shadow-md">
          <BrainCircuit className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">AI Insights Engine</h2>
          <p className="text-sm text-muted-foreground">
            Real-time analysis powered by IntelliTask AI — scoped to your <strong className="text-foreground capitalize">{role}</strong> role.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-3">
        {roleInsights.map((insight, i) => (
          <div key={i} className={`glass-card p-4 ${severityConfig[insight.severity] || "insight-info"}`}>
            <div className="flex items-start gap-3">
              <span className="text-lg leading-none mt-0.5">{insight.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-foreground">{insight.title}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{insight.category}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center pt-2">
        ✨ AI analysis refreshed every 30 minutes · Powered by IntelliTask AI
      </p>
    </div>
  )
}
