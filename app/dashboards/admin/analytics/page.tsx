import { AdminAnalytics } from "@/components/analytics/admin-analytics"

export const metadata = {
  title: "Admin Analytics — IntelliTask",
}

export default function AdminAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <AdminAnalytics />
    </div>
  )
}
