"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./use-auth"
import { useWorkspaces } from "./use-workspaces"

export interface UserPresence {
  userId: string
  userName: string
  userInitials: string
  status: "online" | "away" | "busy" | "offline"
  lastSeen: string
  currentPage?: string
  isTyping?: boolean
}

export interface ActivityItem {
  id: string
  type: "task_created" | "task_updated" | "task_completed" | "comment_added" | "user_joined" | "file_uploaded"
  userId: string
  userName: string
  userInitials: string
  description: string
  entityId?: string
  entityType?: "task" | "workspace" | "user"
  timestamp: string
  workspaceId: string
}

export interface Notification {
  id: string
  type: "mention" | "assignment" | "deadline" | "comment" | "system"
  title: string
  message: string
  userId: string
  isRead: boolean
  timestamp: string
  actionUrl?: string
  priority: "low" | "medium" | "high"
}

interface CollaborationContextType {
  userPresence: UserPresence[]
  activities: ActivityItem[]
  notifications: Notification[]
  unreadCount: number
  isConnected: boolean
  addActivity: (activity: Omit<ActivityItem, "id" | "timestamp" | "workspaceId">) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  markNotificationRead: (notificationId: string) => void
  markAllNotificationsRead: () => void
  updateUserStatus: (status: UserPresence["status"]) => void
  setTypingStatus: (isTyping: boolean, context?: string) => void
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined)

export function CollaborationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const { currentWorkspace } = useWorkspaces()
  const [userPresence, setUserPresence] = useState<UserPresence[]>([])
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (user && currentWorkspace) {
      initializeCollaboration()
      simulateRealTimeUpdates()
    }
  }, [user, currentWorkspace])

  const initializeCollaboration = () => {
    // Mock initialization - in real app, this would establish WebSocket connection
    setIsConnected(true)

    // Mock user presence data
    const mockPresence: UserPresence[] = [
      {
        userId: "1",
        userName: "John Doe",
        userInitials: "JD",
        status: "online",
        lastSeen: new Date().toISOString(),
        currentPage: "tasks",
      },
      {
        userId: "2",
        userName: "Sarah Miller",
        userInitials: "SM",
        status: "online",
        lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        currentPage: "dashboard",
      },
      {
        userId: "3",
        userName: "Alex Brown",
        userInitials: "AB",
        status: "away",
        lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
      {
        userId: "4",
        userName: "Mike Johnson",
        userInitials: "MJ",
        status: "busy",
        lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        currentPage: "analytics",
      },
    ]

    // Mock recent activities
    const mockActivities: ActivityItem[] = [
      {
        id: "1",
        type: "task_completed",
        userId: "2",
        userName: "Sarah Miller",
        userInitials: "SM",
        description: "completed task 'Fix login validation bug'",
        entityId: "2",
        entityType: "task",
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        workspaceId: currentWorkspace?.id || "",
      },
      {
        id: "2",
        type: "comment_added",
        userId: "3",
        userName: "Alex Brown",
        userInitials: "AB",
        description: "commented on 'Write unit tests for API endpoints'",
        entityId: "3",
        entityType: "task",
        timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        workspaceId: currentWorkspace?.id || "",
      },
      {
        id: "3",
        type: "task_created",
        userId: "1",
        userName: "John Doe",
        userInitials: "JD",
        description: "created new task 'Design new dashboard layout'",
        entityId: "4",
        entityType: "task",
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        workspaceId: currentWorkspace?.id || "",
      },
      {
        id: "4",
        type: "user_joined",
        userId: "4",
        userName: "Mike Johnson",
        userInitials: "MJ",
        description: "joined the workspace",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        workspaceId: currentWorkspace?.id || "",
      },
    ]

    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "assignment",
        title: "New Task Assignment",
        message: "You have been assigned to 'Update user profile component'",
        userId: user?.id || "",
        isRead: false,
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        actionUrl: "/tasks/1",
        priority: "high",
      },
      {
        id: "2",
        type: "mention",
        title: "You were mentioned",
        message: "Sarah Miller mentioned you in a comment",
        userId: user?.id || "",
        isRead: false,
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        actionUrl: "/tasks/2",
        priority: "medium",
      },
      {
        id: "3",
        type: "deadline",
        title: "Deadline Approaching",
        message: "Task 'Write unit tests' is due tomorrow",
        userId: user?.id || "",
        isRead: true,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        actionUrl: "/tasks/3",
        priority: "high",
      },
    ]

    setUserPresence(mockPresence)
    setActivities(mockActivities)
    setNotifications(mockNotifications)
  }

  const simulateRealTimeUpdates = () => {
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      // Randomly update user presence
      setUserPresence((prev) =>
        prev.map((presence) => ({
          ...presence,
          lastSeen: Math.random() > 0.7 ? new Date().toISOString() : presence.lastSeen,
          status:
            Math.random() > 0.9
              ? (["online", "away", "busy"] as const)[Math.floor(Math.random() * 3)]
              : presence.status,
        })),
      )

      // Occasionally add new activities
      if (Math.random() > 0.8) {
        const activityTypes = ["task_updated", "comment_added", "file_uploaded"] as const
        const randomUser = ["Sarah Miller", "Alex Brown", "Mike Johnson"][Math.floor(Math.random() * 3)]
        const randomInitials = ["SM", "AB", "MJ"][Math.floor(Math.random() * 3)]

        const newActivity: ActivityItem = {
          id: `activity-${Date.now()}`,
          type: activityTypes[Math.floor(Math.random() * activityTypes.length)],
          userId: Math.floor(Math.random() * 4 + 1).toString(),
          userName: randomUser,
          userInitials: randomInitials,
          description: `performed an action`,
          timestamp: new Date().toISOString(),
          workspaceId: currentWorkspace?.id || "",
        }

        setActivities((prev) => [newActivity, ...prev.slice(0, 19)]) // Keep only latest 20
      }
    }, 30000)

    return () => clearInterval(interval)
  }

  const addActivity = (activity: Omit<ActivityItem, "id" | "timestamp" | "workspaceId">) => {
    const newActivity: ActivityItem = {
      ...activity,
      id: `activity-${Date.now()}`,
      timestamp: new Date().toISOString(),
      workspaceId: currentWorkspace?.id || "",
    }

    setActivities((prev) => [newActivity, ...prev])
  }

  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }

    setNotifications((prev) => [newNotification, ...prev])
  }

  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === notificationId ? { ...notif, isRead: true } : notif)))
  }

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })))
  }

  const updateUserStatus = (status: UserPresence["status"]) => {
    if (!user) return

    setUserPresence((prev) =>
      prev.map((presence) =>
        presence.userId === user.id
          ? {
              ...presence,
              status,
              lastSeen: new Date().toISOString(),
            }
          : presence,
      ),
    )
  }

  const setTypingStatus = (isTyping: boolean, context?: string) => {
    if (!user) return

    setUserPresence((prev) =>
      prev.map((presence) =>
        presence.userId === user.id
          ? {
              ...presence,
              isTyping,
              lastSeen: new Date().toISOString(),
            }
          : presence,
      ),
    )
  }

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  return (
    <CollaborationContext.Provider
      value={{
        userPresence,
        activities,
        notifications,
        unreadCount,
        isConnected,
        addActivity,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        updateUserStatus,
        setTypingStatus,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  )
}

export function useCollaboration() {
  const context = useContext(CollaborationContext)
  if (context === undefined) {
    throw new Error("useCollaboration must be used within a CollaborationProvider")
  }
  return context
}
