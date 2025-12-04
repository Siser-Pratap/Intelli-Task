// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// interface User {
//   id: string
//   name: string
//   email: string
//   company: string
//   role: "admin" | "manager" | "member"
//   password: string
// }

// interface AuthContextType {
//   user: User | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<void>
//   register: (email: string, password: string, name: string, company: string) => Promise<void>
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check for stored user session
//     const storedUser = localStorage.getItem("taskflow_user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//     setIsLoading(false)
//   }, [])

//   const login = async (email: string, password: string) => {
//     await new Promise((resolve) => setTimeout(resolve, 500)) // simulate delay

//     const storedUser = localStorage.getItem("taskflow_user")
//     if (!storedUser) {
//       throw new Error("No user found. Please sign up first.")
//     }

//     const parsedUser: User = JSON.parse(storedUser)

//     if (parsedUser.email === email && parsedUser.password === password) {
//       setUser(parsedUser)
//     } else {
//       throw new Error("Invalid email or password")
//     }
//   }


//   const register = async (email: string, password: string, name: string, company: string) => {
//     await new Promise((resolve) => setTimeout(resolve, 500)) // simulate delay

//     const newUser: User = {
//       id: Date.now().toString(),
//       name,
//       email,
//       company,
//       role: "member",
//       password, // 👈 save password
//     }

//     setUser(newUser)
//     localStorage.setItem("taskflow_user", JSON.stringify(newUser))
//   }


//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("taskflow_user")
//   }

//   return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }


"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"

interface User {
  id: string
  name: string
  email: string
  company: string
  role: "admin" | "manager" | "member"
  password: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string, company: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 👇 Adjust this to your backend API base URL
const API_URL = "http://localhost:5000/api/auth"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("taskflow_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      console.log(`email:${email} and password ${password}`);
      const response = await axios.post(`${API_URL}/login`, { email, password })
      const loggedInUser = response.data.user
      

      setUser(loggedInUser)
      localStorage.setItem("taskflow_user", JSON.stringify(loggedInUser))
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed")
    }
  }

  const register = async (email: string, password: string, name: string, company: string) => {
    try {
      console.log(`email:${email} and password ${password}`);
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
        company,
      })

      const newUser = response.data.user
      setUser(newUser)
      localStorage.setItem("taskflow_user", JSON.stringify(newUser))
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Registration failed")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("taskflow_user")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
