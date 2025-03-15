"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  username?: string
  name?: string
  email: string
  role: "admin" | "doctor" | "nurse" | "staff" | "user"
  hospitalId?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string, type?: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        }
      } catch (error) {
        console.error("Authentication check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string, type = "user") => {
    setIsLoading(true)
    setError(null)

    try {
      // Determine which endpoint to use based on the type
      const endpoint = type === "admin" ? "/api/auth/admin-login" : "/api/auth/login"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Set user data based on the response
      const userData = {
        id: data.user?.id || data.user?._id,
        username: data.user?.username || data.user?.name,
        name: data.user?.name || data.user?.username,
        email: data.user?.email,
        role: type === "admin" ? "admin" : "user",
        hospitalId: data.user?.hospitalId,
      }

      setUser(userData)
      router.push("/") // Redirect to dashboard after login
    } catch (error) {
      setError(error.message || "An error occurred during login")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      setUser(null)
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

