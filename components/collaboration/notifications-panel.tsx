"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCollaboration } from "@/hooks/use-collaboration"
import {
  Bell, Check, CheckCheck, AlertTriangle,
  MessageSquare, Calendar, Settings, User, ArrowRight,
} from "lucide-react"

const NOTIF_CONFIG = {
  mention:    { icon: MessageSquare, color: "text-violet-500",  bg: "bg-violet-500/10",  border: "border-l-violet-400" },
  assignment: { icon: User,          color: "text-indigo-500",  bg: "bg-indigo-500/10",  border: "border-l-indigo-400" },
  deadline:   { icon: Calendar,      color: "text-rose-500",    bg: "bg-rose-500/10",    border: "border-l-rose-400"   },
  comment:    { icon: MessageSquare, color: "text-blue-500",    bg: "bg-blue-500/10",    border: "border-l-blue-400"   },
  system:     { icon: Settings,      color: "text-amber-500",   bg: "bg-amber-500/10",   border: "border-l-amber-400"  },
}

function timeAgo(ts: string) {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 60000)
  if (diff < 1)    return "Just now"
  if (diff < 60)   return `${diff}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return `${Math.floor(diff / 1440)}d ago`
}

export function NotificationsPanel() {
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useCollaboration()
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const shown = notifications.filter((n) => filter === "unread" ? !n.isRead : true)

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {/* Filter pills */}
          <div className="flex items-center gap-1 glass-subtle rounded-lg p-0.5">
            {(["all", "unread"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-all capitalize ${
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={markAllNotificationsRead}
              className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
              title="Mark all read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-glass">
        {shown.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </p>
          </div>
        ) : (
          shown.map((n) => {
            const cfg = NOTIF_CONFIG[n.type] ?? NOTIF_CONFIG.system
            return (
              <div
                key={n.id}
                className={`flex items-start gap-3 p-3 rounded-xl border-l-[3px] ${cfg.border} ${
                  !n.isRead ? "bg-primary/4" : "bg-foreground/3"
                } hover:bg-foreground/6 transition-colors cursor-pointer group`}
              >
                <div className={`w-7 h-7 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <cfg.icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-semibold text-foreground">{n.title}</span>
                    {!n.isRead && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-muted-foreground/60">{timeAgo(n.timestamp)}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${cfg.bg} ${cfg.color}`}>
                      {n.type}
                    </span>
                  </div>
                </div>

                {!n.isRead && (
                  <button
                    onClick={(e) => { e.stopPropagation(); markNotificationRead(n.id) }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-foreground/8 text-muted-foreground hover:text-foreground shrink-0"
                    title="Mark as read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
