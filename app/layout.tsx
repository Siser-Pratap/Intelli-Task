import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/hooks/use-auth"
import { WorkspacesProvider } from "@/hooks/use-workspaces"
import { TasksProvider } from "@/hooks/use-tasks"
import { CollaborationProvider } from "@/hooks/use-collaboration"
import { AnalyticsProvider } from "@/hooks/use-analytics"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "TaskFlow - Team Task Management",
  description: "Collaborative task management platform for teams",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <AuthProvider>
            <WorkspacesProvider>
              <TasksProvider>
                <CollaborationProvider>
                  <AnalyticsProvider>{children}</AnalyticsProvider>
                </CollaborationProvider>
              </TasksProvider>
            </WorkspacesProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
