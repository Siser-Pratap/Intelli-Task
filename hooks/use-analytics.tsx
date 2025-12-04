"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./use-auth"
import { useWorkspaces } from "./use-workspaces"
import { useTasks } from "./use-tasks"

export interface TeamMetrics {
  totalTasks: number
  completedTasks: number
  inProgressTasks: number
  overdueTasks: number
  averageCompletionTime: number
  teamProductivity: number
  taskCompletionRate: number
  activeMembers: number
}

export interface TaskDistribution {
  status: string
  count: number
  percentage: number
  color: string
}

export interface PriorityBreakdown {
  priority: string
  count: number
  percentage: number
  color: string
}

export interface ProductivityTrend {
  date: string
  completed: number
  created: number
  productivity: number
}

export interface MemberPerformance {
  userId: string
  userName: string
  userInitials: string
  tasksCompleted: number
  tasksInProgress: number
  averageCompletionTime: number
  productivity: number
}

export interface TimeTracking {
  totalEstimated: number
  totalActual: number
  efficiency: number
  overruns: number
  underruns: number
}

interface AnalyticsContextType {
  teamMetrics: TeamMetrics
  taskDistribution: TaskDistribution[]
  priorityBreakdown: PriorityBreakdown[]
  productivityTrend: ProductivityTrend[]
  memberPerformance: MemberPerformance[]
  timeTracking: TimeTracking
  isLoading: boolean
  dateRange: string
  setDateRange: (range: string) => void
  refreshAnalytics: () => Promise<void>
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { currentWorkspace } = useWorkspaces()
  const { tasks } = useTasks()
  const [isLoading, setIsLoading] = useState(true)
  const [dateRange, setDateRange] = useState("30d")

  const [teamMetrics, setTeamMetrics] = useState<TeamMetrics>({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
    averageCompletionTime: 0,
    teamProductivity: 0,
    taskCompletionRate: 0,
    activeMembers: 0,
  })

  const [taskDistribution, setTaskDistribution] = useState<TaskDistribution[]>([])
  const [priorityBreakdown, setPriorityBreakdown] = useState<PriorityBreakdown[]>([])
  const [productivityTrend, setProductivityTrend] = useState<ProductivityTrend[]>([])
  const [memberPerformance, setMemberPerformance] = useState<MemberPerformance[]>([])
  const [timeTracking, setTimeTracking] = useState<TimeTracking>({
    totalEstimated: 0,
    totalActual: 0,
    efficiency: 0,
    overruns: 0,
    underruns: 0,
  })

  useEffect(() => {
    if (user && currentWorkspace) {
      loadAnalytics()
    }
  }, [user, currentWorkspace, dateRange, tasks])

