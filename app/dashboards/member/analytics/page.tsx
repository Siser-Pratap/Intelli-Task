import { MemberAnalytics } from "@/components/analytics/member-analytics"

export const metadata = {
  title: "My Analytics — IntelliTask",
}

export default function MemberAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <MemberAnalytics />
    </div>
  )
}
