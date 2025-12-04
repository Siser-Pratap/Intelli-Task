"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { WorkspaceModal } from "./workspace-modal"
import {
  Home,
  Users,
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
} from "lucide-react"

interface SidebarProps {
  selectedWorkspace: string
  onWorkspaceChange: (workspaceId: string) => void
  onViewChange?: (view: "dashboard" | "tasks" | "analytics") => void
}

export function Sidebar({ selectedWorkspace, onWorkspaceChange, onViewChange }: SidebarProps) {
  const { user, logout } = useAuth()
  const { workspaces, currentWorkspace, switchWorkspace } = useWorkspaces()
  const permissions = usePermissions()
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false)

  const navigationItems = [
    { icon: Home, label: "Dashboard", id: "dashboard", view: "dashboard" as const },
    { icon: List, label: "Tasks", id: "tasks", view: "tasks" as const },
    { icon: Users, label: "My work", id: "my-work", view: "dashboard" as const },
    ...(permissions.canViewAnalytics
      ? [{ icon: BarChart3, label: "Analytics", id: "analytics", view: "analytics" as const }]
      : []),
    { icon: Settings, label: "Settings", id: "settings", view: "dashboard" as const },
  ]

  const handleWorkspaceSwitch = (workspaceId: string) => {
    switchWorkspace(workspaceId)
    onWorkspaceChange(workspaceId)
  }

  const handleNavClick = (item: (typeof navigationItems)[0]) => {
    if (onViewChange) {
      onViewChange(item.view)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-3 h-3 text-yellow-400" />
      case "manager":
        return <Shield className="w-3 h-3 text-blue-400" />
      case "member":
        return <UserCheck className="w-3 h-3 text-green-400" />
      default:
        return null
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-yellow-400"
      case "manager":
        return "text-blue-400"
      case "member":
        return "text-green-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <>
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        {/* Workspace Selector */}
        <div className="p-4 border-b border-slate-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-between text-white hover:bg-slate-700">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span className="truncate">{currentWorkspace?.name}</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700">
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => handleWorkspaceSwitch(workspace.id)}
                  className="text-white hover:bg-slate-700"
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  {workspace.name}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-slate-700" />
              {permissions.canCreateWorkspace && (
                <DropdownMenuItem onClick={() => setShowWorkspaceModal(true)} className="text-white hover:bg-slate-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create workspace
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleNavClick(item)}
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Favorites</h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 text-sm"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Main table
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Workspaces</h3>
            <div className="space-y-1">
              {workspaces.map((workspace) => (
                <Button
                  key={workspace.id}
                  variant="ghost"
                  onClick={() => handleWorkspaceSwitch(workspace.id)}
                  className={`w-full justify-start text-sm ${
                    currentWorkspace?.id === workspace.id
                      ? "text-white bg-slate-700"
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                >
                  <Building2 className="w-4 h-4 mr-3" />
                  {workspace.name}
                </Button>
              ))}
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-700">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-700">
                <Avatar className="w-8 h-8 mr-3">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {user?.name
                      }
                  </AvatarFallback>
                </Avatar>
                <div className="text-left flex-1">
                  <div className="text-sm font-medium flex items-center gap-2">
                    {user?.name}
                    {getRoleIcon(user?.role || "")}
                  </div>
                  <div className="text-xs text-slate-400">{user?.company}</div>
                  <div className={`text-xs ${getRoleColor(user?.role || "")} capitalize`}>{user?.role}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700">
              <DropdownMenuItem className="text-white hover:bg-slate-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-700" />
              <DropdownMenuItem onClick={logout} className="text-red-400 hover:bg-slate-700 hover:text-red-300">
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
