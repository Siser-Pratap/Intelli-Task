"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useTasks, type Task, type CreateTaskData, type UpdateTaskData } from "@/hooks/use-tasks"
import { Tag, X } from "lucide-react"

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  task?: Task
  mode: "create" | "edit"
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

export function TaskModal({ isOpen, onClose, task, mode }: TaskModalProps) {
  const { createTask, updateTask } = useTasks()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    status: "todo" as Task["status"],
    assigneeId: "",
    dueDate: "",
    estimatedHours: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")

  useEffect(() => {
    if (task && mode === "edit") {
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        assigneeId: task.assigneeId || "",
        dueDate: task.dueDate || "",
        estimatedHours: task.estimatedHours?.toString() || "",
        tags: task.tags,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        assigneeId: "",
        dueDate: "",
        estimatedHours: "",
        tags: [],
      })
    }
  }, [task, mode, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    setIsLoading(true)
    try {
      if (mode === "create") {
        const createData: CreateTaskData = {
          title: formData.title,
          description: formData.description || undefined,
          priority: formData.priority,
          assigneeId: formData.assigneeId || undefined,
          dueDate: formData.dueDate || undefined,
          estimatedHours: formData.estimatedHours ? Number.parseInt(formData.estimatedHours) : undefined,
          tags: formData.tags,
        }
        await createTask(createData)
      } else if (task) {
        const updateData: UpdateTaskData = {
          title: formData.title,
          description: formData.description || undefined,
          priority: formData.priority,
          status: formData.status,
          assigneeId: formData.assigneeId || undefined,
          dueDate: formData.dueDate || undefined,
          estimatedHours: formData.estimatedHours ? Number.parseInt(formData.estimatedHours) : undefined,
          tags: formData.tags,
        }
        await updateTask(task.id, updateData)
      }
      onClose()
    } catch (error) {
      console.error("Failed to save task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target === e.currentTarget) {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{mode === "create" ? "Create New Task" : "Edit Task"}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {mode === "create" ? "Add a new task to your workspace" : "Update task details and status"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Describe the task in detail"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: Task["priority"]) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Low
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      Medium
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      High
                    </div>
                  </SelectItem>
                  <SelectItem value="urgent">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Urgent
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "edit" && (
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: Task["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="stuck">Stuck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                value={formData.estimatedHours}
                onChange={(e) => setFormData((prev) => ({ ...prev, estimatedHours: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Select
              value={formData.assigneeId}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, assigneeId: value }))}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="unassigned">Unassigned</SelectItem>
                <SelectItem value="1">John Doe</SelectItem>
                <SelectItem value="2">Sarah Miller</SelectItem>
                <SelectItem value="3">Alex Brown</SelectItem>
                <SelectItem value="4">Mike Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-slate-700 border-slate-600 text-white flex-1"
                placeholder="Add a tag"
              />
              <Button type="button" onClick={addTag} variant="outline" className="border-slate-600 bg-transparent">
                <Tag className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-blue-600 text-white">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-300">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!formData.title.trim() || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
            >
              {isLoading ? "Saving..." : mode === "create" ? "Create Task" : "Update Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
