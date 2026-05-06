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
    setIsConnected(true)

    const mockPresence: UserPresence[] = [
      { userId: "u3", userName: "Rahul Mehta",     userInitials: "RM", status: "online",  lastSeen: new Date().toISOString(),                              currentPage: "Tasks" },
      { userId: "u6", userName: "Ananya Krishnan", userInitials: "AK", status: "online",  lastSeen: new Date(Date.now() - 5  * 60 * 1000).toISOString(), currentPage: "Dashboard" },
      { userId: "u5", userName: "Vikram Nair",     userInitials: "VN", status: "busy",    lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString(), currentPage: "CI/CD Setup" },
      { userId: "u4", userName: "Sneha Iyer",      userInitials: "SI", status: "away",    lastSeen: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
      { userId: "u8", userName: "Kavya Reddy",     userInitials: "KR", status: "online",  lastSeen: new Date(Date.now() - 2  * 60 * 1000).toISOString(), currentPage: "Analytics" },
      { userId: "u9", userName: "Aditya Verma",    userInitials: "AV", status: "offline", lastSeen: new Date(Date.now() - 3  * 60 * 60 * 1000).toISOString() },
    ]

    const mockActivities: ActivityItem[] = [
      { id: "a1", type: "task_completed", userId: "u6", userName: "Ananya Krishnan", userInitials: "AK", description: "completed 'Mobile app onboarding flow'",        entityId: "t4", entityType: "task",      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),       workspaceId: currentWorkspace?.id || "" },
      { id: "a2", type: "task_updated",   userId: "u3", userName: "Rahul Mehta",     userInitials: "RM", description: "updated progress on 'Homepage hero redesign'",  entityId: "t1", entityType: "task",      timestamp: new Date(Date.now() - 55 * 60 * 1000).toISOString(),       workspaceId: currentWorkspace?.id || "" },
      { id: "a3", type: "task_created",   userId: "u5", userName: "Vikram Nair",     userInitials: "VN", description: "started working on 'Setup CI/CD pipeline'",     entityId: "t6", entityType: "task",      timestamp: new Date(Date.now() - 2  * 60 * 60 * 1000).toISOString(), workspaceId: currentWorkspace?.id || "" },
      { id: "a4", type: "comment_added",  userId: "u4", userName: "Sneha Iyer",      userInitials: "SI", description: "commented on 'Database query optimisation'",    entityId: "t3", entityType: "task",      timestamp: new Date(Date.now() - 3  * 60 * 60 * 1000).toISOString(), workspaceId: currentWorkspace?.id || "" },
      { id: "a5", type: "task_created",   userId: "u2", userName: "Priya Patel",     userInitials: "PP", description: "assigned 'JWT Authentication' to Vikram Nair",  entityId: "t2", entityType: "task",      timestamp: new Date(Date.now() - 5  * 60 * 60 * 1000).toISOString(), workspaceId: currentWorkspace?.id || "" },
      { id: "a6", type: "user_joined",    userId: "u9", userName: "Aditya Verma",    userInitials: "AV", description: "joined Product Development workspace",                             entityType: "workspace", timestamp: new Date(Date.now() - 8  * 60 * 60 * 1000).toISOString(), workspaceId: currentWorkspace?.id || "" },
    ]

    const mockNotifications: Notification[] = [
      { id: "n1", type: "deadline",   title: "Task overdue",       message: "'Database query optimisation' is past its due date",                   userId: user?.id || "", isRead: false, timestamp: new Date(Date.now() - 1  * 60 * 60 * 1000).toISOString(), priority: "high" },
      { id: "n2", type: "assignment", title: "Assigned to you",    message: "Priya Patel assigned 'OpenAPI Documentation' to you",                  userId: user?.id || "", isRead: false, timestamp: new Date(Date.now() - 3  * 60 * 60 * 1000).toISOString(), priority: "medium" },
      { id: "n3", type: "system",     title: "AI detected blocker",message: "'JWT Auth' is blocking 3 downstream tasks. AI recommends prioritising.", userId: user?.id || "", isRead: false, timestamp: new Date(Date.now() - 5  * 60 * 60 * 1000).toISOString(), priority: "high" },
      { id: "n4", type: "comment",    title: "New comment",        message: "Sneha Iyer commented on 'Database query optimisation'",                 userId: user?.id || "", isRead: true,  timestamp: new Date(Date.now() - 8  * 60 * 60 * 1000).toISOString(), priority: "low" },
      { id: "n5", type: "system",     title: "Task completed",     message: "Ananya Krishnan completed 'Mobile app onboarding flow' ✓",              userId: user?.id || "", isRead: true,  timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), priority: "low" },
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
