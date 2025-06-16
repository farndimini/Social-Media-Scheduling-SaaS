"use client"

import { Facebook, Instagram, MoreHorizontal, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deletePost } from "@/lib/actions/posts"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

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

// Format date for display
const formatScheduledDate = (dateString: string | null) => {
  if (!dateString) return "Not scheduled"

  const date = new Date(dateString)
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // Check if it's today
  if (date.toDateString() === now.toDateString()) {
    return `Today, ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
  }

  // Check if it's tomorrow
  if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow, ${date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`
  }

  // Otherwise, show the date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function UpcomingPosts({ initialPosts = [] }) {
  const [posts, setPosts] = useState(initialPosts)
  const router = useRouter()

  const handleDeletePost = async (postId: string) => {
    try {
      await deletePost(postId)
      setPosts(posts.filter((post) => post.id !== postId))
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No upcoming posts scheduled</p>
        <Button className="mt-4" asChild>
          <Link href="/create-post">Create your first post</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="flex items-start gap-4 rounded-lg border p-3">
          {post.post_media && post.post_media[0]?.media?.url && (
            <img
              src={post.post_media[0].media.url || "/placeholder.svg"}
              alt="Post preview"
              className="h-10 w-10 rounded object-cover"
            />
          )}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              {post.post_platforms &&
                post.post_platforms[0]?.social_account?.platform &&
                getPlatformIcon(post.post_platforms[0].social_account.platform)}
              <span className="text-xs font-medium capitalize">
                {(post.post_platforms && post.post_platforms[0]?.social_account?.platform) || "Unknown"}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">{formatScheduledDate(post.scheduled_at)}</span>
            </div>
            <p className="text-sm line-clamp-2">{post.content}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/edit-post/${post.id}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/reschedule/${post.id}`}>Reschedule</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => handleDeletePost(post.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </div>
  )
}
