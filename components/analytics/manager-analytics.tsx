"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts"
import { dummyMemberPerformance, dummyProductivityTrend, dummyTasks } from "@/lib/dummy-data"
import {
  Target, Users, CheckCircle, AlertTriangle, TrendingUp,
  Sparkles, Download, Clock, ArrowUpRight, ArrowDownRight, Zap, Activity,
} from "lucide-react"

const SPRINT_DATA = [
  { sprint: "S-1", planned: 20, completed: 18, velocity: 90 },
  { sprint: "S-2", planned: 22, completed: 19, velocity: 86 },
  { sprint: "S-3", planned: 18, completed: 15, velocity: 83 },
  { sprint: "S-4", planned: 25, completed: 20, velocity: 80 },
  { sprint: "S-5", planned: 24, completed: 21, velocity: 87 },
]

const WORKLOAD_DATA = dummyMemberPerformance.map((m) => ({
  name: m.name.split(" ")[0],
  tasks: m.tasksCompleted + m.tasksInProgress,
  completed: m.tasksCompleted,
}))

const PRIORITY_DATA = [
  { name: "Urgent", value: 1, color: "#f43f5e" },
  { name: "High", value: 3, color: "#f97316" },
  { name: "Medium", value: 3, color: "#f59e0b" },
  { name: "Low", value: 3, color: "#10b981" },
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

export function ManagerAnalytics() {
  const teamTasks = dummyTasks
  const inProgress = teamTasks.filter((t) => t.status === "in-progress").length
  const stuck = teamTasks.filter((t) => t.status === "stuck").length
  const done = teamTasks.filter((t) => t.status === "done").length
  const avgEfficiency = Math.round(dummyMemberPerformance.reduce((acc, m) => acc + m.efficiency, 0) / dummyMemberPerformance.length)

  const kpis = [
    { label: "Team Members", value: 8, change: "All active", up: true, icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Completed", value: done, change: "+15% vs last", up: true, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "In Progress", value: inProgress, change: "Active now", up: true, icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Blocked", value: stuck, change: "Needs action", up: false, icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Avg Efficiency", value: `${avgEfficiency}%`, change: "+8% vs last", up: true, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Sprint Velocity", value: "87%", change: "On target", up: true, icon: Target, color: "text-violet-500", bg: "bg-violet-500/10" },
  ]

  const aiInsights = [
    { type: "warning", icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bg: "insight-warning", title: "Sprint at 72% completion", body: "AI predicts sprint will end at 72% unless 3 tasks are prioritised. Suggest moving 'JWT Auth' to top of backlog." },
    { type: "success", icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "insight-success", title: "Team velocity improving", body: "Sprint-over-sprint velocity has grown 4 points. Ananya (+8%) and Rahul (+5%) are the key drivers." },
    { type: "danger", icon: AlertTriangle, color: "text-rose-600 dark:text-rose-400", bg: "insight-danger", title: "Dependency bottleneck", body: "'JWT Auth' blocks 3 downstream tasks worth 12 story points. Unblocking it unlocks 15% of sprint work." },
    { type: "info", icon: Sparkles, color: "text-indigo-600 dark:text-indigo-400", bg: "insight-info", title: "Workload redistribution suggested", body: "Sneha has 3 stuck tasks. AI recommends reassigning 'DB Optimisation' to Kavya Reddy (30% spare capacity)." },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
        style={{ background: "linear-gradient(135deg, oklch(0.45 0.18 162), oklch(0.52 0.22 264))" }}>
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "radial-gradient(circle at 75% 50%, white 0%, transparent 60%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-white/70" />
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Manager · Team Analytics</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Team Analytics</h1>
            <p className="text-white/75 text-sm">Sprint performance, workload balance, and predictive insights.</p>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs border-white/20 text-white hover:bg-white/10 bg-transparent gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
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
            <div className={`text-[10px] font-medium flex items-center gap-0.5 mt-0.5 ${kpi.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sprint Velocity Trend */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Sprint Velocity</h3>
              <p className="text-xs text-muted-foreground">Planned vs Completed — last 5 sprints</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SPRINT_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 264 / 0.3)" />
              <XAxis dataKey="sprint" tick={{ fontSize: 10, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="planned" name="Planned" fill="#6366f1" radius={[3, 3, 0, 0]} opacity={0.4} />
              <Bar dataKey="completed" name="Completed" fill="#6366f1" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Breakdown */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Priority Breakdown</h3>
          <p className="text-xs text-muted-foreground mb-4">Active tasks by urgency</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={PRIORITY_DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {PRIORITY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CUSTOM_TOOLTIP />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {PRIORITY_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workload + Member Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workload Bar */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Workload Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Tasks per member — active vs completed</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={WORKLOAD_DATA} layout="vertical" margin={{ top: 4, right: 4, bottom: 0, left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 264 / 0.3)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 9, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Bar dataKey="tasks" name="Total" fill="#6366f1" radius={[0, 3, 3, 0]} opacity={0.4} />
              <Bar dataKey="completed" name="Completed" fill="#6366f1" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Member Efficiency Table */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Team Efficiency</h3>
            <span className="text-xs text-muted-foreground">Avg: {avgEfficiency}%</span>
          </div>
          <div className="space-y-3">
            {dummyMemberPerformance.map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                <Avatar className="w-7 h-7 shrink-0">
                  <AvatarFallback className="text-xs brand-gradient text-white">{m.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-foreground font-medium truncate">{m.name.split(" ")[0]}</span>
                    <span className={`font-medium shrink-0 ml-1 ${m.trend.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>{m.trend}</span>
                  </div>
                  <Progress value={m.efficiency} className="h-1.5" />
                </div>
                <span className="text-xs font-bold text-foreground w-10 text-right shrink-0">{m.efficiency}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">AI Team Intelligence</h3>
            <p className="text-xs text-muted-foreground">Sprint predictions and workload optimisation</p>
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
