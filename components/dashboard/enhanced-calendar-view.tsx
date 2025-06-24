"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PostTemplates } from "./post-templates"
import { ContentInsights } from "./content-insights"
import { QuickActions } from "./quick-actions"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Video,
  ImageIcon,
  FileText,
  Clock,
  CalendarIcon,
} from "lucide-react"
import { format } from "date-fns"

interface Post {
  id: string
  content: string
  scheduled_at: string | null
  status: string
  type: "text" | "image" | "video" | "reel" | "story"
  platform: string
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: "1",
    content: "Tips for improving workplace productivity 💼✨",
    scheduled_at: new Date().toISOString(),
    status: "scheduled",
    type: "image",
    platform: "linkedin",
    engagement: { likes: 45, comments: 12, shares: 8 },
  },
  {
    id: "2",
    content: "Tutorial video: How to use AI in your workflow",
    scheduled_at: new Date(Date.now() + 86400000).toISOString(),
    status: "scheduled",
    type: "video",
    platform: "youtube",
  },
  {
    id: "3",
    content: "New Reel: Best practices in digital marketing",
    scheduled_at: new Date(Date.now() + 172800000).toISOString(),
    status: "scheduled",
    type: "reel",
    platform: "instagram",
  },
  {
    id: "4",
    content: "Quick update about our new project 🚀",
    scheduled_at: new Date(Date.now() + 259200000).toISOString(),
    status: "draft",
    type: "text",
    platform: "twitter",
  },
]

const getPlatformIcon = (platform: string) => {
  const iconClass = "h-4 w-4"
  switch (platform) {
    case "instagram":
      return <Instagram className={iconClass} />
    case "facebook":
      return <Facebook className={iconClass} />
    case "twitter":
      return <Twitter className={iconClass} />
    case "linkedin":
      return <Linkedin className={iconClass} />
    case "youtube":
      return <Youtube className={iconClass} />
    default:
      return <FileText className={iconClass} />
  }
}

const getTypeIcon = (type: string) => {
  const iconClass = "h-4 w-4"
  switch (type) {
    case "video":
      return <Video className={iconClass} />
    case "reel":
      return <Video className={iconClass} />
    case "image":
      return <ImageIcon className={iconClass} />
    default:
      return <FileText className={iconClass} />
  }
}

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "instagram":
      return "bg-gradient-to-r from-purple-500 to-pink-500"
    case "facebook":
      return "bg-blue-600"
    case "twitter":
      return "bg-sky-500"
    case "linkedin":
      return "bg-blue-700"
    case "youtube":
      return "bg-red-600"
    default:
      return "bg-gray-500"
  }
}

