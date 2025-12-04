"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { CheckCircle, Clock, Calendar, Target, Star, MessageSquare, Plus } from "lucide-react"

export function MemberDashboard() {
  const { user } = useAuth()

  const myStats = {
    tasksCompleted: 12,
    tasksInProgress: 4,
    tasksAssigned: 16,
    weeklyProgress: 75,
  }

  const myTasks = [
    {
      id: "1",
      title: "Update user profile component",
      status: "in-progress",
      priority: "high",
      dueDate: "Today",
      progress: 60,
    },
    {
      id: "2",
      title: "Fix login validation bug",
      status: "todo",
      priority: "medium",
      dueDate: "Tomorrow",
      progress: 0,
    },
    {
      id: "3",
      title: "Write unit tests for API",
      status: "in-progress",
      priority: "low",
      dueDate: "Friday",
      progress: 30,
    },
  ]

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-green-500",
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Hello, {user?.name}</h1>
        <p className="text-purple-100">Ready to tackle your tasks? Here's what's on your plate today.</p>
      </div>

      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{myStats.tasksCompleted}</div>
            <p className="text-xs text-green-400">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{myStats.tasksInProgress}</div>
            <p className="text-xs text-blue-400">Active now</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Assigned</CardTitle>
            <Target className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{myStats.tasksAssigned}</div>
            <p className="text-xs text-slate-400">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Weekly Goal</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{myStats.weeklyProgress}%</div>
            <p className="text-xs text-green-400">On track</p>
          </CardContent>
        </Card>
      </div>

      {/* My Tasks & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-400" />
              My Progress
            </CardTitle>
            <CardDescription className="text-slate-400">Your weekly performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Weekly Goal Progress</span>
                <span className="text-purple-400">{myStats.weeklyProgress}%</span>
              </div>
              <Progress value={myStats.weeklyProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{myStats.tasksCompleted}</div>
                <div className="text-xs text-slate-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{myStats.tasksInProgress}</div>
                <div className="text-xs text-slate-400">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-400">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Personal Task
            </Button>
            <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Task Complete
            </Button>
            <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              View Comments
            </Button>
            <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Check Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* My Active Tasks */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">My Active Tasks</CardTitle>
          <CardDescription className="text-slate-400">Tasks currently assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myTasks.map((task) => (
              <div key={task.id} className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{task.title}</h3>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                    ></div>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {task.dueDate}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-slate-300">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-1" />
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Badge
                    variant="secondary"
                    className={
                      task.status === "in-progress"
                        ? "bg-blue-600 text-white"
                        : task.status === "todo"
                          ? "bg-slate-600 text-white"
                          : "bg-green-600 text-white"
                    }
                  >
                    {task.status === "in-progress" ? "In Progress" : task.status === "todo" ? "To Do" : "Done"}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
