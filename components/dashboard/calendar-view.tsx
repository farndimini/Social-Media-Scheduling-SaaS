"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MoreHorizontal,
  Video,
  ImageIcon,
  FileText,
  Clock,
  Eye,
  Edit,
  Trash2,
  Copy,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

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

interface CalendarViewProps {
  initialPosts: Post[]
}

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: "1",
    content: "نصائح لتحسين الإنتاجية في العمل 💼✨",
    scheduled_at: new Date().toISOString(),
    status: "scheduled",
    type: "image",
    platform: "linkedin",
    engagement: { likes: 45, comments: 12, shares: 8 },
  },
  {
    id: "2",
    content: "فيديو تعليمي: كيفية استخدام الذكاء الاصطناعي",
    scheduled_at: new Date(Date.now() + 86400000).toISOString(),
    status: "scheduled",
    type: "video",
    platform: "youtube",
  },
  {
    id: "3",
    content: "ريل جديد: أفضل الممارسات في التسويق الرقمي",
    scheduled_at: new Date(Date.now() + 172800000).toISOString(),
    status: "scheduled",
    type: "reel",
    platform: "instagram",
  },
  {
    id: "4",
    content: "تحديث سريع عن مشروعنا الجديد 🚀",
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

export function CalendarView({ initialPosts }: CalendarViewProps) {
  const [posts] = useState<Post[]>(mockPosts)
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

  const getPostCountForDate = (date: Date) => {
    return posts.filter((post) => {
      if (!post.scheduled_at) return false
      const postDate = new Date(post.scheduled_at)
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      )
    }).length
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Calendar */}
      <div className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-xl border-0 shadow-sm bg-white"
          locale={ar}
          modifiers={{
            booked: (date) => hasPostsOnDate(date),
          }}
          modifiersStyles={{
            booked: {
              fontWeight: "bold",
              backgroundColor: "hsl(var(--primary) / 0.1)",
              color: "hsl(var(--primary))",
            },
          }}
          components={{
            DayContent: ({ date: dayDate }) => (
              <div className="relative w-full h-full flex items-center justify-center">
                <span>{dayDate.getDate()}</span>
                {hasPostsOnDate(dayDate) && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{getPostCountForDate(dayDate)}</span>
                  </div>
                )}
              </div>
            ),
          }}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-3 text-center border-0 bg-blue-50">
            <div className="text-2xl font-bold text-blue-600">
              {posts.filter((p) => p.status === "scheduled").length}
            </div>
            <div className="text-xs text-blue-600">مجدول</div>
          </Card>
          <Card className="p-3 text-center border-0 bg-green-50">
            <div className="text-2xl font-bold text-green-600">
              {posts.filter((p) => p.status === "published").length}
            </div>
            <div className="text-xs text-green-600">منشور</div>
          </Card>
          <Card className="p-3 text-center border-0 bg-orange-50">
            <div className="text-2xl font-bold text-orange-600">{posts.filter((p) => p.status === "draft").length}</div>
            <div className="text-xs text-orange-600">مسودة</div>
          </Card>
        </div>
      </div>

      {/* Posts for Selected Date */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            {date ? format(date, "EEEE، d MMMM yyyy", { locale: ar }) : "اختر تاريخاً"}
          </h3>
          {postsForSelectedDate.length > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {postsForSelectedDate.length} منشور
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
                        <Badge variant={post.status === "scheduled" ? "default" : "secondary"} className="text-xs">
                          {post.status === "scheduled" ? "مجدول" : "مسودة"}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {post.type === "reel"
                            ? "ريل"
                            : post.type === "video"
                              ? "فيديو"
                              : post.type === "image"
                                ? "صورة"
                                : "نص"}
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

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => router.push(`/create-post?edit=${post.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />
                          معاينة
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/create-post?edit=${post.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          نسخ
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                <h3 className="font-medium text-gray-900 mb-2">لا توجد منشورات في هذا التاريخ</h3>
                <p className="text-sm text-gray-500 mb-4">ابدأ بإنشاء منشور جديد لهذا اليوم</p>
                <Button onClick={() => router.push("/create-post")} size="sm">
                  إنشاء منشور
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
