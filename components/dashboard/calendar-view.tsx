"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Twitter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { format } from "date-fns"

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

interface CalendarViewProps {
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

export function CalendarView({ initialPosts }: CalendarViewProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const router = useRouter()

  // Filter posts for the selected date
  const postsForSelectedDate = posts.filter((post) => {
    if (!date || !post.scheduled_at) return false

    const postDate = new Date(post.scheduled_at)
    return (
      postDate.getDate() === date.getDate() &&
      postDate.getMonth() === date.getMonth() &&
      postDate.getFullYear() === date.getFullYear()
    )
  })

  const handleDeletePost = async (postId: string) => {
    try {
      const supabase = createClient()
      await supabase.from("posts").delete().eq("id", postId)

      // Update local state
      setPosts(posts.filter((post) => post.id !== postId))
      router.refresh()
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  // Function to check if a date has posts
  const hasPostsOnDate = (date: Date) => {
    return posts.some((post) => {
      if (!post.scheduled_at) return false

      const postDate = new Date(post.scheduled_at)
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      )
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            booked: (date) => hasPostsOnDate(date),
          }}
          modifiersStyles={{
            booked: { fontWeight: "bold", backgroundColor: "hsl(var(--primary) / 0.1)" },
          }}
        />
      </div>
      <div>
        <h3 className="font-medium mb-4">{date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}</h3>
        {postsForSelectedDate.length > 0 ? (
          <div className="space-y-3">
            {postsForSelectedDate.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {post.post_platforms &&
                      post.post_platforms.map(
                        (platform) =>
                          platform.social_account && (
                            <span key={platform.id}>{getPlatformIcon(platform.social_account.platform)}</span>
                          ),
                      )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {post.scheduled_at && format(new Date(post.scheduled_at), "h:mm a")}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/edit-post/${post.id}`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeletePost(post.id)} className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-md">
            <p className="text-muted-foreground">No posts scheduled for this date</p>
            <Button className="mt-4" size="sm" onClick={() => router.push("/create-post")}>
              Create Post
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
