import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { VideoPostForm } from "@/components/video-post/video-post-form"

export default async function CreateVideoPostPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Get user's social accounts
  const { data: accounts } = await supabase
    .from("social_accounts")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("is_active", true)
    .order("platform")

  // Get user's media
  const { data: media } = await supabase
    .from("media")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .filter("file_type", "in", '("video/mp4","video/quicktime","video/webm")')

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Video Post</h1>
        <p className="text-muted-foreground">
          Create and schedule video content for YouTube Shorts, TikTok, and other platforms
        </p>
      </div>

      <VideoPostForm accounts={accounts || []} media={media || []} />
    </div>
  )
}
