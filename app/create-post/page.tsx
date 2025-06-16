import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PostForm } from "@/components/post-form"

export default async function CreatePostPage() {
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

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Post</h1>
        <p className="text-muted-foreground">Create and schedule posts for your social media accounts</p>
      </div>

      <PostForm accounts={accounts || []} />
    </div>
  )
}
