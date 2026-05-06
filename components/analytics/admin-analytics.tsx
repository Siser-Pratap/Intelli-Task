"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import {
  dummyMemberPerformance,
  dummyProductivityTrend,
  dummyTasks,
} from "@/lib/dummy-data"
import {
  BarChart3, Users, CheckCircle, AlertTriangle, TrendingUp,
  Sparkles, Download, RefreshCw, Building2, Zap, ArrowUpRight, ArrowDownRight,
} from "lucide-react"

const STATUS_DATA = [
  { name: "Done", value: 2, color: "#10b981" },
  { name: "In Progress", value: 3, color: "#6366f1" },
  { name: "To Do", value: 3, color: "#94a3b8" },
  { name: "Stuck", value: 2, color: "#f43f5e" },
]

const WORKSPACE_DATA = [
  { name: "Product Dev", tasks: 7, members: 8, completion: 68 },
  { name: "Design & UX", tasks: 3, members: 5, completion: 82 },
  { name: "Marketing", tasks: 2, members: 4, completion: 45 },
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

export function AdminAnalytics() {
  const total = dummyTasks.length
  const done = dummyTasks.filter((t) => t.status === "done").length
  const stuck = dummyTasks.filter((t) => t.status === "stuck").length
  const overdue = dummyTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
  ).length

  const kpis = [
    { label: "Total Users", value: 24, change: "+12%", up: true, icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Tasks Completed", value: done, change: "+23%", up: true, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Stuck Tasks", value: stuck, change: "-1", up: false, icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10" },
    { label: "Active Workspaces", value: 3, change: "+2 this week", up: true, icon: Building2, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "Avg Efficiency", value: "85%", change: "+5%", up: true, icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Overdue Tasks", value: overdue, change: "Needs action", up: false, icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10" },
  ]

  const aiInsights = [
    { type: "success", icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "insight-success", title: "Org output up 23% MoM", body: "Cross-team collaboration increased. Design→Engineering handoffs dropped from 4.2 days to 1.8 days avg." },
    { type: "warning", icon: AlertTriangle, color: "text-amber-600 dark:text-amber-400", bg: "insight-warning", title: "Marketing Sprint at risk", body: "Marketing workspace is at 45% completion with 8 days left. AI predicts only 55% sprint goal will be met." },
    { type: "danger", icon: AlertTriangle, color: "text-rose-600 dark:text-rose-400", bg: "insight-danger", title: "Workload concentration risk", body: "Ananya Krishnan handles 22% of all active tasks. Single point of failure detected — recommend redistribution." },
    { type: "info", icon: Sparkles, color: "text-indigo-600 dark:text-indigo-400", bg: "insight-info", title: "AI optimised 12 assignments", body: "IntelliTask's auto-assignment engine saved an estimated 4.5 hours of manager time this sprint." },
  ]

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl brand-gradient p-6 text-white shadow-lg">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: "radial-gradient(circle at 75% 50%, white 0%, transparent 60%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-white/70" />
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Admin · System Analytics</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Organisation Analytics</h1>
            <p className="text-white/75 text-sm">Full system view — all workspaces, all users, AI-powered insights.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs border-white/20 text-white hover:bg-white/10 bg-transparent gap-1.5">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs border-white/20 text-white hover:bg-white/10 bg-transparent gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export
            </Button>
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
            <div className={`text-[10px] font-medium flex items-center gap-0.5 mt-0.5 ${kpi.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productivity Trend */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Task Completion Trend</h3>
              <p className="text-xs text-muted-foreground">Organisation-wide — last 7 days</p>
            </div>
            <Badge className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20">7 day</Badge>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dummyProductivityTrend} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCreated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 264 / 0.3)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Area type="monotone" dataKey="completed" name="Completed" stroke="#6366f1" fill="url(#gradCompleted)" strokeWidth={2} dot={{ r: 3, fill: "#6366f1" }} />
              <Area type="monotone" dataKey="created" name="Created" stroke="#8b5cf6" fill="url(#gradCreated)" strokeWidth={2} dot={{ r: 3, fill: "#8b5cf6" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Task Status</h3>
          <p className="text-xs text-muted-foreground mb-4">Distribution across all workspaces</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={STATUS_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {STATUS_DATA.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CUSTOM_TOOLTIP />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {STATUS_DATA.map((item) => (
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

      {/* Charts Row 2 + AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workspace performance */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-1">Workspace Comparison</h3>
          <p className="text-xs text-muted-foreground mb-4">Completion rate by workspace</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={WORKSPACE_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.85 0.01 264 / 0.3)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "oklch(0.5 0.03 264)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Bar dataKey="completion" name="Completion %" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Member Performance Table */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Member Performance</h3>
            <Badge className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">All teams</Badge>
          </div>
          <div className="space-y-3">
            {dummyMemberPerformance.map((member, i) => (
              <div key={member.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-background/50 transition-all">
                <span className="text-[10px] text-muted-foreground w-4 text-right">{i + 1}</span>
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="text-xs font-semibold brand-gradient text-white">{member.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-foreground truncate">{member.name}</span>
                    <span className={`text-[10px] font-medium ml-2 shrink-0 ${member.trend.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {member.trend}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={member.efficiency} className="h-1.5 flex-1" />
                    <span className="text-[10px] text-muted-foreground shrink-0 w-8 text-right">{member.efficiency}%</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-foreground">{member.tasksCompleted}</div>
                  <div className="text-[10px] text-muted-foreground">done</div>
                </div>
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
            <h3 className="text-sm font-semibold text-foreground">AI System Insights</h3>
            <p className="text-xs text-muted-foreground">Org-wide analysis · Admin scope</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.map((insight, i) => (
            <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl ${insight.bg}`}>
              <div className="w-7 h-7 rounded-lg bg-background/50 flex items-center justify-center shrink-0 mt-0.5">
                <insight.icon className={`w-3.5 h-3.5 ${insight.color}`} />
              </div>
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
