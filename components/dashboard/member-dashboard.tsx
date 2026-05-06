"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { TaskModal } from "@/components/tasks/task-modal"
import { TaskDetailModal } from "@/components/tasks/task-detail-modal"
import { dummyTasks, DUMMY_DATA } from "@/lib/dummy-data"
import type { Task } from "@/hooks/use-tasks"
import {
  CheckCircle,
  Clock,
  Calendar,
  Target,
  Star,
  MessageSquare,
  Plus,
  Sparkles,
  TrendingUp,
  Flame,
  ArrowRight,
  Zap,
} from "lucide-react"

type ViewType = "dashboard" | "tasks" | "analytics" | "kanban" | "ai-insights"

interface MemberDashboardProps {
  onViewChange: (view: ViewType) => void
}

export function MemberDashboard({ onViewChange }: MemberDashboardProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const myStats = {
    tasksCompleted: 12,
    tasksInProgress: 4,
    tasksAssigned: 16,
    weeklyProgress: 75,
    productivityScore: 88,
    streakDays: 5,
    avgCompletionTime: "2.1 days",
  }

  const myActiveTasks = DUMMY_DATA
    ? dummyTasks.filter((t) => t.status === "in-progress" || t.status === "todo").slice(0, 4)
    : ([] as typeof dummyTasks)

  const aiInsights = [
    {
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "insight-info",
      icon: Sparkles,
      text: "Your productivity score of 88% is 12% above the team average. Keep it up!",
    },
    {
      color: "text-amber-600 dark:text-amber-400",
      bg: "insight-warning",
      icon: Clock,
      text: "'JWT Authentication' is marked urgent and due in 3 days — AI suggests starting today.",
    },
    {
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "insight-success",
      icon: TrendingUp,
      text: "You completed 5 tasks this week — that's your personal best! You're on a 5-day streak.",
    },
  ]

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case "urgent": return "priority-urgent"
      case "high": return "priority-high"
      case "medium": return "priority-medium"
      default: return "priority-low"
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "in-progress": return "status-in-progress"
      case "stuck": return "status-stuck"
      case "done": return "status-done"
      default: return "status-todo"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg"
        style={{ background: "linear-gradient(135deg, oklch(0.55 0.20 290), oklch(0.52 0.22 264))" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 90% 30%, white 0%, transparent 55%)" }}
        />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-medium text-white/70">
                {myStats.streakDays}-day streak 🔥
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-1">Hello, {user?.name?.split(" ")[0]}</h1>
            <p className="text-white/75 text-sm">
              You have <strong>{myStats.tasksInProgress}</strong> tasks in progress and <strong>{myStats.tasksCompleted}</strong> completed this week.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="glass-subtle rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{myStats.productivityScore}%</div>
              <div className="text-xs text-white/70">Productivity</div>
            </div>
            <div className="glass-subtle rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{myStats.weeklyProgress}%</div>
              <div className="text-xs text-white/70">Weekly goal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Completed", value: myStats.tasksCompleted, change: "This week", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", positive: true },
          { label: "In Progress", value: myStats.tasksInProgress, change: "Active now", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", positive: true },
          { label: "Total Assigned", value: myStats.tasksAssigned, change: "All time", icon: Target, color: "text-violet-500", bg: "bg-violet-500/10", positive: true },
          { label: "Weekly Goal", value: `${myStats.weeklyProgress}%`, change: "On track", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10", positive: true },
        ].map((card) => (
          <div key={card.label} className="glass-card p-4 hover-glow">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-4.5 h-4.5 ${card.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mb-0.5">{card.value}</div>
            <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
            <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{card.change}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tasks + AI */}
        <div className="lg:col-span-2 space-y-5">
          {/* AI Personal Insights */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 brand-gradient rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Your AI Coach</h3>
                <p className="text-xs text-muted-foreground">Personalised productivity insights</p>
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

          {/* My Active Tasks */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">My Active Tasks</h3>
              <Button variant="ghost" size="sm" onClick={() => onViewChange("tasks")} className="h-7 text-xs text-primary hover:bg-primary/8 gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-3">
              {myActiveTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => { setSelectedTask(task as Task); setShowDetailModal(true) }}
                  className="p-3 rounded-xl border border-border/50 bg-background/30 hover:bg-background/60 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${getPriorityDot(task.priority)}`} />
                      <p className="text-xs font-medium text-foreground truncate">{task.title}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${getStatusClass(task.status)}`}>
                      {task.status === "in-progress" ? "In Progress" : task.status === "todo" ? "To Do" : task.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 flex-1">
                      <Progress value={task.progress} className="h-1.5 flex-1" />
                      <span className="text-[10px] text-muted-foreground w-8 text-right">{task.progress}%</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
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

        {/* Right Column */}
        <div className="space-y-5">
          {/* Weekly Progress */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-violet-500" />
              <h3 className="text-sm font-semibold text-foreground">My Progress</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Weekly Goal</span>
                  <span className="text-violet-600 dark:text-violet-400 font-medium">{myStats.weeklyProgress}%</span>
                </div>
                <Progress value={myStats.weeklyProgress} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Productivity Score</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">{myStats.productivityScore}%</span>
                </div>
                <Progress value={myStats.productivityScore} className="h-2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border/50">
              <div className="text-center p-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{myStats.tasksCompleted}</div>
                <div className="text-[10px] text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-2.5 rounded-xl bg-blue-500/8 border border-blue-500/15">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{myStats.tasksInProgress}</div>
                <div className="text-[10px] text-muted-foreground">In Progress</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-muted-foreground"><strong className="text-foreground">{myStats.streakDays}-day</strong> productivity streak</span>
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
                { icon: Plus, label: "Create Personal Task", color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20", onClick: () => setShowTaskModal(true) },
                { icon: CheckCircle, label: "View My Tasks", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20", onClick: () => onViewChange("tasks") },
                { icon: MessageSquare, label: "View Analytics", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400 hover:bg-violet-500/20", onClick: () => onViewChange("analytics") },
                { icon: Calendar, label: "Check Schedule", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20", onClick: () => toast({ title: "Schedule", description: "You have 2 tasks due this week and 1 overdue. Check Tasks view for details." }) },
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
      <TaskDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        task={selectedTask}
        onEdit={(t) => { setSelectedTask(t); setShowDetailModal(false); setShowTaskModal(true) }}
      />
    </div>
  )
}
