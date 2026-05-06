"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCollaboration } from "@/hooks/use-collaboration"
import { useAuth } from "@/hooks/use-auth"
import { Users, MessageCircle, Circle } from "lucide-react"

const STATUS_CONFIG = {
  online:  { dot: "bg-emerald-500", label: "Online",  ring: "ring-emerald-500/30" },
  away:    { dot: "bg-amber-400",   label: "Away",    ring: "ring-amber-400/30"   },
  busy:    { dot: "bg-rose-500",    label: "Busy",    ring: "ring-rose-500/30"    },
  offline: { dot: "bg-slate-400",   label: "Offline", ring: "ring-slate-400/30"   },
}

const AVATAR_COLORS = [
  "bg-indigo-500", "bg-violet-500", "bg-emerald-500",
  "bg-amber-500",  "bg-blue-500",   "bg-rose-500",
]

function timeAgo(ts: string) {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 60000)
  if (diff < 1)    return "Active now"
  if (diff < 60)   return `${diff}m ago`
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
  return `${Math.floor(diff / 1440)}d ago`
}

export function UserPresence() {
  const { userPresence, updateUserStatus } = useCollaboration()
  const { user } = useAuth()

  const online  = userPresence.filter((u) => u.status === "online")
  const others  = userPresence.filter((u) => u.status !== "online")

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-foreground">Team Presence</h3>
        </div>
        <Badge className="text-[10px] h-5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
          {online.length} online
        </Badge>
      </div>

      <div className="space-y-4">
        {/* Online */}
        {online.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Online now</p>
            <div className="space-y-1.5">
              {online.map((p, i) => {
                const sc = STATUS_CONFIG[p.status]
                const isMe = p.userId === user?.id
                return (
                  <div
                    key={p.userId}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-foreground/4 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative shrink-0">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className={`text-[10px] font-semibold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}>
                            {p.userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${sc.dot} rounded-full border-2 border-background`} />
                        {p.isTyping && (
                          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-medium text-foreground truncate max-w-[90px]">{p.userName}</span>
                          {isMe && (
                            <span className="text-[9px] px-1 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">You</span>
                          )}
                        </div>
                        {p.currentPage && (
                          <span className="text-[10px] text-muted-foreground truncate max-w-[100px] block">{p.currentPage}</span>
                        )}
                      </div>
                    </div>
                    {!isMe && (
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-indigo-500/10 text-muted-foreground hover:text-indigo-500"
                        title="Message"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Away / Busy / Offline */}
        {others.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Others</p>
            <div className="space-y-1.5">
              {others.map((p, i) => {
                const sc = STATUS_CONFIG[p.status]
                return (
                  <div key={p.userId} className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-foreground/4 transition-colors">
                    <div className="relative shrink-0">
                      <Avatar className="w-7 h-7 opacity-70">
                        <AvatarFallback className={`text-[10px] font-semibold text-white ${AVATAR_COLORS[(online.length + i) % AVATAR_COLORS.length]}`}>
                          {p.userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${sc.dot} rounded-full border-2 border-background`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground truncate max-w-[90px]">{p.userName}</span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                          p.status === "away"    ? "bg-amber-500/10 text-amber-500" :
                          p.status === "busy"    ? "bg-rose-500/10 text-rose-500" :
                                                   "bg-muted text-muted-foreground"
                        }`}>
                          {sc.label}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground/60">{timeAgo(p.lastSeen)}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* My status controls */}
        {user && (
          <div className="pt-3 border-t border-border/50">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">My status</p>
            <div className="flex gap-1.5">
              {(["online", "away", "busy"] as const).map((s) => {
                const sc = STATUS_CONFIG[s]
                return (
                  <button
                    key={s}
                    onClick={() => updateUserStatus(s)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-medium border transition-all ${
                      s === "online" ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10" :
                      s === "away"   ? "border-amber-500/30  text-amber-600  dark:text-amber-400  hover:bg-amber-500/10"  :
                                       "border-rose-500/30   text-rose-600   dark:text-rose-400   hover:bg-rose-500/10"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    <span className="capitalize">{s}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
