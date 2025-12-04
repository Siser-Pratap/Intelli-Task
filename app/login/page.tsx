"use client"

import React from "react"
import { useAuth } from "@/hooks/use-auth"
import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { RegisterForm } from "@/components/auth/register-form"
import { TaskDashboard } from "@/components/dashboard/task-dashboard"
import { useRouter } from "next/navigation"

export default function page(){
    const { user, isLoading } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const router = useRouter();


    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            <LoginForm onToggleMode={() => router.push("/signup") }/>
        </div>
      </div>
    )
}