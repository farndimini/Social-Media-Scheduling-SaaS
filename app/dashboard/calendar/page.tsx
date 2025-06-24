import { EnhancedCalendarView } from "@/components/dashboard/calendar/enhanced-calendar-view"
import { ContentInsights } from "@/components/dashboard/content-insights"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Calendar</h1>
        <p className="text-muted-foreground">Schedule and manage your social media posts across all platforms</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <EnhancedCalendarView />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <ContentInsights />
        </div>
      </div>
    </div>
  )
}
