"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { useWorkspaces } from "@/hooks/use-workspaces"
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
} from "lucide-react"

export function ManagerDashboard() {
  const { user } = useAuth()
  const { currentWorkspace } = useWorkspaces()

  const teamStats = {
    teamMembers: 8,
    tasksCompleted: 34,
    tasksInProgress: 12,
    overdueTasks: 3,
    teamProductivity: 87,
    weeklyGoalProgress: 72,
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Good morning, {user?.name}</h1>
        <p className="text-green-100">Your team is making great progress. Here's today's overview.</p>
      </div>

      {/* Team Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{teamStats.teamMembers}</div>
            <p className="text-xs text-green-400">All active</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{teamStats.tasksCompleted}</div>
            <p className="text-xs text-green-400">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{teamStats.tasksInProgress}</div>
            <p className="text-xs text-blue-400">Active tasks</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{teamStats.overdueTasks}</div>
            <p className="text-xs text-red-400">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Progress & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Team Progress
            </CardTitle>
            <CardDescription className="text-slate-400">Weekly goals and productivity metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Weekly Goal</span>
                <span className="text-green-400">{teamStats.weeklyGoalProgress}%</span>
              </div>
              <Progress value={teamStats.weeklyGoalProgress} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Team Productivity</span>
                <span className="text-blue-400">{teamStats.teamProductivity}%</span>
              </div>
              <Progress value={teamStats.teamProductivity} className="h-2" />
            </div>

            <div className="flex items-center gap-2 text-sm text-green-400">
              <TrendingUp className="w-4 h-4" />
              +15% improvement this week
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-400">Manage your team and projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create New Task
            </Button>
            <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
            <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Team Analytics
            </Button>
            <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Review
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Team Activity & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Team Activity</CardTitle>
            <CardDescription className="text-slate-400">Recent updates from your team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs text-white">
                  SM
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Sarah completed "API Integration"</p>
                  <p className="text-xs text-slate-400">30 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white">
                  AB
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Alex started working on "Database Migration"</p>
                  <p className="text-xs text-slate-400">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xs text-white">
                  MJ
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">Mike commented on "UI Design Review"</p>
                  <p className="text-xs text-slate-400">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Deadlines</CardTitle>
            <CardDescription className="text-slate-400">Tasks requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Frontend Redesign</p>
                  <p className="text-xs text-slate-400">Assigned to Sarah M.</p>
                </div>
                <Badge variant="destructive" className="bg-red-600 text-white">
                  Due Today
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">API Documentation</p>
                  <p className="text-xs text-slate-400">Assigned to Alex B.</p>
                </div>
                <Badge variant="secondary" className="bg-orange-600 text-white">
                  Due Tomorrow
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Testing Phase</p>
                  <p className="text-xs text-slate-400">Assigned to Mike J.</p>
                </div>
                <Badge variant="secondary" className="bg-blue-600 text-white">
                  Due Friday
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
