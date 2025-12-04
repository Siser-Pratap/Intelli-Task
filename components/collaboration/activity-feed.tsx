"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCollaboration } from "@/hooks/use-collaboration"
import { CheckCircle, MessageSquare, Plus, Upload, UserPlus, Edit, Clock } from "lucide-react"

const activityIcons = {
  task_created: Plus,
  task_updated: Edit,
  task_completed: CheckCircle,
  comment_added: MessageSquare,
  user_joined: UserPlus,
  file_uploaded: Upload,
}

const activityColors = {
  task_created: "text-blue-400",
  task_updated: "text-yellow-400",
  task_completed: "text-green-400",
  comment_added: "text-purple-400",
  user_joined: "text-cyan-400",
  file_uploaded: "text-orange-400",
}

export function ActivityFeed() {
  const { activities, isConnected } = useCollaboration()

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-slate-400">Live updates from your team</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"}`}></div>
            <span className="text-xs text-slate-400">{isConnected ? "Live" : "Offline"}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            activities.map((activity) => {
              const Icon = activityIcons[activity.type]
              const iconColor = activityColors[activity.type]

              return (
                <div key={activity.id} className="flex items-start gap-3 group hover:bg-slate-700/50 p-2 rounded-lg">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-slate-600 text-white text-xs">{activity.userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                      <span className="font-medium text-white text-sm">{activity.userName}</span>
                      <span className="text-xs text-slate-400">{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                    <p className="text-sm text-slate-300">{activity.description}</p>
                    {activity.entityType && (
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs mt-1">
                        {activity.entityType}
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