  const loadAnalytics = async () => {
    setIsLoading(true)

    // Mock analytics calculation - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Calculate team metrics
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((t) => t.status === "done").length
    const inProgressTasks = tasks.filter((t) => t.status === "in-progress").length
    const overdueTasks = tasks.filter((t) => {
      if (!t.dueDate) return false
      return new Date(t.dueDate) < new Date() && t.status !== "done"
    }).length

    const metrics: TeamMetrics = {
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      averageCompletionTime: 4.2,
      teamProductivity: Math.round((completedTasks / totalTasks) * 100) || 0,
      taskCompletionRate: Math.round((completedTasks / totalTasks) * 100) || 0,
      activeMembers: 8,
    }

    // Task distribution
    const distribution: TaskDistribution[] = [
      {
        status: "To Do",
        count: tasks.filter((t) => t.status === "todo").length,
        percentage: Math.round((tasks.filter((t) => t.status === "todo").length / totalTasks) * 100) || 0,
        color: "#64748b",
      },
      {
        status: "In Progress",
        count: inProgressTasks,
        percentage: Math.round((inProgressTasks / totalTasks) * 100) || 0,
        color: "#3b82f6",
      },
      {
        status: "Done",
        count: completedTasks,
        percentage: Math.round((completedTasks / totalTasks) * 100) || 0,
        color: "#10b981",
      },
      {
        status: "Stuck",
        count: tasks.filter((t) => t.status === "stuck").length,
        percentage: Math.round((tasks.filter((t) => t.status === "stuck").length / totalTasks) * 100) || 0,
        color: "#ef4444",
      },
    ]

    // Priority breakdown
    const priority: PriorityBreakdown[] = [
      {
        priority: "Low",
        count: tasks.filter((t) => t.priority === "low").length,
        percentage: Math.round((tasks.filter((t) => t.priority === "low").length / totalTasks) * 100) || 0,
        color: "#10b981",
      },
      {
        priority: "Medium",
        count: tasks.filter((t) => t.priority === "medium").length,
        percentage: Math.round((tasks.filter((t) => t.priority === "medium").length / totalTasks) * 100) || 0,
        color: "#f59e0b",
      },
      {
        priority: "High",
        count: tasks.filter((t) => t.priority === "high").length,
        percentage: Math.round((tasks.filter((t) => t.priority === "high").length / totalTasks) * 100) || 0,
        color: "#f97316",
      },
      {
        priority: "Urgent",
        count: tasks.filter((t) => t.priority === "urgent").length,
        percentage: Math.round((tasks.filter((t) => t.priority === "urgent").length / totalTasks) * 100) || 0,
        color: "#ef4444",
      },
    ]

    // Productivity trend (mock data)
    const trend: ProductivityTrend[] = [
      { date: "2024-04-01", completed: 12, created: 15, productivity: 80 },
      { date: "2024-04-02", completed: 8, created: 10, productivity: 80 },
      { date: "2024-04-03", completed: 15, created: 12, productivity: 125 },
      { date: "2024-04-04", completed: 10, created: 14, productivity: 71 },
      { date: "2024-04-05", completed: 18, created: 16, productivity: 113 },
      { date: "2024-04-06", completed: 14, created: 11, productivity: 127 },
      { date: "2024-04-07", completed: 16, created: 18, productivity: 89 },
    ]

    // Member performance (mock data)
    const performance: MemberPerformance[] = [
      {
        userId: "1",
        userName: "John Doe",
        userInitials: "JD",
        tasksCompleted: 24,
        tasksInProgress: 3,
        averageCompletionTime: 3.8,
        productivity: 92,
      },
      {
        userId: "2",
        userName: "Sarah Miller",
        userInitials: "SM",
        tasksCompleted: 31,
        tasksInProgress: 2,
        averageCompletionTime: 2.9,
        productivity: 98,
      },
      {
        userId: "3",
        userName: "Alex Brown",
        userInitials: "AB",
        tasksCompleted: 18,
        tasksInProgress: 5,
        averageCompletionTime: 4.2,
        productivity: 78,
      },
      {
        userId: "4",
        userName: "Mike Johnson",
        userInitials: "MJ",
        tasksCompleted: 22,
        tasksInProgress: 4,
        averageCompletionTime: 3.5,
        productivity: 85,
      },
    ]

    // Time tracking
    const tracking: TimeTracking = {
      totalEstimated: 240,
      totalActual: 198,
      efficiency: 121,
      overruns: 3,
      underruns: 8,
    }

    setTeamMetrics(metrics)
    setTaskDistribution(distribution)
    setPriorityBreakdown(priority)
    setProductivityTrend(trend)
    setMemberPerformance(performance)
    setTimeTracking(tracking)
    setIsLoading(false)
  }

  const refreshAnalytics = async () => {
    await loadAnalytics()
  }

  return (
    <AnalyticsContext.Provider
      value={{
        teamMetrics,
        taskDistribution,
        priorityBreakdown,
        productivityTrend,
        memberPerformance,
        timeTracking,
        isLoading,
        dateRange,
        setDateRange,
        refreshAnalytics,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
