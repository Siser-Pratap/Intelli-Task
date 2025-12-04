"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { AdminDashboard } from "./admin-dashboard"
import { ManagerDashboard } from "./manager-dashboard"
import { MemberDashboard } from "./member-dashboard"
import { TaskTable } from "./task-table"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { useAuth } from "@/hooks/use-auth"

export function TaskDashboard() {
  const [selectedWorkspace, setSelectedWorkspace] = useState("main-workspace")
  const [currentView, setCurrentView] = useState<"dashboard" | "tasks" | "analytics">("dashboard")
  const { user } = useAuth()

  const renderContent = () => {
    if (currentView === "tasks") {
      return <TaskTable />
    }

    if (currentView === "analytics") {
      return <AnalyticsDashboard />
    }

    // Dashboard view - role-based
    switch (user?.role) {
      case "admin":
        return <AdminDashboard />
      case "manager":
        return <ManagerDashboard />
      case "member":
        return <MemberDashboard />
      default:
        return <MemberDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar
        selectedWorkspace={selectedWorkspace}
        onWorkspaceChange={setSelectedWorkspace}
        onViewChange={setCurrentView}
      />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
