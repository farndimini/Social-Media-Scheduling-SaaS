"use client"

import { useState } from "react"
import { Facebook, Instagram, Twitter, MoreHorizontal, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface Post {
  id: string
  content: string
  scheduled_at: string | null
  status: string
  post_platforms?: {
    id: string
    social_account?: {
      platform: string
    }
  }[]
}

interface QueueViewProps {
  initialPosts: Post[]
}

// Function to get platform icon
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="h-4 w-4" />
    case "facebook":
      return <Facebook className="h-4 w-4" />
    case "twitter":
      return <Twitter className="h-4 w-4" />
    default:
      return null
  }
}

export function QueueView({ initialPosts }: QueueViewProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const router = useRouter()
  const supabase = createClient()

  const scheduledPosts = posts.filter((post) => post.status === "scheduled")
  const draftPosts = posts.filter((post) => post.status === "draft")

  const handleDeletePost = async (postId: string) => {
    try {
      await supabase.from("posts").delete().eq("id", postId)
      setPosts(posts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  const formatScheduledTime = (scheduledAt: string | null) => {
    if (!scheduledAt) return "Not scheduled"

    try {
      const date = new Date(scheduledAt)
      const isToday = new Date().toDateString() === date.toDateString()

      if (isToday) {
        return `Today at ${format(date, "h:mm a")}`
      }

      return format(date, "MMM d, yyyy 'at' h:mm a")
    } catch (error) {
      return "Invalid date"
    }
  }

  const renderPostItem = (post: Post) => (
    <div key={post.id} className="flex items-start gap-4 rounded-lg border p-4 mb-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            {post.post_platforms &&
              post.post_platforms.map(
                (platform) =>
                  platform.social_account && (
                    <span key={platform.id} className="inline-block">
                      {getPlatformIcon(platform.social_account.platform)}
                    </span>
                  ),
              )}
          </div>

          {post.status === "scheduled" && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {formatScheduledTime(post.scheduled_at)}
            </div>
          )}

          {post.status === "draft" && <Badge variant="outline">Draft</Badge>}
        </div>

        <p className="text-sm">{post.content}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/edit-post/${post.id}`)}>Edit</DropdownMenuItem>
          {post.status === "draft" && (
            <DropdownMenuItem onClick={() => router.push(`/schedule-post/${post.id}`)}>Schedule</DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => handleDeletePost(post.id)} className="text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <Tabs defaultValue="scheduled">
      <TabsList>
        <TabsTrigger value="scheduled">Scheduled ({scheduledPosts.length})</TabsTrigger>
        <TabsTrigger value="drafts">Drafts ({draftPosts.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="scheduled" className="mt-4">
        {scheduledPosts.length > 0 ? (
          <div>{scheduledPosts.map(renderPostItem)}</div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-2 text-lg font-medium">No scheduled posts</h3>
            <p className="text-sm text-muted-foreground">You don't have any posts scheduled yet.</p>
            <Button className="mt-4" onClick={() => router.push("/create-post")}>
              Create Post
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="drafts" className="mt-4">
        {draftPosts.length > 0 ? (
          <div>{draftPosts.map(renderPostItem)}</div>
        ) : (
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mt-2 text-lg font-medium">No draft posts</h3>
            <p className="text-sm text-muted-foreground">You don't have any draft posts yet.</p>
            <Button className="mt-4" onClick={() => router.push("/create-post")}>
              Create Post
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
