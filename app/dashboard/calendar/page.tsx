import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { getUpcomingPosts } from "@/lib/actions/posts"

export const dynamic = "force-dynamic"

export default async function CalendarPage() {
  // Fetch all scheduled posts for the calendar
  const posts = await getUpcomingPosts().catch((error) => {
    console.error("Error fetching posts:", error)
    return []
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Content Calendar</h1>
      <p className="text-muted-foreground">Schedule and manage your social media posts</p>

      <Card>
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
          <CardDescription>View and manage your scheduled posts</CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarView initialPosts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}
