"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAnalytics } from "@/hooks/use-analytics"
import { Users, Trophy } from "lucide-react"

export function MemberPerformanceTable() {
  const { memberPerformance, isLoading } = useAnalytics()

  if (isLoading) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-4 p-3">
                <div className="w-10 h-10 bg-slate-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-slate-700 rounded mb-2"></div>
                  <div className="h-3 bg-slate-700 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const getPerformanceColor = (productivity: number) => {
    if (productivity >= 90) return "text-green-400"
    if (productivity >= 75) return "text-yellow-400"
    return "text-red-400"
  }

  const getPerformanceBadge = (productivity: number) => {
    if (productivity >= 90) return { label: "Excellent", color: "bg-green-600" }
    if (productivity >= 75) return { label: "Good", color: "bg-yellow-600" }
    return { label: "Needs Improvement", color: "bg-red-600" }
  }

  const sortedPerformance = [...memberPerformance].sort((a, b) => b.productivity - a.productivity)

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          Team Performance
        </CardTitle>
        <CardDescription className="text-slate-400">Individual member productivity and metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedPerformance.map((member, index) => {
            const badge = getPerformanceBadge(member.productivity)
            return (
              <div key={member.userId} className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {index === 0 && <Trophy className="w-4 h-4 text-yellow-400" />}
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">{member.userInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">{member.userName}</h4>
                    <Badge className={`${badge.color} text-white text-xs`}>{badge.label}</Badge>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-slate-400">Completed</div>
                    <div className="text-lg font-semibold text-white">{member.tasksCompleted}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-400">In Progress</div>
                    <div className="text-lg font-semibold text-blue-400">{member.tasksInProgress}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-400">Avg. Time</div>
                    <div className="text-lg font-semibold text-yellow-400">{member.averageCompletionTime}d</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-400">Productivity</div>
                    <div className={`text-lg font-semibold ${getPerformanceColor(member.productivity)}`}>
                      {member.productivity}%
                    </div>
                  </div>
                </div>

                <div className="w-24">
                  <Progress value={member.productivity} className="h-2" />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
