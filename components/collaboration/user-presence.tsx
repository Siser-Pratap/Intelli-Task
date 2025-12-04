"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCollaboration } from "@/hooks/use-collaboration"
import { useAuth } from "@/hooks/use-auth"
import { Users, Circle, MoreHorizontal, MessageCircle, UserPlus } from "lucide-react"

const statusColors = {
  online: "bg-green-400",
  away: "bg-yellow-400",
  busy: "bg-red-400",
  offline: "bg-slate-400",
}

const statusLabels = {
  online: "Online",
  away: "Away",
  busy: "Busy",
  offline: "Offline",
}

export function UserPresence() {
  const { userPresence, updateUserStatus } = useCollaboration()
  const { user } = useAuth()

  const formatLastSeen = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Active now"
    if (diffInMinutes < 60) return `Active ${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `Active ${Math.floor(diffInMinutes / 60)}h ago`
    return `Last seen ${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const onlineUsers = userPresence.filter((u) => u.status === "online")
  const otherUsers = userPresence.filter((u) => u.status !== "online")

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-green-400" />
          Team Presence
          <Badge variant="secondary" className="bg-green-600 text-white">
            {onlineUsers.length} online
          </Badge>
        </CardTitle>
        <CardDescription className="text-slate-400">See who's currently active</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Online Users */}
          {onlineUsers.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-green-400 mb-2">Online Now</h4>
              <div className="space-y-2">
                {onlineUsers.map((presence) => (
                  <div
                    key={presence.userId}
                    className="flex items-center justify-between group hover:bg-slate-700/50 p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {presence.userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[presence.status]} rounded-full border-2 border-slate-800`}
                        ></div>
                        {presence.isTyping && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{presence.userName}</span>
                          {presence.userId === user?.id && (
                            <Badge variant="outline" className="border-blue-600 text-blue-400 text-xs">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">{formatLastSeen(presence.lastSeen)}</span>
                          {presence.currentPage && (
                            <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                              {presence.currentPage}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem className="text-white hover:bg-slate-700">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-slate-700">
                          <UserPlus className="w-4 h-4 mr-2" />
                          View profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Users */}
          {otherUsers.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Others</h4>
              <div className="space-y-2">
                {otherUsers.map((presence) => (
                  <div
                    key={presence.userId}
                    className="flex items-center justify-between group hover:bg-slate-700/50 p-2 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-slate-600 text-white text-xs">
                            {presence.userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 ${statusColors[presence.status]} rounded-full border-2 border-slate-800`}
                        ></div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-300">{presence.userName}</span>
                          <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                            {statusLabels[presence.status]}
                          </Badge>
                        </div>
                        <span className="text-xs text-slate-400">{formatLastSeen(presence.lastSeen)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Controls for Current User */}
          {user && (
            <div className="pt-4 border-t border-slate-700">
              <h4 className="text-sm font-medium text-slate-400 mb-2">Your Status</h4>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateUserStatus("online")}
                  className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white bg-transparent"
                >
                  <Circle className="w-3 h-3 mr-1 fill-current" />
                  Online
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateUserStatus("away")}
                  className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 hover:text-white bg-transparent"
                >
                  <Circle className="w-3 h-3 mr-1 fill-current" />
                  Away
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateUserStatus("busy")}
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  <Circle className="w-3 h-3 mr-1 fill-current" />
                  Busy
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
