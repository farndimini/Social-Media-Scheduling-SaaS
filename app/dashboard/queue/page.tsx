"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QueueView } from "@/components/dashboard/queue-view"
import { createClient } from "@/lib/supabase/client"

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

export default function QueuePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient()

        // Get the current user session
        const {
          data: { session: userSession },
        } = await supabase.auth.getSession()
        setSession(userSession)

        // For demo purposes, create some mock posts if user is logged in
        if (userSession) {
          const mockPosts: Post[] = [
            {
              id: "post-1",
              content:
                "🚀 Excited to share our latest product update! Check out the new features we've been working on.",
              scheduled_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
              status: "scheduled",
              post_platforms: [
                {
                  id: "platform-1",
                  social_account: { platform: "twitter" },
                },
                {
                  id: "platform-2",
                  social_account: { platform: "linkedin" },
                },
              ],
            },
            {
              id: "post-2",
              content:
                "📊 Weekly analytics report: Our engagement is up 25% this week! Thanks to our amazing community.",
              scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
              status: "scheduled",
              post_platforms: [
                {
                  id: "platform-3",
                  social_account: { platform: "facebook" },
                },
              ],
            },
            {
              id: "post-3",
              content: "Working on some exciting new content. Stay tuned for updates!",
              scheduled_at: null,
              status: "draft",
              post_platforms: [],
            },
          ]
          setPosts(mockPosts)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Content Queue</h1>
        <p className="text-muted-foreground">Loading your posts...</p>
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Posts</CardTitle>
            <CardDescription>View and manage your upcoming posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
          <QueueView initialPosts={posts} />
        </CardContent>
      </Card>
    </div>
  )
}
