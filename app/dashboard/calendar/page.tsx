import { EnhancedCalendarView } from "@/components/dashboard/enhanced-calendar-view"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Calendar</h1>
        <p className="text-muted-foreground">Schedule and manage your social media posts across all platforms</p>
      </div>
      <EnhancedCalendarView />
    </div>
  )
}
