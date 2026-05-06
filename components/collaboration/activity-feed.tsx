"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCollaboration } from "@/hooks/use-collaboration"
import {
  CheckCircle, MessageSquare, Plus, Upload,
  UserPlus, Edit, Clock, ArrowRight,
} from "lucide-react"

const ACTIVITY_CONFIG = {
  task_created:   { icon: Plus,         color: "text-indigo-500",  bg: "bg-indigo-500/10"  },
  task_updated:   { icon: Edit,         color: "text-amber-500",   bg: "bg-amber-500/10"   },
  task_completed: { icon: CheckCircle,  color: "text-emerald-500", bg: "bg-emerald-500/10" },
  comment_added:  { icon: MessageSquare,color: "text-violet-500",  bg: "bg-violet-500/10"  },
  user_joined:    { icon: UserPlus,     color: "text-blue-500",    bg: "bg-blue-500/10"    },
  file_uploaded:  { icon: Upload,       color: "text-rose-500",    bg: "bg-rose-500/10"    },
}

const AVATAR_COLORS = [
  "bg-indigo-500", "bg-violet-500", "bg-emerald-500",
  "bg-amber-500",  "bg-blue-500",   "bg-rose-500",
]

function timeAgo(ts: string) {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 60000)
  if (diff < 1)    return "Just now"
  if (diff < 60)   return `${diff}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return `${Math.floor(diff / 1440)}d ago`
}

export function ActivityFeed() {
  const { activities, isConnected } = useCollaboration()

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground"}`} />
            <span className="text-[10px] text-muted-foreground">{isConnected ? "Live" : "Offline"}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:bg-primary/8 gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-glass">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities.map((activity, i) => {
            const cfg = ACTIVITY_CONFIG[activity.type] ?? ACTIVITY_CONFIG.task_updated
            const avatarBg = AVATAR_COLORS[i % AVATAR_COLORS.length]
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-foreground/4 transition-colors cursor-pointer group"
              >
                {/* Avatar */}
                <Avatar className="w-7 h-7 shrink-0">
                  <AvatarFallback className={`text-[10px] font-semibold text-white ${avatarBg}`}>
                    {activity.userInitials}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-semibold text-foreground">{activity.userName}</span>
                    <div className={`w-5 h-5 rounded-md ${cfg.bg} flex items-center justify-center shrink-0`}>
                      <cfg.icon className={`w-2.5 h-2.5 ${cfg.color}`} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground/60">{timeAgo(activity.timestamp)}</span>
                    {activity.entityType && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground capitalize">
                        {activity.entityType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
