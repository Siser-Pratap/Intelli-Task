"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { TaskModal } from "@/components/tasks/task-modal"
import { dummyMemberPerformance, dummyTasks, DUMMY_DATA } from "@/lib/dummy-data"
import {
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Target,
  BarChart3,
  Plus,
  UserPlus,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react"

type ViewType = "dashboard" | "tasks" | "analytics" | "kanban" | "ai-insights"

interface ManagerDashboardProps {
  onViewChange: (view: ViewType) => void
}

export function ManagerDashboard({ onViewChange }: ManagerDashboardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [showTaskModal, setShowTaskModal] = useState(false)

  const teamStats = {
    teamMembers: 8,
    tasksCompleted: 34,
    tasksInProgress: 12,
    overdueTasks: 3,
    teamProductivity: 87,
    weeklyGoalProgress: 72,
    sprintDaysLeft: 8,
    aiSuggestions: 4,
  }

  const activeTasks = DUMMY_DATA
    ? dummyTasks.filter((t) => t.status === "in-progress" || t.status === "stuck").slice(0, 4)
    : ([] as typeof dummyTasks)

  const teamMembers = DUMMY_DATA ? dummyMemberPerformance : []

  const aiInsights = [
    {
      color: "text-amber-600 dark:text-amber-400",
      bg: "insight-warning",
      icon: AlertTriangle,
      text: "Sneha Iyer is blocked on 'DB Optimisation' — 3 days without progress. Consider unblocking or reassigning.",
    },
    {
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "insight-info",
      icon: Sparkles,
      text: "AI predicts the current sprint will complete at 72% capacity. Recommend adding 2 low-priority tasks.",
    },
    {
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "insight-success",
      icon: TrendingUp,
      text: "Team velocity is up 15% from last sprint. Ananya Krishnan leads with 96% efficiency score.",
    },
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case "in-progress": return "status-in-progress"
      case "stuck": return "status-stuck"
      case "done": return "status-done"
      default: return "status-todo"
    }
  }

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "urgent": return "priority-urgent"
      case "high": return "priority-high"
      case "medium": return "priority-medium"
      default: return "priority-low"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
        style={{ background: "linear-gradient(135deg, oklch(0.45 0.18 162), oklch(0.52 0.22 264))" }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 55%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-white/70" />
              <span className="text-xs font-medium text-white/70 uppercase tracking-wider">Team Manager</span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Good morning, {user?.name?.split(" ")[0]}</h1>
            <p className="text-white/75 text-sm">
              Sprint ends in <strong>{teamStats.sprintDaysLeft} days</strong>. Your team is at {teamStats.weeklyGoalProgress}% goal completion.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="glass-subtle rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{teamStats.tasksCompleted}</div>
              <div className="text-xs text-white/70">Done this sprint</div>
            </div>
            <div className="glass-subtle rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{teamStats.teamMembers}</div>
              <div className="text-xs text-white/70">Team members</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Team Members", value: teamStats.teamMembers, change: "All active", icon: Users, color: "text-indigo-500", bg: "bg-indigo-500/10", positive: true },
          { label: "Completed", value: teamStats.tasksCompleted, change: "This sprint", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", positive: true },
          { label: "In Progress", value: teamStats.tasksInProgress, change: "Active now", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", positive: true },
          { label: "Overdue", value: teamStats.overdueTasks, change: "Needs action", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10", positive: false },
        ].map((card) => (
          <div key={card.label} className="glass-card p-4 hover-glow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-0.5">{card.value}</div>
            <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
            <div className={`text-xs font-medium ${card.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
              {card.change}
            </div>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: AI Insights + Active Tasks */}
        <div className="lg:col-span-2 space-y-5">
          {/* AI Insights */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">AI Team Insights</h3>
                <p className="text-xs text-muted-foreground">Analysed from sprint data</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {aiInsights.map((insight, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${insight.bg}`}>
                  <insight.icon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${insight.color}`} />
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tasks */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Active Tasks</h3>
              <Button variant="ghost" size="sm" onClick={() => onViewChange("tasks")} className="h-7 text-xs text-primary hover:bg-primary/8 gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-3">
              {activeTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-xl border border-border/50 bg-background/30 hover:bg-background/60 transition-all">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${getPriorityDot(task.priority)}`} />
                      <p className="text-xs font-medium text-foreground truncate">{task.title}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${getStatusClass(task.status)}`}>
                      {task.status === "in-progress" ? "In Progress" : task.status === "stuck" ? "Stuck" : task.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 flex-1">
                      <Progress value={task.progress} className="h-1.5 flex-1" />
                      <span className="text-[10px] text-muted-foreground w-8 text-right">{task.progress}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-[9px] bg-indigo-500 text-white">{task.assigneeInitials}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] text-muted-foreground truncate max-w-[80px]">{task.assigneeName}</span>
                    </div>
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

        {/* Right: Team Performance + Quick Actions */}
        <div className="space-y-5">
          {/* Sprint Progress */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-semibold text-foreground">Sprint Progress</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Weekly Goal</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">{teamStats.weeklyGoalProgress}%</span>
                </div>
                <Progress value={teamStats.weeklyGoalProgress} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Team Productivity</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">{teamStats.teamProductivity}%</span>
                </div>
                <Progress value={teamStats.teamProductivity} className="h-2" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 pt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +15% improvement this week
              </div>
            </div>

            {/* Team members quick view */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-2">Team efficiency</p>
              <div className="space-y-2">
                {teamMembers.slice(0, 4).map((m) => (
                  <div key={m.id} className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-[9px] bg-violet-500 text-white">{m.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] text-muted-foreground flex-1 truncate">{m.name}</span>
                    <span className="text-[10px] font-medium text-foreground">{m.efficiency}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              {[
                { icon: Plus, label: "Create Task", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20", onClick: () => setShowTaskModal(true) },
                { icon: UserPlus, label: "Invite Member", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20", onClick: () => toast({ title: "Invite link copied!", description: "Share this link with your team member to join the workspace." }) },
                { icon: BarChart3, label: "View Analytics", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20", onClick: () => onViewChange("analytics") },
                { icon: Calendar, label: "Schedule Review", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20", onClick: () => toast({ title: "Sprint review scheduled", description: "Team review meeting set for end of sprint (in 8 days)." }) },
              ].map((action) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  onClick={action.onClick}
                  className={`w-full justify-start h-9 px-3 text-xs rounded-xl gap-2.5 border border-transparent hover:border-current/20 transition-all ${action.color}`}
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        task={null}
        mode="create"
      />
    </div>
  )
}