export function EnhancedCalendarView() {
  const [posts, setPosts] = useState<Post[]>([])
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and set mock data
    const timer = setTimeout(() => {
      setPosts(mockPosts)
      setDate(new Date())
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Filter posts for the selected date
  const postsForSelectedDate = posts.filter((post) => {
    if (!date || !post.scheduled_at) return false
    try {
      const postDate = new Date(post.scheduled_at)
      if (isNaN(postDate.getTime())) return false

      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      )
    } catch (error) {
      console.error("Error parsing date:", error)
      return false
    }
  })

  // Function to check if a date has posts
  const hasPostsOnDate = (checkDate: Date) => {
    if (!checkDate) return false

    return posts.some((post) => {
      if (!post.scheduled_at) return false
      try {
        const postDate = new Date(post.scheduled_at)
        if (isNaN(postDate.getTime())) return false

        return (
          postDate.getDate() === checkDate.getDate() &&
          postDate.getMonth() === checkDate.getMonth() &&
          postDate.getFullYear() === checkDate.getFullYear()
        )
      } catch (error) {
        console.error("Error checking date:", error)
        return false
      }
    })
  }

  const getPostCountForDate = (checkDate: Date) => {
    if (!checkDate) return 0

    return posts.filter((post) => {
      if (!post.scheduled_at) return false
      try {
        const postDate = new Date(post.scheduled_at)
        if (isNaN(postDate.getTime())) return false

        return (
          postDate.getDate() === checkDate.getDate() &&
          postDate.getMonth() === checkDate.getMonth() &&
          postDate.getFullYear() === checkDate.getFullYear()
        )
      } catch (error) {
        console.error("Error counting posts:", error)
        return false
      }
    }).length
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar and Templates - 3 columns */}
        <div className="lg:col-span-3 space-y-6">
          {/* Calendar Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Interactive Calendar
              </CardTitle>
              <CardDescription>View and manage all your scheduled posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Calendar */}
                <div className="space-y-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl border shadow-sm"
                    modifiers={{
                      booked: (checkDate) => hasPostsOnDate(checkDate),
                    }}
                    modifiersStyles={{
                      booked: {
                        fontWeight: "bold",
                        backgroundColor: "hsl(var(--primary) / 0.1)",
                        color: "hsl(var(--primary))",
                      },
                    }}
                    components={{
                      DayContent: ({ date: dayDate }) => {
                        if (!dayDate) return <span>-</span>

                        return (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <span>{dayDate.getDate()}</span>
                            {hasPostsOnDate(dayDate) && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-xs text-white font-bold">{getPostCountForDate(dayDate)}</span>
                              </div>
                            )}
                          </div>
                        )
                      },
                    }}
                  />

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    <Card className="p-3 text-center border-0 bg-blue-50">
                      <div className="text-2xl font-bold text-blue-600">
                        {posts.filter((p) => p.status === "scheduled").length}
                      </div>
                      <div className="text-xs text-blue-600">Scheduled</div>
                    </Card>
                    <Card className="p-3 text-center border-0 bg-green-50">
                      <div className="text-2xl font-bold text-green-600">
                        {posts.filter((p) => p.status === "published").length}
                      </div>
                      <div className="text-xs text-green-600">Published</div>
                    </Card>
                    <Card className="p-3 text-center border-0 bg-orange-50">
                      <div className="text-2xl font-bold text-orange-600">
                        {posts.filter((p) => p.status === "draft").length}
                      </div>
                      <div className="text-xs text-orange-600">Drafts</div>
                    </Card>
                  </div>
                </div>

                {/* Posts for Selected Date */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">
                      {date ? format(date, "EEEE, MMMM d, yyyy") : "Select a date"}
                    </h3>
                    {postsForSelectedDate.length > 0 && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {postsForSelectedDate.length} post{postsForSelectedDate.length !== 1 ? "s" : ""}
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {postsForSelectedDate.length > 0 ? (
                      postsForSelectedDate.map((post) => (
                        <Card key={post.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              {/* Platform & Type Icons */}
                              <div className="flex flex-col gap-1">
                                <div className={`p-2 rounded-lg text-white ${getPlatformColor(post.platform)}`}>
                                  {getPlatformIcon(post.platform)}
                                </div>
                                <div className="p-1 rounded bg-gray-100 text-gray-600">{getTypeIcon(post.type)}</div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge
                                    variant={post.status === "scheduled" ? "default" : "secondary"}
                                    className="text-xs"
                                  >
                                    {post.status}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {post.type}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                                    <Clock className="h-3 w-3" />
                                    {post.scheduled_at && format(new Date(post.scheduled_at), "HH:mm")}
                                  </div>
                                </div>

                                <p className="text-sm text-gray-700 line-clamp-2 mb-2">{post.content}</p>

                                {/* Engagement Stats */}
                                {post.engagement && (
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>👍 {post.engagement.likes}</span>
                                    <span>💬 {post.engagement.comments}</span>
                                    <span>🔄 {post.engagement.shares}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card className="border-2 border-dashed border-gray-200 bg-gray-50/50">
                        <CardContent className="p-8 text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <Clock className="h-8 w-8 text-gray-400" />
                          </div>
                          <h3 className="font-medium text-gray-900 mb-2">No posts scheduled for this date</h3>
                          <p className="text-sm text-gray-500 mb-4">Start by creating a new post for this day</p>
                          <Button size="sm">Create Post</Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates Section */}
          <PostTemplates />
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          <ContentInsights />
        </div>
      </div>
    </div>
  )
}
