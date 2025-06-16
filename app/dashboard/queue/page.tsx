import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QueueView } from "@/components/dashboard/queue-view"
import { createClient } from "@/lib/supabase/server"

export default async function QueuePage() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Fetch all queued posts
  const { data: posts, error } = await supabase
    .from("posts")
    .select(`
      *,
      post_platforms(
        *,
        social_account:social_accounts(*)
      )
    `)
    .eq("user_id", session?.user.id)
    .in("status", ["draft", "scheduled"])
    .order("scheduled_at", { ascending: true })

  if (error) {
    console.error("Error fetching posts:", error)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Content Queue</h1>
      <p className="text-muted-foreground">Manage your upcoming social media posts</p>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts</CardTitle>
          <CardDescription>View and manage your upcoming posts</CardDescription>
        </CardHeader>
        <CardContent>
          <QueueView initialPosts={posts || []} />
        </CardContent>
      </Card>
    </div>
  )
}
