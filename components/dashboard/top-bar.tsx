"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWorkspaces } from "@/hooks/use-workspaces"
import { useCollaboration } from "@/hooks/use-collaboration"
import { Search, Bell, Plus, Filter, SortAsc, MoreHorizontal, Users, Settings } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"


export function TopBar() {
  const { currentWorkspace } = useWorkspaces()
  const { unreadCount } = useCollaboration()
  const { user, isLoading } = useAuth()
  const router = useRouter();

  const handleInvite = () => {
    if (!user) {
      return;
    }
    alert(`Invite link copied:\n`)
  }

  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-white">{currentWorkspace?.name}</h1>
          {/* <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleInvite} size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-slate-700">
              <Users className="w-4 h-4 mr-1" />
              Invite
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700">
              <Settings className="w-4 h-4 mr-1" />
              Enhance
            </Button>
          </div> */}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search"
              className="pl-10 w-64 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          <div className="relative">
            {/* <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700">
              <Bell className="w-4 h-4" />
            </Button> */}
            {/* {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center p-0">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            )} */}
          </div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700">
              <DropdownMenuItem className="text-white hover:bg-slate-700">
                <Settings className="w-4 h-4 mr-2" />
                Workspace Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New task
        </Button>

        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
          <SortAsc className="w-4 h-4 mr-2" />
          Sort
        </Button>
      </div>
    </div>
  )
}
