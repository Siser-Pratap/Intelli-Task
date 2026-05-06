"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useWorkspaces } from "@/hooks/use-workspaces"
import { ActivityFeed } from "@/components/collaboration/activity-feed"
import { UserPresence } from "@/components/collaboration/user-presence"
import { NotificationsPanel } from "@/components/collaboration/notifications-panel"
import { dummyMemberPerformance, dummyActivities, DUMMY_DATA } from "@/lib/dummy-data"
import {
  Users,
  Building2,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  Shield,
  Zap,
  BarChart3,
  ArrowUpRight,
  Activity,
} from "lucide-react"

export function AdminDashboard() {
  const { user } = useAuth()
  const { workspaces } = useWorkspaces()

  const stats = {
    totalUsers: 24,
    activeWorkspaces: workspaces.length,
    completedTasks: 156,
    pendingTasks: 43,
    systemHealth: 98,
    storageUsed: 65,
    aiTasksAutoAssigned: 12,
    sprintVelocity: 87,
  }

  const aiInsights = [
    {
      type: "success",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "insight-success",
      title: "Productivity spike detected",
      body: "Team output increased 23% this sprint. Ananya Krishnan and Rahul Mehta are exceeding targets.",
    },
    {
      type: "warning",
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
      bg: "insight-warning",
      title: "Workload imbalance",
      body: "Sneha Iyer has 3 stuck tasks. AI recommends redistributing to Kavya Reddy (30% spare capacity).",
    },
    {
      type: "info",
      icon: Sparkles,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "insight-info",
      title: "AI auto-assigned 12 tasks",
      body: "Based on skill profiles and past velocity, IntelliTask optimised task distribution this week.",
    },
    {
      type: "danger",
      icon: AlertTriangle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "insight-danger",
      title: "2 deadlines at risk",
      body: "'JWT Authentication' (due May 8) and 'DB Optimisation' (due May 6) are unlikely to complete on time.",
    },
  ]

  const metricCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      change: "+12%",
      positive: true,
      icon: Users,
      iconColor: "text-indigo-500",
      iconBg: "bg-indigo-500/10",
    },
    {
      label: "Active Workspaces",
      value: stats.activeWorkspaces,
      change: "+2 this week",
      positive: true,
      icon: Building2,
      iconColor: "text-violet-500",
      iconBg: "bg-violet-500/10",
    },
    {
      label: "Tasks Completed",
      value: stats.completedTasks,
      change: "+23% this month",
      positive: true,
      icon: CheckCircle,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-500/10",
    },
    {
      label: "Pending Tasks",
      value: stats.pendingTasks,
      change: "Needs attention",
      positive: false,
      icon: Clock,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-500/10",
    },
    {
      label: "AI Auto-Assigned",
      value: stats.aiTasksAutoAssigned,
      change: "This sprint",
      positive: true,
      icon: Sparkles,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-500/10",
    },
    {
      label: "Sprint Velocity",
      value: `${stats.sprintVelocity}%`,
      change: "+8% vs last",
      positive: true,
      icon: Zap,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-500/10",
    },
    {
      label: "System Health",
      value: `${stats.systemHealth}%`,
      change: "All systems go",
      positive: true,
      icon: Shield,
      iconColor: "text-teal-500",
      iconBg: "bg-teal-500/10",
    },
    {
      label: "Storage Used",
      value: `${stats.storageUsed}%`,
      change: "of 100 GB",
      positive: true,
      icon: BarChart3,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-500/10",
    },
  ]

  const topPerformers = DUMMY_DATA ? dummyMemberPerformance.slice(0, 3) : []

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl brand-gradient p-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)"
        }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Crown className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Admin Control Center</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Welcome back, {user?.name?.split(" ")[0]}</h1>
            <p className="text-white/75 text-sm">Here's your organisation's AI-powered overview for today.</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="glass-subtle rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{stats.completedTasks}</div>
              <div className="text-xs text-white/70">Tasks done</div>
            </div>
            <div className="glass-subtle rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="text-xs text-white/70">Team size</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricCards.map((metric) => (
          <div key={metric.label} className="glass-card p-4 hover-glow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${metric.iconBg} flex items-center justify-center`}>
                <metric.icon className={`w-4.5 h-4.5 ${metric.iconColor}`} />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-0.5">{metric.value}</div>
            <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
            <div className={`text-xs font-medium ${metric.positive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights + Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-2">
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">AI Insights</h3>
                <p className="text-xs text-muted-foreground">Real-time analysis of your organisation</p>
              </div>
              <Badge className="ml-auto text-[10px] h-5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">
                Live
              </Badge>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${insight.bg}`}>
                  <div className="w-7 h-7 rounded-lg bg-background/50 flex items-center justify-center shrink-0 mt-0.5">
                    <insight.icon className={`w-3.5 h-3.5 ${insight.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold mb-0.5 ${insight.color}`}>{insight.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{insight.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-semibold text-foreground">Top Performers</h3>
          </div>
          <div className="space-y-4">
            {topPerformers.map((member, i) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`text-xs font-semibold text-white ${
                      i === 0 ? "bg-amber-500" : i === 1 ? "bg-indigo-500" : "bg-violet-500"
                    }`}>
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {i === 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">1</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{member.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Progress value={member.efficiency} className="h-1.5 flex-1" />
                    <span className="text-[10px] text-muted-foreground w-8 text-right">{member.efficiency}%</span>
                  </div>
                </div>
                <Badge className="text-[10px] h-5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shrink-0">
                  {member.trend}
                </Badge>
              </div>
            ))}
          </div>

          {/* System Status mini */}
          <div className="mt-5 pt-4 border-t border-border/50 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">System Performance</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">{stats.systemHealth}%</span>
            </div>
            <Progress value={stats.systemHealth} className="h-1.5" />
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Storage</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">{stats.storageUsed}%</span>
            </div>
            <Progress value={stats.storageUsed} className="h-1.5" />
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-3.5 h-3.5" />
              All systems operational
            </div>
          </div>
        </div>
      </div>

      {/* Activity + Notifications + Presence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActivityFeed />
          <NotificationsPanel />
        </div>
        <div>
          <UserPresence />
        </div>
      </div>
    </div>
  )
}

// needed for the badge icon
function Crown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 20h20v2H2v-2zm2-3l3-9 5 6 3-4 4 7H4zm8-12a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  )
}
