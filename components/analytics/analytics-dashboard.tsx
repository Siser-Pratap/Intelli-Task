"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnalytics } from "@/hooks/use-analytics"
import { usePermissions } from "@/hooks/use-permissions"
import { MetricsOverview } from "./metrics-overview"
import { TaskDistributionChart } from "./task-distribution-chart"
import { ProductivityTrendChart } from "./productivity-trend-chart"
import { MemberPerformanceTable } from "./member-performance-table"
import { TimeTrackingCard } from "./time-tracking-card"
import { PriorityBreakdownChart } from "./priority-breakdown-chart"
import { BarChart3, RefreshCw, Download, Calendar, TrendingUp } from "lucide-react"

export function AnalyticsDashboard() {
  const { dateRange, setDateRange, refreshAnalytics, isLoading } = useAnalytics()
  const permissions = usePermissions()

  if (!permissions.canViewAnalytics) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Access Restricted</h3>
          <p className="text-slate-400">You don't have permission to view analytics.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Analytics Dashboard
            </h1>
            <p className="text-purple-100">Insights and performance metrics for your team</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={refreshAnalytics}
              disabled={isLoading}
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            {permissions.canExportData && (
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Overview */}
      <MetricsOverview />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskDistributionChart />
        <PriorityBreakdownChart />
      </div>

      {/* Productivity Trend */}
      <ProductivityTrendChart />

      {/* Performance and Time Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MemberPerformanceTable />
        </div>
        <TimeTrackingCard />
      </div>

      {/* Additional Insights */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Key Insights
          </CardTitle>
          <CardDescription className="text-slate-400">AI-powered recommendations for your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-green-400 mb-1">High Performance</h4>
                <p className="text-sm text-slate-300">
                  Your team's productivity has increased by 15% this month. Sarah Miller is leading with 98% efficiency.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-yellow-400 mb-1">Attention Needed</h4>
                <p className="text-sm text-slate-300">
                  3 tasks are overdue and 5 tasks are stuck. Consider redistributing workload or providing support.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-blue-400 mb-1">Optimization Opportunity</h4>
                <p className="text-sm text-slate-300">
                  Time estimates are 21% more efficient than actual time. Consider adjusting future estimates.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
