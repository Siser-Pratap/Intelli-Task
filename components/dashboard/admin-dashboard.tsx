"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { useWorkspaces } from "@/hooks/use-workspaces"
import { ActivityFeed } from "@/components/collaboration/activity-feed"
import { UserPresence } from "@/components/collaboration/user-presence"
import { NotificationsPanel } from "@/components/collaboration/notifications-panel"
import { Users, Building2, Shield, Clock, CheckCircle } from "lucide-react"

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
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}</h1>
        <p className="text-blue-100">Here's what's happening with your organization today.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-xs text-green-400">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Workspaces</CardTitle>
            <Building2 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeWorkspaces}</div>
            <p className="text-xs text-green-400">+2 this week</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.completedTasks}</div>
            <p className="text-xs text-green-400">+23% this month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.pendingTasks}</div>
            <p className="text-xs text-orange-400">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ActivityFeed />
          <NotificationsPanel />
        </div>
        <div className="space-y-6">
          <UserPresence />

          {/* System Status */}
          {/* <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                System Health
              </CardTitle>
              <CardDescription className="text-slate-400">Overall system performance and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">System Performance</span>
                  <span className="text-green-400">{stats.systemHealth}%</span>
                </div>
                <Progress value={stats.systemHealth} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Storage Usage</span>
                  <span className="text-blue-400">{stats.storageUsed}%</span>
                </div>
                <Progress value={stats.storageUsed} className="h-2" />
              </div>

              <div className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle className="w-4 h-4" />
                All systems operational
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  )
}
