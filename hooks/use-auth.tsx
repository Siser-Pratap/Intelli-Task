"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"
import { DUMMY_DATA, dummyUsers, dummyCredentials } from "@/lib/dummy-data"

interface User {
  id: string
  name: string
  email: string
  company: string
  role: "admin" | "manager" | "member"
  password?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, company: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("intellitask_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("intellitask_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    if (DUMMY_DATA) {
      // ── Dummy auth: match against hardcoded credentials ──
      await new Promise((r) => setTimeout(r, 400)) // simulate network delay
      const cred = dummyCredentials[email.toLowerCase()]
      if (!cred || cred.password !== password) {
        throw new Error("Invalid email or password")
      }
      const foundUser = dummyUsers.find((u) => u.id === cred.userId)
      if (!foundUser) throw new Error("User not found")
      const { status, ...userWithoutStatus } = foundUser
      setUser(userWithoutStatus)
      localStorage.setItem("intellitask_user", JSON.stringify(userWithoutStatus))
      return
    }

    // ── Real backend auth ──
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      const loggedInUser = response.data.user
      setUser(loggedInUser)
      localStorage.setItem("intellitask_user", JSON.stringify(loggedInUser))
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  }

  const register = async (email: string, password: string, name: string, company: string) => {
    if (DUMMY_DATA) {
      await new Promise((r) => setTimeout(r, 400))
      const newUser: User = {
        id: `u-${Date.now()}`,
        name,
        email,
        company,
        role: "member",
      }
      setUser(newUser)
      localStorage.setItem("intellitask_user", JSON.stringify(newUser))
      return
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, { email, password, name, company })
      const newUser = response.data.user
      setUser(newUser)
      localStorage.setItem("intellitask_user", JSON.stringify(newUser))
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("intellitask_user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
