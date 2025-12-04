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
import {
  ChevronDown,
  ChevronRight,
  Plus,
  MoreHorizontal,
  Star,
  MessageSquare,
  Search,
  Filter,
  SortAsc,
  Calendar,
  User,
} from "lucide-react"

const statusColors = {
  "in-progress": "bg-orange-500",
  done: "bg-green-500",
  stuck: "bg-red-500",
  todo: "bg-slate-500",
}

const statusLabels = {
  "in-progress": "Working on it",
  done: "Done",
  stuck: "Stuck",
  todo: "To Do",
}

const priorityColors = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
}

export function TaskTable() {
  const { tasks, getTasksByStatus, deleteTask } = useTasks()
  const permissions = usePermissions()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["todo", "in-progress", "completed"]))
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const handleCreateTask = () => {
    setSelectedTask(null)
    setModalMode("create")
    setShowTaskModal(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setModalMode("edit")
    setShowTaskModal(true)
  }

  const handleViewTask = (task: Task) => {
    setSelectedTask(task)
    setShowDetailModal(true)
  }

  const handleDeleteTask = async (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId)
      } catch (error) {
        console.error("Failed to delete task:", error)
      }
    }
  }

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    const matchesAssignee = assigneeFilter === "all" || task.assigneeId === assigneeFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  const todoTasks = filteredTasks.filter((task) => task.status === "todo")
  const inProgressTasks = filteredTasks.filter((task) => task.status === "in-progress")
  const stuckTasks = filteredTasks.filter((task) => task.status === "stuck")
  const completedTasks = filteredTasks.filter((task) => task.status === "done")

  const renderTaskRow = (task: Task) => (
    <tr key={task.id} className="border-b border-slate-700 hover:bg-slate-700/50">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Checkbox className="border-slate-600" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-slate-400 hover:text-yellow-400 cursor-pointer" />
            <MessageSquare className="w-4 h-4 text-slate-400" />
            {task.comments.length > 0 && <span className="text-xs text-slate-400">{task.comments.length}</span>}
          </div>
          <button onClick={() => handleViewTask(task)} className="text-white hover:text-blue-400 text-left">
            {task.title}
          </button>
        </div>
      </td>
      <td className="p-4">
        {task.assigneeInitials && (
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-slate-600 text-white text-xs">{task.assigneeInitials}</AvatarFallback>
          </Avatar>
        )}
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Badge className={`${statusColors[task.status]} text-white border-0`}>{statusLabels[task.status]}</Badge>
          <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}></div>
        </div>
      </td>
      <td className="p-4 text-slate-300">
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </td>
      <td className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem onClick={() => handleViewTask(task)} className="text-white hover:bg-slate-700">
              View details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditTask(task)} className="text-white hover:bg-slate-700">
              Edit task
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditTask(task)} className="text-white hover:bg-slate-700">
              Duplicate
            </DropdownMenuItem>
            {permissions.canDeleteTasks && (
              <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-red-400 hover:bg-slate-700">
                Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  )

  const renderTaskSection = (title: string, tasks: Task[], sectionId: string, titleColor = "text-white") => (
    <div className="bg-slate-800 rounded-lg border border-slate-700">
      <div className="flex items-center gap-2 p-4 border-b border-slate-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSection(sectionId)}
          className="text-slate-300 hover:text-white hover:bg-slate-700 p-1"
        >
          {expandedSections.has(sectionId) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
        <h2 className={`text-lg font-semibold ${titleColor}`}>{title}</h2>
        <Badge variant="secondary" className="bg-slate-700 text-slate-300">
          {tasks.length}
        </Badge>
      </div>

      {expandedSections.has(sectionId) && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-4 text-slate-400 font-medium">Task</th>
                <th className="text-left p-4 text-slate-400 font-medium">Owner</th>
                <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                <th className="text-left p-4 text-slate-400 font-medium">Due date</th>
                <th className="w-12 p-4"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(renderTaskRow)}
              <tr className="hover:bg-slate-700/50">
                <td colSpan={5} className="p-4">
                  <Button
                    variant="ghost"
                    onClick={handleCreateTask}
                    className="text-slate-400 hover:text-white hover:bg-slate-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
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
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
              <SelectItem value="stuck">Stuck</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
              <User className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="1">John Doe</SelectItem>
              <SelectItem value="2">Sarah Miller</SelectItem>
              <SelectItem value="3">Alex Brown</SelectItem>
              <SelectItem value="4">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Task Sections */}
      {renderTaskSection("To-Do", todoTasks, "todo")}
      {renderTaskSection("In Progress", inProgressTasks, "in-progress", "text-blue-400")}
      {stuckTasks.length > 0 && renderTaskSection("Stuck", stuckTasks, "stuck", "text-red-400")}
      {renderTaskSection("Completed", completedTasks, "completed", "text-green-400")}

      {/* Modals */}
      <TaskModal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)} task={selectedTask} mode={modalMode} />

      <TaskDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        task={selectedTask}
        onEdit={handleEditTask}
      />
    </div>
  )
}
