"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWorkspaces } from "@/hooks/use-workspaces"
import { useCollaboration } from "@/hooks/use-collaboration"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { TaskModal } from "@/components/tasks/task-modal"
import {
  Search,
  Bell,
  Plus,
  Filter,
  LayoutGrid,
  List,
  LogOut,
  Settings,
  User,
  ChevronDown,
  Crown,
  Shield,
  UserCheck,
  CheckCheck,
} from "lucide-react"

type ViewType = "dashboard" | "tasks" | "analytics" | "kanban" | "ai-insights" | "settings"

interface TopBarProps {
  currentView?: ViewType
  onViewChange?: (view: ViewType) => void
}

export function TopBar({ currentView, onViewChange }: TopBarProps) {
  const { currentWorkspace } = useWorkspaces()
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useCollaboration()
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [showTaskModal, setShowTaskModal] = useState(false)

  const viewOptions = [
    { id: "tasks", label: "List", icon: List },
    { id: "kanban", label: "Kanban", icon: LayoutGrid },
  ] as const

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case "admin":   return <Crown className="w-3 h-3 text-amber-500" />
      case "manager": return <Shield className="w-3 h-3 text-indigo-500" />
      case "member":  return <UserCheck className="w-3 h-3 text-emerald-500" />
      default: return null
    }
  }

  const getRoleBg = (role?: string) => {
    switch (role) {
      case "admin":   return "bg-amber-500"
      case "manager": return "bg-indigo-500"
      case "member":  return "bg-emerald-500"
      default: return "brand-gradient"
    }
  }

  return (
    <>
    <div className="glass border-b border-border/50 px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        {/* Left: breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-sm font-semibold text-foreground truncate">
            {currentWorkspace?.name || "Workspace"}
          </h1>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-xs text-muted-foreground capitalize">
            {currentView === "ai-insights" ? "AI Insights" : currentView || "Dashboard"}
          </span>
        </div>

        {/* Center: view switcher on tasks/kanban */}
        {(currentView === "tasks" || currentView === "kanban") && (
          <div className="flex items-center gap-1 glass-subtle rounded-lg p-1 border border-border/40">
            {viewOptions.map((opt) => (
              <Button
                key={opt.id}
                variant="ghost"
                size="sm"
                onClick={() => onViewChange?.(opt.id)}
                className={`h-7 px-3 text-xs rounded-md transition-all gap-1.5 ${
                  currentView === opt.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <opt.icon className="w-3.5 h-3.5" />
                {opt.label}
              </Button>
            ))}
          </div>
        )}

        {/* Right: search + actions + user */}
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
            <Input
              placeholder="Search tasks..."
              className="pl-9 w-48 h-8 text-xs bg-background/50 border-border/60 focus:border-primary/50 rounded-lg"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/6">
                  <Bell className="w-4 h-4" />
                </Button>
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center pointer-events-none">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 glass border-border/60 shadow-lg" align="end">
              <div className="px-3 py-2.5 border-b border-border/50 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Notifications</p>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="py-1 max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-6">No notifications</p>
                ) : (
                  notifications.slice(0, 6).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`px-3 py-2.5 cursor-pointer hover:bg-foreground/5 transition-colors ${!n.isRead ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex items-start gap-2.5">
                        {!n.isRead && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />}
                        <div className={!n.isRead ? "" : "ml-4"}>
                          <p className="text-xs font-medium text-foreground">{n.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="w-px h-4 bg-border/60" />

          <Button
            size="sm"
            onClick={() => setShowTaskModal(true)}
            className="h-8 px-3 text-xs brand-gradient text-white hover:opacity-90 rounded-lg shadow-sm gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            New task
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toast({ title: "Filters available in Tasks view", description: "Switch to Tasks view to filter by status, priority, or assignee." })}
            className="h-8 px-3 text-xs border-border/60 text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-lg gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            Filter
          </Button>

          <div className="w-px h-4 bg-border/60" />

          {/* User dropdown with logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 pl-1.5 pr-2 rounded-lg hover:bg-foreground/6 gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className={`text-[10px] font-bold text-white ${getRoleBg(user?.role)}`}>
                    {user?.name ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-foreground hidden md:block max-w-[80px] truncate">
                  {user?.name?.split(" ")[0]}
                </span>
                {getRoleIcon(user?.role)}
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 glass border-border/60 shadow-lg" align="end">
              <div className="px-3 py-2.5 border-b border-border/50">
                <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getRoleIcon(user?.role)}
                  <span className="text-[10px] capitalize text-muted-foreground">{user?.role}</span>
                </div>
              </div>
              <div className="py-1">
                <DropdownMenuItem
                  onClick={() => onViewChange?.("settings")}
                  className="text-foreground hover:bg-primary/8 cursor-pointer rounded-md mx-1 gap-2"
                >
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onViewChange?.("settings")}
                  className="text-foreground hover:bg-primary/8 cursor-pointer rounded-md mx-1 gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-muted-foreground" />
                  Settings
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className="bg-border/50" />
              <div className="py-1">
                <DropdownMenuItem
                  onClick={logout}
                  className="text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 cursor-pointer rounded-md mx-1 gap-2 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>

    <TaskModal
      isOpen={showTaskModal}
      onClose={() => setShowTaskModal(false)}
      task={undefined}
      mode="create"
    />
    </>
  )
}
