"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTasks } from "@/hooks/use-tasks"
import { Plus, Calendar, MessageSquare, Paperclip, MoreHorizontal, GripVertical } from "lucide-react"

type Status = "todo" | "in-progress" | "done" | "stuck"

const COLUMNS: { id: Status; label: string; color: string; dot: string; bg: string }[] = [
  { id: "todo", label: "To Do", color: "text-slate-500 dark:text-slate-400", dot: "bg-slate-400", bg: "bg-slate-500/6" },
  { id: "in-progress", label: "In Progress", color: "text-indigo-600 dark:text-indigo-400", dot: "bg-indigo-500", bg: "bg-indigo-500/6" },
  { id: "stuck", label: "Stuck", color: "text-rose-600 dark:text-rose-400", dot: "bg-rose-500", bg: "bg-rose-500/6" },
  { id: "done", label: "Done", color: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500", bg: "bg-emerald-500/6" },
]

const PRIORITY_CONFIG = {
  low: { label: "Low", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  medium: { label: "Medium", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  high: { label: "High", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  urgent: { label: "Urgent", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
}

export function KanbanBoard() {
  const { tasks, getTasksByStatus } = useTasks()

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Kanban Board</h2>
          <p className="text-xs text-muted-foreground">{tasks.length} tasks across {COLUMNS.length} columns</p>
        </div>
        <Button
          size="sm"
          className="h-8 px-3 text-xs brand-gradient text-white hover:opacity-90 rounded-lg gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add task
        </Button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {COLUMNS.map((col) => {
          const columnTasks = getTasksByStatus(col.id)
          return (
            <div key={col.id} className="kanban-col p-3 min-h-[400px]">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <span className={`text-xs font-semibold ${col.color}`}>{col.label}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>

              {/* Cards */}
              <div className="space-y-2.5">
                {columnTasks.map((task) => {
                  const priority = PRIORITY_CONFIG[task.priority]
                  return (
                    <div
                      key={task.id}
                      className="glass-card p-3 cursor-pointer hover:shadow-md transition-all group"
                    >
                      {/* Drag handle + menu */}
                      <div className="flex items-start justify-between gap-1 mb-2">
                        <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-muted-foreground mt-0.5 cursor-grab shrink-0" />
                        <p className="text-xs font-medium text-foreground flex-1 leading-snug">{task.title}</p>
                        <Button variant="ghost" size="sm" className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground shrink-0">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </Button>
                      </div>

                      {/* Tags */}
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {task.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                              {tag}
                            </span>
                          ))}
                          {task.tags.length > 2 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                              +{task.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Progress bar (if in progress) */}
                      {task.progress > 0 && task.progress < 100 && (
                        <div className="mb-2">
                          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full brand-gradient rounded-full transition-all"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-0.5 block">{task.progress}%</span>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                        <div className="flex items-center gap-2">
                          {/* Priority badge */}
                          <Badge className={`h-4 px-1.5 text-[10px] border ${priority.bg} ${priority.color}`}>
                            {priority.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {/* Comments */}
                          {task.comments.length > 0 && (
                            <div className="flex items-center gap-0.5 text-muted-foreground">
                              <MessageSquare className="w-3 h-3" />
                              <span className="text-[10px]">{task.comments.length}</span>
                            </div>
                          )}
                          {/* Due date */}
                          {task.dueDate && (
                            <div className="flex items-center gap-0.5 text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span className="text-[10px]">
                                {new Date(task.dueDate).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                              </span>
                            </div>
                          )}
                          {/* Assignee */}
                          {task.assigneeInitials && (
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-[9px] brand-gradient text-white">
                                {task.assigneeInitials}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Empty state */}
                {columnTasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className={`w-8 h-8 rounded-full ${col.bg} flex items-center justify-center mb-2`}>
                      <div className={`w-2 h-2 rounded-full ${col.dot} opacity-50`} />
                    </div>
                    <p className="text-xs text-muted-foreground">No tasks</p>
                    <Button variant="ghost" size="sm" className="mt-2 h-6 text-[10px] text-muted-foreground hover:text-foreground gap-1">
                      <Plus className="w-3 h-3" /> Add one
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
