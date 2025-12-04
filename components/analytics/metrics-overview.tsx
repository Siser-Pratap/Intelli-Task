"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAnalytics } from "@/hooks/use-analytics"
import { CheckCircle, Clock, AlertTriangle, Users, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react"

export function MetricsOverview() {
  const { teamMetrics, isLoading } = useAnalytics()

  const metrics = [
    {
      title: "Total Tasks",
      value: teamMetrics.totalTasks,
      change: "+12%",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-400",
    },
    {
      title: "Completed",
      value: teamMetrics.completedTasks,
      change: "+23%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      title: "In Progress",
      value: teamMetrics.inProgressTasks,
      change: "-5%",
      trend: "down",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      title: "Overdue",
      value: teamMetrics.overdueTasks,
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-400",
    },
    {
      title: "Active Members",
      value: teamMetrics.activeMembers,
      change: "+1",
      trend: "up",
      icon: Users,
      color: "text-purple-400",
    },
    {
      title: "Completion Rate",
      value: `${teamMetrics.taskCompletionRate}%`,
      change: "+8%",
      trend: "up",
      icon: Target,
      color: "text-green-400",
    },
    {
      title: "Avg. Completion",
      value: `${teamMetrics.averageCompletionTime}d`,
      change: "-0.3d",
      trend: "down",
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      title: "Team Productivity",
      value: `${teamMetrics.teamProductivity}%`,
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-400",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-8 bg-slate-700 rounded mb-2"></div>
                <div className="h-3 bg-slate-700 rounded w-16"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">{metric.title}</CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="flex items-center text-xs">
              {metric.trend === "up" ? (
                <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
              )}
              <span className={metric.trend === "up" ? "text-green-400" : "text-red-400"}>{metric.change}</span>
              <span className="text-slate-400 ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
