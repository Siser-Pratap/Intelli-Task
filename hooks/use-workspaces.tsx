"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./use-auth"

interface Workspace {
  id: string
  name: string
  description: string
  template: string
  visibility: "private" | "public"
  createdAt: string
  memberCount: number
  isOwner: boolean
}

interface CreateWorkspaceData {
  name: string
  description: string
  template: string
  visibility: "private" | "public"
}

interface WorkspacesContextType {
  workspaces: Workspace[]
  currentWorkspace: Workspace | null
  isLoading: boolean
  createWorkspace: (data: CreateWorkspaceData) => Promise<void>
  switchWorkspace: (workspaceId: string) => void
  deleteWorkspace: (workspaceId: string) => Promise<void>
}

const WorkspacesContext = createContext<WorkspacesContextType | undefined>(undefined)

export function WorkspacesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadWorkspaces()
    }
  }, [user])

  const loadWorkspaces = async () => {
    setIsLoading(true)

    
    const mockWorkspaces: Workspace[] = [
      {
        id: "main-workspace",
        name: `${user?.company} Main`,
        description: "Primary workspace for the company",
        template: "project-management",
        visibility: "private",
        createdAt: "2024-01-01",
        memberCount: 12,
        isOwner: true,
      },
      {
        id: "dev-team",
        name: "Development Team",
        description: "Software development projects and tasks",
        template: "product-development",
        visibility: "private",
        createdAt: "2024-01-15",
        memberCount: 8,
        isOwner: true,
      },
    ]

    setWorkspaces(mockWorkspaces)

    // Set current workspace from localStorage or default to first
    const savedWorkspaceId = localStorage.getItem("current_workspace")
    const workspace = mockWorkspaces.find((w) => w.id === savedWorkspaceId) || mockWorkspaces[0]
    setCurrentWorkspace(workspace)

    setIsLoading(false)
  }

  const createWorkspace = async (data: CreateWorkspaceData) => {
    // Mock creation - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newWorkspace: Workspace = {
      id: `workspace-${Date.now()}`,
      name: data.name,
      description: data.description,
      template: data.template,
      visibility: data.visibility,
      createdAt: new Date().toISOString(),
      memberCount: 1,
      isOwner: true,
    }

    setWorkspaces((prev) => [...prev, newWorkspace])
    switchWorkspace(newWorkspace.id)
  }

  const switchWorkspace = (workspaceId: string) => {
    const workspace = workspaces.find((w) => w.id === workspaceId)
    if (workspace) {
      setCurrentWorkspace(workspace)
      localStorage.setItem("current_workspace", workspaceId)
    }
  }

  const deleteWorkspace = async (workspaceId: string) => {
    // Mock deletion - in real app, this would call API
    await new Promise((resolve) => setTimeout(resolve, 500))

    setWorkspaces((prev) => prev.filter((w) => w.id !== workspaceId))

    if (currentWorkspace?.id === workspaceId) {
      const remainingWorkspaces = workspaces.filter((w) => w.id !== workspaceId)
      if (remainingWorkspaces.length > 0) {
        switchWorkspace(remainingWorkspaces[0].id)
      }
    }
  }

  return (
    <WorkspacesContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        isLoading,
        createWorkspace,
        switchWorkspace,
        deleteWorkspace,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  )
}

export function useWorkspaces() {
  const context = useContext(WorkspacesContext)
  if (context === undefined) {
    throw new Error("useWorkspaces must be used within a WorkspacesProvider")
  }
  return context
}
