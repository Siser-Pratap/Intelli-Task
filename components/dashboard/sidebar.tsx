"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import { useWorkspaces } from "@/hooks/use-workspaces"
import { usePermissions } from "@/hooks/use-permissions"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { WorkspaceModal } from "./workspace-modal"
import {
  Home,
  LayoutGrid,
  BarChart3,
  Settings,
  Plus,
  ChevronDown,
  Building2,
  LogOut,
  Shield,
  List,
  Crown,
  UserCheck,
  Sparkles,
  GitBranch,
  Sun,
  Moon,
  Zap,
  Bell,
  Users,
  Search,
} from "lucide-react"

type ViewType = "dashboard" | "tasks" | "analytics" | "kanban" | "ai-insights" | "settings"

interface SidebarProps {
  selectedWorkspace: string
  onWorkspaceChange: (workspaceId: string) => void
  onViewChange?: (view: ViewType) => void
  currentView?: ViewType
}

export function Sidebar({ selectedWorkspace, onWorkspaceChange, onViewChange, currentView = "dashboard" }: SidebarProps) {
  const { user, logout } = useAuth()
  const { workspaces, currentWorkspace, switchWorkspace } = useWorkspaces()
  const permissions = usePermissions()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)

  const navigationItems = [
    { icon: Home, label: "Dashboard", id: "dashboard", view: "dashboard" as ViewType, badge: null },
    { icon: List, label: "Tasks", id: "tasks", view: "tasks" as ViewType, badge: null },
    { icon: LayoutGrid, label: "Kanban", id: "kanban", view: "kanban" as ViewType, badge: null },
    ...(permissions.canViewAnalytics
      ? [{ icon: BarChart3, label: "Analytics", id: "analytics", view: "analytics" as ViewType, badge: null }]
      : []),
    ...(permissions.canViewAnalytics
      ? [{ icon: Sparkles, label: "AI Insights", id: "ai-insights", view: "ai-insights" as ViewType, badge: "AI" }]
      : []),
    { icon: Settings, label: "Settings", id: "settings", view: "settings" as ViewType, badge: null },
  ]

  const handleWorkspaceSwitch = (workspaceId: string) => {
    switchWorkspace(workspaceId)
    onWorkspaceChange(workspaceId)
  }

  const handleNavClick = (item: (typeof navigationItems)[0]) => {
    if (onViewChange) onViewChange(item.view)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return <Crown className="w-3 h-3 text-amber-500" />
      case "manager": return <Shield className="w-3 h-3 text-indigo-500" />
      case "member": return <UserCheck className="w-3 h-3 text-emerald-500" />
      default: return null
    }
  }

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin": return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      case "manager": return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
      case "member": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)

  return (
    <>
      <div className="w-64 glass-sidebar flex flex-col h-screen sticky top-0 z-20 scrollbar-glass overflow-y-auto">
        {/* Logo / Brand */}
        <div className="p-5 pb-4">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center shadow-sm">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-foreground">IntelliTask</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[10px] text-muted-foreground">All systems online</span>
              </div>
            </div>
          </div>

          {/* Workspace Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between h-9 px-3 text-foreground hover:bg-primary/8 border border-border/60 rounded-lg text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="truncate max-w-[130px]">{currentWorkspace?.name || "Select workspace"}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass border-border/60 shadow-lg" align="start">
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => handleWorkspaceSwitch(workspace.id)}
                  className="text-foreground hover:bg-primary/8 cursor-pointer rounded-md"
                >
                  <Building2 className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
                  {workspace.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-border/50" />
              {permissions.canCreateWorkspace && (
                <DropdownMenuItem
                  onClick={() => setShowWorkspaceModal(true)}
                  className="text-primary hover:bg-primary/8 cursor-pointer rounded-md"
                >
                  <Plus className="w-3.5 h-3.5 mr-2" />
                  New workspace
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Quick Search */}
        <div className="px-3 pb-3">
          <button
            onClick={() => toast({ title: "Search", description: "Use the search bar in the top right to find tasks." })}
            className="w-full flex items-center gap-2.5 h-8 px-3 rounded-lg border border-border/50 bg-background/40 hover:bg-background/70 text-muted-foreground text-xs transition-all hover:border-primary/30"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search tasks...</span>
            <kbd className="ml-auto text-[10px] bg-muted px-1.5 py-0.5 rounded border border-border/50">⌘K</kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pb-4">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2 mb-2">Menu</p>
          <div className="space-y-0.5">
            {navigationItems.map((item) => {
              const isActive = currentView === item.view && item.id === currentView
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavClick(item)}
                  className={`w-full justify-start h-9 px-3 text-sm rounded-lg transition-all gap-3 ${
                    currentView === item.id
                      ? "bg-primary/10 text-primary font-medium border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/6"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge className="h-4 px-1.5 text-[10px] bg-primary/15 text-primary border-primary/20 font-medium">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </div>

          {/* Workspaces Section */}
          <div className="mt-6">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2 mb-2">
              Workspaces
            </p>
            <div className="space-y-0.5">
              {workspaces.map((workspace) => (
                <Button
                  key={workspace.id}
                  variant="ghost"
                  onClick={() => handleWorkspaceSwitch(workspace.id)}
                  className={`w-full justify-start h-8 px-3 text-xs rounded-lg transition-all gap-2.5 ${
                    currentWorkspace?.id === workspace.id
                      ? "text-primary bg-primary/8 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-sm ${
                    workspace.id === "ws1" ? "bg-indigo-500" :
                    workspace.id === "ws2" ? "bg-violet-500" : "bg-amber-500"
                  }`} />
                  <span className="truncate">{workspace.name}</span>
                  <span className="ml-auto text-[10px] text-muted-foreground">{workspace.memberCount}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Favorites */}
          <div className="mt-6">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2 mb-2">
              Pinned
            </p>
            <Button
              variant="ghost"
              onClick={() => onViewChange?.("tasks")}
              className="w-full justify-start h-8 px-3 text-xs rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 gap-2.5"
            >
              <div className="w-2 h-2 bg-rose-500 rounded-full" />
              <span>Urgent tasks</span>
              <Badge className="ml-auto h-4 px-1.5 text-[10px] bg-rose-500/10 text-rose-500 border-rose-500/20">2</Badge>
            </Button>
          </div>
        </nav>

        {/* Bottom: Theme Toggle + User Profile */}
        <div className="px-3 pb-4 space-y-2">
          {/* Dark mode toggle */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg border border-border/50 bg-background/30">
            <span className="text-xs text-muted-foreground">Appearance</span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark"
                ? <><Sun className="w-3.5 h-3.5" /><span>Light</span></>
                : <><Moon className="w-3.5 h-3.5" /><span>Dark</span></>
              }
            </button>
          </div>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start h-auto px-3 py-2.5 rounded-lg hover:bg-foreground/6 border border-border/50 transition-all"
              >
                <Avatar className="w-7 h-7 mr-2.5 shrink-0">
                  <AvatarFallback className="brand-gradient text-white text-xs font-semibold">
                    {user?.name ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1 min-w-0">
                  <div className="text-xs font-semibold text-foreground flex items-center gap-1.5 truncate">
                    {user?.name}
                    {getRoleIcon(user?.role || "")}
                  </div>
                  <div className={`text-[10px] mt-0.5 px-1.5 py-0.5 rounded-full border inline-flex items-center ${getRoleBadgeClass(user?.role || "")}`}>
                    {user?.role}
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass border-border/60 shadow-lg" align="end" side="top">
              <div className="px-3 py-2 border-b border-border/50">
                <p className="text-sm font-medium text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuItem
                onClick={() => onViewChange?.("settings")}
                className="text-foreground hover:bg-primary/8 cursor-pointer rounded-md mt-1"
              >
                <Settings className="w-4 h-4 mr-2 text-muted-foreground" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onViewChange?.("dashboard")}
                className="text-foreground hover:bg-primary/8 cursor-pointer rounded-md"
              >
                <Bell className="w-4 h-4 mr-2 text-muted-foreground" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              <DropdownMenuItem
                onClick={logout}
                className="text-destructive hover:bg-destructive/8 cursor-pointer rounded-md"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {permissions.canCreateWorkspace && (
        <WorkspaceModal isOpen={showWorkspaceModal} onClose={() => setShowWorkspaceModal(false)} />
      )}
    </>
  )
}
