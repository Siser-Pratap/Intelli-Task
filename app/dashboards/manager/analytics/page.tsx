import { ManagerAnalytics } from "@/components/analytics/manager-analytics"

export const metadata = {
  title: "Team Analytics — IntelliTask",
}

export default function ManagerAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <ManagerAnalytics />
    </div>
  )
}
