"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AreaChart, Area, BarChart, Bar, RadarChart, PolarGrid,
  PolarAngleAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts"
import { dummyProductivityTrend, dummyTasks } from "@/lib/dummy-data"
import { useAuth } from "@/hooks/use-auth"
import {
  CheckCircle, Clock, Target, Star, TrendingUp,
  Sparkles, Flame, Zap, AlertTriangle, Calendar, ArrowUpRight,
} from "lucide-react"

const SKILL_RADAR = [
  { skill: "Frontend", score: 85 },
  { skill: "Backend", score: 72 },
  { skill: "Testing", score: 60 },
  { skill: "Design", score: 45 },
  { skill: "DevOps", score: 38 },
  { skill: "Docs", score: 78 },
]

const WEEKLY_TASKS = [
  { day: "Mon", completed: 2, target: 2 },
  { day: "Tue", completed: 3, target: 2 },
  { day: "Wed", completed: 1, target: 2 },
  { day: "Thu", completed: 2, target: 2 },
  { day: "Fri", completed: 4, target: 3 },
  { day: "Sat", completed: 0, target: 0 },
  { day: "Sun", completed: 0, target: 0 },
]

const CUSTOM_TOOLTIP = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-3 py-2 text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-medium text-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export function MemberAnalytics() {
  const { user } = useAuth()

  const stats = {
    completed: 12,
    inProgress: 4,
    totalAssigned: 16,
    weeklyGoal: 75,
    productivityScore: 88,
    streakDays: 5,
    teamRank: 2,
    teamSize: 8,
    avgCompletionDays: 2.1,
    teamAvgDays: 2.6,
  }

  const kpis = [
    { label: "Completed", value: stats.completed, change: "This week", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "In Progress", value: stats.inProgress, change: "Active now", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Weekly Goal", value: `${stats.weeklyGoal}%`, change: "On track", icon: Target, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "Productivity", value: `${stats.productivityScore}%`, change: "+12% vs avg", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Team Rank", value: `#${stats.teamRank}`, change: `of ${stats.teamSize}`, icon: Star, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Streak", value: `${stats.streakDays}d`, change: "Personal best!", icon: Flame, color: "text-rose-500", bg: "bg-rose-500/10" },
  ]

  const aiInsights = [
    { type: "success", icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "insight-success", title: "You're in the top 25%", body: "Your productivity score of 88% puts you in the top 25% of the team. You complete tasks 19% faster than the team average." },
    { type: "info", icon: Sparkles, color: "text-indigo-600 dark:text-indigo-400", bg: "insight-info", title: "Best focus window: 9–11 AM IST", body: "AI detected you complete 3× more tasks before noon. Block this time for deep work on high-priority tasks." },
    { type: "warning", icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bg: "insight-warning", title: "Urgent task needs attention", body: "'JWT Authentication' is due in 3 days and unstarted. AI estimates 16h effort — start today to stay on track." },
    { type: "info", icon: Zap, color: "text-violet-600 dark:text-violet-400", bg: "insight-info", title: "Growing backend skill", body: "You've completed 4 backend tasks this sprint. AI suggests exploring API design tasks to deepen expertise." },
  ]

  const myTasks = dummyTasks.filter((t) => t.status !== "done").slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
        style={{ background: "linear-gradient(135deg, oklch(0.55 0.20 290), oklch(0.52 0.22 264))" }}
      >
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "radial-gradient(circle at 85% 30%, white 0%, transparent 55%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">My Analytics</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Personal Performance</h1>
            <p className="text-white/75 text-sm">
              You're ranked <strong>#{stats.teamRank}</strong> on the team with a <strong>{stats.productivityScore}%</strong> productivity score.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="glass-subtle rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{stats.streakDays}d</div>
              <div className="text-xs text-white/70">🔥 Streak</div>
            </div>
            <div className="glass-subtle rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">#{stats.teamRank}</div>
              <div className="text-xs text-white/70">Team rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass-card p-4 hover-glow">
            <div className={`w-8 h-8 rounded-xl ${kpi.bg} flex items-center justify-center mb-2`}>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <div className="text-xl font-bold text-foreground">{kpi.value}</div>
            <div className="text-[10px] text-muted-foreground">{kpi.label}</div>
            <div className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <ArrowUpRight className="w-3 h-3" /> {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productivity Trend */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">My Productivity Trend</h3>
              <p className="text-xs text-muted-foreground">Tasks completed — last 7 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dummyProductivityTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="memberGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 264 / 0.3)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Area type="monotone" dataKey="completed" name="Completed" stroke="#8b5cf6" fill="url(#memberGrad)" strokeWidth={2} dot={{ r: 3, fill: "#8b5cf6" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Radar */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Skill Profile</h3>
          <p className="text-xs text-muted-foreground mb-3">Based on task completion history</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={SKILL_RADAR}>
              <PolarGrid stroke="oklch(0.85 0.01 264 / 0.4)" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: "oklch(0.5 0.03 264)" }} />
              <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Activity + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly task bar */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">This Week's Activity</h3>
          <p className="text-xs text-muted-foreground mb-4">Completed vs target — by day</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={WEEKLY_TASKS} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 264 / 0.3)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Bar dataKey="target" name="Target" fill="#6366f1" radius={[3, 3, 0, 0]} opacity={0.25} />
              <Bar dataKey="completed" name="Completed" fill="#6366f1" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          {/* Comparison to team */}
          <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-3">
            <div className="text-center p-2.5 rounded-xl bg-indigo-500/8 border border-indigo-500/15">
              <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{stats.avgCompletionDays}d</div>
              <div className="text-[10px] text-muted-foreground">My avg completion</div>
            </div>
            <div className="text-center p-2.5 rounded-xl bg-muted/40 border border-border/50">
              <div className="text-lg font-bold text-muted-foreground">{stats.teamAvgDays}d</div>
              <div className="text-[10px] text-muted-foreground">Team average</div>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">My Upcoming Tasks</h3>
          <div className="space-y-3">
            {myTasks.map((task) => (
              <div key={task.id} className="p-3 rounded-xl border border-border/50 bg-background/30">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-xs font-medium text-foreground truncate">{task.title}</p>
                  <Badge className={`text-[10px] h-4 px-1.5 shrink-0 ${
                    task.priority === "urgent" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" :
                    task.priority === "high" ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" :
                    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                  }`}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={task.progress} className="h-1.5 flex-1" />
                  <span className="text-[10px] text-muted-foreground w-8 text-right">{task.progress}%</span>
                </div>
                {task.dueDate && (
                  <div className="flex items-center gap-1 mt-1.5">
                    <Calendar className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">Due {task.dueDate}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Personal Coach */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">AI Personal Coach</h3>
            <p className="text-xs text-muted-foreground">Insights scoped to your work and goals</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl ${insight.bg}`}>
              <insight.icon className={`w-4 h-4 mt-0.5 shrink-0 ${insight.color}`} />
              <div>
                <p className={`text-xs font-semibold mb-1 ${insight.color}`}>{insight.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
