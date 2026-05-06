"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTasks, type Task } from "@/hooks/use-tasks"
import { usePermissions } from "@/hooks/use-permissions"
import { TaskModal } from "@/components/tasks/task-modal"
import { TaskDetailModal } from "@/components/tasks/task-detail-modal"
import { dummyUsers } from "@/lib/dummy-data"
import {
  ChevronDown, ChevronRight, Plus, MoreHorizontal,
  Star, MessageSquare, Search, Filter, SortAsc, Calendar, User,
} from "lucide-react"

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  "in-progress": { label: "In Progress", className: "status-in-progress" },
  done:          { label: "Done",        className: "status-done" },
  stuck:         { label: "Stuck",       className: "status-stuck" },
  todo:          { label: "To Do",       className: "status-todo" },
}

const PRIORITY_DOT: Record<string, string> = {
  low:    "priority-low",
  medium: "priority-medium",
  high:   "priority-high",
  urgent: "priority-urgent",
}

export function TaskTable() {
  const { tasks, deleteTask } = useTasks()
  const permissions = usePermissions()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["todo", "in-progress", "stuck", "completed"])
  )
  const [showTaskModal, setShowTaskModal]     = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedTask, setSelectedTask]       = useState<Task | null>(null)
  const [modalMode, setModalMode]             = useState<"create" | "edit">("create")
  const [searchTerm, setSearchTerm]           = useState("")
  const [statusFilter, setStatusFilter]       = useState("all")
  const [priorityFilter, setPriorityFilter]   = useState("all")
  const [assigneeFilter, setAssigneeFilter]   = useState("all")

  const toggleSection = (section: string) => {
    const next = new Set(expandedSections)
    next.has(section) ? next.delete(section) : next.add(section)
    setExpandedSections(next)
  }

  const handleCreate = () => { setSelectedTask(null); setModalMode("create"); setShowTaskModal(true) }
  const handleEdit   = (t: Task) => { setSelectedTask(t); setModalMode("edit"); setShowTaskModal(true) }
  const handleView   = (t: Task) => { setSelectedTask(t); setShowDetailModal(true) }
  const handleDelete = async (id: string) => {
    if (confirm("Delete this task?")) await deleteTask(id)
  }

  const filtered = tasks.filter((t) => {
    const q = searchTerm.toLowerCase()
    return (
      (t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)) &&
      (statusFilter   === "all" || t.status   === statusFilter) &&
      (priorityFilter === "all" || t.priority === priorityFilter) &&
      (assigneeFilter === "all" || t.assigneeId === assigneeFilter)
    )
  })

  const byStatus = (s: Task["status"]) => filtered.filter((t) => t.status === s)

  const renderRow = (task: Task) => {
    const sc = STATUS_CONFIG[task.status]
    return (
      <tr
        key={task.id}
        className="border-b border-border/40 hover:bg-foreground/3 transition-colors group"
      >
        {/* Task name */}
        <td className="p-3 pl-4">
          <div className="flex items-center gap-3">
            <Checkbox className="border-border/60 shrink-0" />
            <div className="flex items-center gap-1.5 shrink-0">
              <Star className="w-3.5 h-3.5 text-muted-foreground/40 hover:text-amber-400 cursor-pointer transition-colors" />
              {task.comments.length > 0 && (
                <div className="flex items-center gap-0.5 text-muted-foreground/50">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{task.comments.length}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => handleView(task)}
              className="text-sm text-foreground hover:text-primary text-left font-medium transition-colors truncate max-w-xs"
            >
              {task.title}
            </button>
            {task.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="hidden lg:inline-flex text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground shrink-0">
                {tag}
              </span>
            ))}
          </div>
        </td>

        {/* Assignee */}
        <td className="p-3">
          {task.assigneeInitials ? (
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="brand-gradient text-white text-[10px] font-semibold">
                  {task.assigneeInitials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground hidden md:block truncate max-w-[90px]">
                {task.assigneeName}
              </span>
            </div>
          ) : (
            <span className="text-xs text-muted-foreground/40">Unassigned</span>
          )}
        </td>

        {/* Status + Priority */}
        <td className="p-3">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${sc.className}`}>
              {sc.label}
            </span>
            <div className={`w-2 h-2 rounded-full shrink-0 ${PRIORITY_DOT[task.priority]}`} />
          </div>
        </td>

        {/* Due date */}
        <td className="p-3">
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </div>
          )}
        </td>

        {/* Progress */}
        <td className="p-3 hidden lg:table-cell">
          <div className="flex items-center gap-2 w-24">
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full brand-gradient rounded-full"
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground w-7 text-right">{task.progress}%</span>
          </div>
        </td>

        {/* Actions */}
        <td className="p-3 w-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass border-border/60 shadow-lg" align="end">
              <DropdownMenuItem onClick={() => handleView(task)} className="text-foreground hover:bg-primary/8 cursor-pointer rounded-md gap-2 text-xs">
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(task)} className="text-foreground hover:bg-primary/8 cursor-pointer rounded-md gap-2 text-xs">
                Edit task
              </DropdownMenuItem>
              {permissions.canDeleteTasks && (
                <DropdownMenuItem onClick={() => handleDelete(task.id)} className="text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 cursor-pointer rounded-md gap-2 text-xs">
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>
    )
  }

  const renderSection = (
    title: string,
    sectionTasks: Task[],
    sectionId: string,
    dotClass: string
  ) => (
    <div key={sectionId} className="glass-card overflow-hidden">
      {/* Section header */}
      <button
        onClick={() => toggleSection(sectionId)}
        className="w-full flex items-center gap-2.5 px-4 py-3 border-b border-border/40 hover:bg-foreground/3 transition-colors"
      >
        {expandedSections.has(sectionId)
          ? <ChevronDown className="w-4 h-4 text-muted-foreground" />
          : <ChevronRight className="w-4 h-4 text-muted-foreground" />
        }
        <div className={`w-2.5 h-2.5 rounded-full ${dotClass}`} />
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
          {sectionTasks.length}
        </span>
      </button>

      {expandedSections.has(sectionId) && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Task</th>
                <th className="text-left px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Owner</th>
                <th className="text-left px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-left px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Due</th>
                <th className="text-left px-3 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Progress</th>
                <th className="w-10 px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {sectionTasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-xs text-muted-foreground">
                    No tasks in this section
                  </td>
                </tr>
              ) : (
                sectionTasks.map(renderRow)
              )}
              <tr className="hover:bg-foreground/3">
                <td colSpan={6} className="px-4 py-2">
                  <Button
                    variant="ghost"
                    onClick={handleCreate}
                    className="h-7 text-xs text-muted-foreground hover:text-primary hover:bg-primary/8 gap-1.5 rounded-lg px-2"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add task
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <div className="glass-card p-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 h-8 text-xs bg-background/50 border-border/60 focus:border-primary/50 rounded-lg"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 h-8 text-xs bg-background/50 border-border/60 rounded-lg">
              <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="glass border-border/60">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="stuck">Stuck</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-36 h-8 text-xs bg-background/50 border-border/60 rounded-lg">
              <SortAsc className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="glass border-border/60">
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-40 h-8 text-xs bg-background/50 border-border/60 rounded-lg">
              <User className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent className="glass border-border/60">
              <SelectItem value="all">All Assignees</SelectItem>
              {dummyUsers.filter(u => u.role === "member").map(u => (
                <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{filtered.length} tasks</span>
            <Button
              onClick={handleCreate}
              size="sm"
              className="h-8 px-3 text-xs brand-gradient text-white hover:opacity-90 rounded-lg gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New task
            </Button>
          </div>
        </div>
      </div>

      {/* Sections */}
      {renderSection("To Do",      byStatus("todo"),        "todo",        "bg-slate-400")}
      {renderSection("In Progress", byStatus("in-progress"), "in-progress", "bg-indigo-500")}
      {byStatus("stuck").length > 0 &&
        renderSection("Stuck",     byStatus("stuck"),       "stuck",       "bg-rose-500")}
      {renderSection("Done",       byStatus("done"),        "completed",   "bg-emerald-500")}

      {/* Modals */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        task={selectedTask}
        mode={modalMode}
      />
      <TaskDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        task={selectedTask}
        onEdit={handleEdit}
      />
    </div>
  )
}
