"use client"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // List of routes that should not be protected
  const unprotectedRoutes = ["/login", "/register", "/forgot-password"]

  const isProtectedRoute = !unprotectedRoutes.includes(pathname)

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {isProtectedRoute ? (
              <ProtectedRoute>
                <div className="flex h-screen bg-background">
                  <Sidebar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
                      <div className="container mx-auto px-6 py-8">{children}</div>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            ) : (
              <div className="flex h-screen bg-background">
                <div className="flex-1 flex flex-col overflow-hidden">
                  <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">
                    <div className="container mx-auto px-6 py-8">{children}</div>
                  </main>
                </div>
              </div>
            )}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}