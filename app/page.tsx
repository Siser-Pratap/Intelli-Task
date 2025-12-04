"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { TaskDashboard } from "@/components/dashboard/task-dashboard"
import { useAuth } from "@/hooks/use-auth"

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true)
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  

  return <TaskDashboard />
}
