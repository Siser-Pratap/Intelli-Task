"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTasks, type Task } from "@/hooks/use-tasks"
import { usePermissions } from "@/hooks/use-permissions"
import { Calendar, Clock, User, MessageSquare, Paperclip, Edit, Trash2, Send, Tag, BarChart3 } from "lucide-react"

interface TaskDetailModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  onEdit: (task: Task) => void
}

const priorityColors = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
}

const statusColors = {
  todo: "bg-slate-500",
  "in-progress": "bg-blue-500",
  done: "bg-green-500",
  stuck: "bg-red-500",
}

const statusLabels = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
  stuck: "Stuck",
}

export function TaskDetailModal({ isOpen, onClose, task, onEdit }: TaskDetailModalProps) {
  const { addComment, deleteTask, updateTask } = useTasks()
  const permissions = usePermissions()
  const [newComment, setNewComment] = useState("")
  const [isAddingComment, setIsAddingComment] = useState(false)

  if (!task) return null

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    setIsAddingComment(true)
    try {
      await addComment(task.id, newComment)
      setNewComment("")
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setIsAddingComment(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(task.id)
        onClose()
      } catch (error) {
        console.error("Failed to delete task:", error)
      }
    }
  }

  const handleStatusChange = async (newStatus: Task["status"]) => {
    try {
      await updateTask(task.id, { status: newStatus })
    } catch (error) {
      console.error("Failed to update task status:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-2">{task.title}</DialogTitle>
              <div className="flex items-center gap-2 mb-4">
                <Badge className={`${priorityColors[task.priority]} text-white border-0`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                <Badge className={`${statusColors[task.status]} text-white border-0`}>
                  {statusLabels[task.status]}
                </Badge>
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-slate-600 text-slate-300">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(task)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Edit className="w-4 h-4" />
              </Button>
              {permissions.canDeleteTasks && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {task.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-slate-300 whitespace-pre-wrap">{task.description}</p>
              </div>
            )}

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Progress</h3>
                <span className="text-slate-300">{task.progress}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />
            </div>

            {/* Quick Status Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={task.status === "todo" ? "default" : "outline"}
                  onClick={() => handleStatusChange("todo")}
                  className={
                    task.status === "todo"
                      ? "bg-slate-600 text-white"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  To Do
                </Button>
                <Button
                  size="sm"
                  variant={task.status === "in-progress" ? "default" : "outline"}
                  onClick={() => handleStatusChange("in-progress")}
                  className={
                    task.status === "in-progress"
                      ? "bg-blue-600 text-white"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant={task.status === "done" ? "default" : "outline"}
                  onClick={() => handleStatusChange("done")}
                  className={
                    task.status === "done"
                      ? "bg-green-600 text-white"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  Done
                </Button>
                <Button
                  size="sm"
                  variant={task.status === "stuck" ? "default" : "outline"}
                  onClick={() => handleStatusChange("stuck")}
                  className={
                    task.status === "stuck"
                      ? "bg-red-600 text-white"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  Stuck
                </Button>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Comments ({task.comments.length})</h3>
              <div className="space-y-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">{comment.userInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{comment.userName}</span>
                        <span className="text-xs text-slate-400">{formatDateTime(comment.createdAt)}</span>
                      </div>
                      <p className="text-slate-300">{comment.content}</p>
                    </div>
                  </div>
                ))}

                {/* Add Comment */}
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleAddComment()
                      }
                    }}
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || isAddingComment}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Details */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Task Details</h3>
              <div className="space-y-3">
                {task.assigneeName && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-400">Assignee</div>
                      <div className="text-white">{task.assigneeName}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-sm text-slate-400">Creator</div>
                    <div className="text-white">{task.creatorName}</div>
                  </div>
                </div>

                {task.dueDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="text-sm text-slate-400">Due Date</div>
                      <div className="text-white">{formatDate(task.dueDate)}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-sm text-slate-400">Created</div>
                    <div className="text-white">{formatDate(task.createdAt)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-sm text-slate-400">Last Updated</div>
                    <div className="text-white">{formatDate(task.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Tracking */}
            {(task.estimatedHours || task.actualHours) && (
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Time Tracking</h3>
                <div className="space-y-3">
                  {task.estimatedHours && (
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="text-sm text-slate-400">Estimated</div>
                        <div className="text-white">{task.estimatedHours}h</div>
                      </div>
                    </div>
                  )}

                  {task.actualHours !== undefined && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <div>
                        <div className="text-sm text-slate-400">Actual</div>
                        <div className="text-white">{task.actualHours}h</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity */}
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <MessageSquare className="w-3 h-3" />
                  {task.comments.length} comments
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Paperclip className="w-3 h-3" />
                  {task.attachments.length} attachments
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
