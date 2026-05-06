import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/hooks/use-auth"
import { WorkspacesProvider } from "@/hooks/use-workspaces"
import { TasksProvider } from "@/hooks/use-tasks"
import { CollaborationProvider } from "@/hooks/use-collaboration"
import { AnalyticsProvider } from "@/hooks/use-analytics"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "IntelliTask — AI-Powered Project Management",
  description: "The AI-native project management platform for high-performance teams",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
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
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
