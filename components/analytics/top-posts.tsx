"use client"

import { Facebook, Instagram, Twitter, ThumbsUp, MessageCircle, Share } from "lucide-react"

interface TopPost {
  id: string
  content: string
  platform: string
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  published_at: string
}

interface TopPostsProps {
  posts: TopPost[]
}

export function TopPosts({ posts }: TopPostsProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            {getPlatformIcon(post.platform)}
            <span className="text-xs font-medium capitalize">{post.platform}</span>
            <span className="text-xs text-muted-foreground ml-auto">{formatDate(post.published_at)}</span>
          </div>
          <p className="text-sm line-clamp-2 mb-2">{post.content}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              <span>{post.engagement.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              <span>{post.engagement.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share className="h-3 w-3" />
              <span>{post.engagement.shares}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
