"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./use-auth"
import { useWorkspaces } from "./use-workspaces"
import { DUMMY_DATA, dummyTasks as DUMMY_TASKS } from "@/lib/dummy-data"

export interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "done" | "stuck"
  priority: "low" | "medium" | "high" | "urgent"
  assigneeId?: string
  assigneeName?: string
  assigneeInitials?: string
  creatorId: string
  creatorName: string
  workspaceId: string
  dueDate?: string
  createdAt: string
  updatedAt: string
  comments: TaskComment[]
  attachments: TaskAttachment[]
  tags: string[]
  estimatedHours?: number
  actualHours?: number
  progress: number
}

export interface TaskComment {
  id: string
  taskId: string
  userId: string
  userName: string
  userInitials: string
  content: string
  createdAt: string
}

export interface TaskAttachment {
  id: string
  taskId: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedBy: string
  uploadedAt: string
}

export interface CreateTaskData {
  title: string
  description?: string
  priority: Task["priority"]
  assigneeId?: string
  dueDate?: string
  tags?: string[]
  estimatedHours?: number
}

export interface UpdateTaskData {
  title?: string
  description?: string
  status?: Task["status"]
  priority?: Task["priority"]
  assigneeId?: string
  dueDate?: string
  tags?: string[]
  estimatedHours?: number
  progress?: number
}

interface TasksContextType {
  tasks: Task[]
  isLoading: boolean
  createTask: (data: CreateTaskData) => Promise<Task>
  updateTask: (taskId: string, data: UpdateTaskData) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  addComment: (taskId: string, content: string) => Promise<void>
  getTasksByStatus: (status: Task["status"]) => Task[]
  getTasksByAssignee: (assigneeId: string) => Task[]
  getMyTasks: () => Task[]
}

const TasksContext = createContext<TasksContextType | undefined>(undefined)

export function TasksProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { currentWorkspace } = useWorkspaces()
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user && currentWorkspace) {
      loadTasks()
    }
  }, [user, currentWorkspace])

  const loadTasks = async () => {
    setIsLoading(true)

    if (DUMMY_DATA) {
      // Use Indian-named dummy data from lib/dummy-data.ts
      const mapped: Task[] = DUMMY_TASKS.map((t) => ({
        ...t,
        workspaceId: currentWorkspace?.id || t.workspaceId,
      }))
      setTasks(mapped)
      setIsLoading(false)
      return
    }

    // Mock data - in real app, this would fetch from API
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Update user profile component",
        description: "Refactor the user profile component to use the new design system",
        status: "in-progress",
        priority: "high",
        assigneeId: "1",
        assigneeName: "John Doe",
        assigneeInitials: "JD",
        creatorId: "1",
        creatorName: "John Doe",
        workspaceId: currentWorkspace?.id || "",
        dueDate: "2024-04-27",
        createdAt: "2024-04-20",
        updatedAt: "2024-04-25",
        comments: [
          {
            id: "c1",
            taskId: "1",
            userId: "1",
            userName: "John Doe",
            userInitials: "JD",
            content: "Started working on this, should be done by tomorrow",
            createdAt: "2024-04-25",
          },
        ],
        attachments: [],
        tags: ["frontend", "react", "ui"],
        estimatedHours: 8,
        actualHours: 5,
        progress: 60,
      },
      {
        id: "2",
        title: "Fix login validation bug",
        description: "Users are able to login with invalid credentials in some edge cases",
        status: "done",
        priority: "medium",
        assigneeId: "2",
        assigneeName: "Sarah Miller",
        assigneeInitials: "SM",
        creatorId: "1",
        creatorName: "John Doe",
        workspaceId: currentWorkspace?.id || "",
        dueDate: "2024-04-28",
        createdAt: "2024-04-18",
        updatedAt: "2024-04-26",
        comments: [],
        attachments: [],
        tags: ["backend", "security", "bug"],
        estimatedHours: 4,
        actualHours: 3,
        progress: 100,
      },
      {
        id: "3",
        title: "Write unit tests for API endpoints",
        description: "Add comprehensive test coverage for all user management API endpoints",
        status: "stuck",
        priority: "high",
        assigneeId: "3",
        assigneeName: "Alex Brown",
        assigneeInitials: "AB",
        creatorId: "1",
        creatorName: "John Doe",
        workspaceId: currentWorkspace?.id || "",
        dueDate: "2024-04-29",
        createdAt: "2024-04-19",
        updatedAt: "2024-04-26",
        comments: [
          {
            id: "c2",
            taskId: "3",
            userId: "3",
            userName: "Alex Brown",
            userInitials: "AB",
            content: "Blocked by missing test database setup",
            createdAt: "2024-04-26",
          },
        ],
        attachments: [],
        tags: ["testing", "api", "backend"],
        estimatedHours: 12,
        actualHours: 8,
        progress: 30,
      },
      {
        id: "4",
        title: "Design new dashboard layout",
        description: "Create mockups for the new analytics dashboard",
        status: "todo",
        priority: "medium",
        assigneeId: "4",
        assigneeName: "Mike Johnson",
        assigneeInitials: "MJ",
        creatorId: "1",
        creatorName: "John Doe",
        workspaceId: currentWorkspace?.id || "",
        dueDate: "2024-05-02",
        createdAt: "2024-04-21",
        updatedAt: "2024-04-21",
        comments: [],
        attachments: [],
        tags: ["design", "ui", "dashboard"],
        estimatedHours: 16,
        actualHours: 0,
        progress: 0,
      },
    ]

    setTasks(mockTasks)
    setIsLoading(false)
  }

  const createTask = async (data: CreateTaskData): Promise<Task> => {
    if (!user || !currentWorkspace) throw new Error("User or workspace not available")

    // Mock creation - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: data.title,
      description: data.description,
      status: "todo",
      priority: data.priority,
      assigneeId: data.assigneeId,
      assigneeName: data.assigneeId ? "Assigned User" : undefined,
      assigneeInitials: data.assigneeId ? "AU" : undefined,
      creatorId: user.id,
      creatorName: user.name,
      workspaceId: currentWorkspace.id,
      dueDate: data.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
      attachments: [],
      tags: data.tags || [],
      estimatedHours: data.estimatedHours,
      actualHours: 0,
      progress: 0,
    }

    setTasks((prev) => [...prev, newTask])
    return newTask
  }

  const updateTask = async (taskId: string, data: UpdateTaskData) => {
    // Mock update - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 300))

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...data,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    )
  }

  const deleteTask = async (taskId: string) => {
    // Mock deletion - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 300))

    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const addComment = async (taskId: string, content: string) => {
    if (!user) throw new Error("User not available")

    // Mock comment addition - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newComment: TaskComment = {
      id: `comment-${Date.now()}`,
      taskId,
      userId: user.id,
      userName: user.name,
      userInitials: user.name
        .split(" ")
        .map((n) => n[0])
        .join(""),
      content,
      createdAt: new Date().toISOString(),
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              comments: [...task.comments, newComment],
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    )
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
  }

  const getTasksByAssignee = (assigneeId: string) => {
    return tasks.filter((task) => task.assigneeId === assigneeId)
  }

  const getMyTasks = () => {
    if (!user) return []
    return tasks.filter((task) => task.assigneeId === user.id)
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        createTask,
        updateTask,
        deleteTask,
        addComment,
        getTasksByStatus,
        getTasksByAssignee,
        getMyTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider")
  }
  return context
}
