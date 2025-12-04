"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCollaboration } from "@/hooks/use-collaboration"
import {
  Bell,
  Check,
  CheckCheck,
  MoreHorizontal,
  AlertTriangle,
  MessageSquare,
  Calendar,
  Settings,
  User,
} from "lucide-react"

const notificationIcons = {
  mention: MessageSquare,
  assignment: User,
  deadline: Calendar,
  comment: MessageSquare,
  system: Settings,
}

const priorityColors = {
  low: "border-l-green-500",
  medium: "border-l-yellow-500",
  high: "border-l-red-500",
}

export function NotificationsPanel() {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useCollaboration()
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = notifications.filter((notif) => (filter === "unread" ? !notif.isRead : true))

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
              <Bell className="w-5 h-5 text-blue-400" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="bg-red-600 text-white">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-slate-400">Stay updated with team activities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              }
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => setFilter("unread")}
              className={
                filter === "unread"
                  ? "bg-blue-600 text-white"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              }
            >
              Unread
            </Button>
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={markAllNotificationsRead}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                <CheckCheck className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>{filter === "unread" ? "No unread notifications" : "No notifications"}</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type]

              return (
                <div
                  key={notification.id}
                  className={`border-l-4 ${priorityColors[notification.priority]} bg-slate-700/50 p-3 rounded-r-lg group hover:bg-slate-700 ${
                    !notification.isRead ? "bg-slate-700" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className="w-4 h-4 text-blue-400 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                          {!notification.isRead && <div className="w-2 h-2 bg-blue-400 rounded-full"></div>}
                        </div>
                        <p className="text-sm text-slate-300 mb-2">{notification.message}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">{formatTimeAgo(notification.timestamp)}</span>
                          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {!notification.isRead && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markNotificationRead(notification.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white p-1"
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white p-1"
                          >
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700">
                          {!notification.isRead && (
                            <DropdownMenuItem
                              onClick={() => markNotificationRead(notification.id)}
                              className="text-white hover:bg-slate-700"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Mark as read
                            </DropdownMenuItem>
                          )}
                          {notification.actionUrl && (
                            <DropdownMenuItem className="text-white hover:bg-slate-700">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              View details
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
