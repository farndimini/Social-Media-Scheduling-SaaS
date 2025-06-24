"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { PostTemplates } from "./post-templates"
import { ContentInsights } from "./content-insights"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  Plus,
  BarChart3,
  LayoutTemplateIcon as Template,
  Clock,
  CheckCircle,
  FileText,
  Video,
  ImageIcon as Image,
  Zap,
} from "lucide-react"

interface ScheduledPost {
  id: string
  title: string
  platform: string
  type: "text" | "image" | "video" | "reel"
  scheduledFor: Date
  status: "scheduled" | "published" | "draft"
}

const mockPosts: ScheduledPost[] = [
  {
    id: "1",
    title: "Morning motivation post",
    platform: "Instagram",
    type: "text",
    scheduledFor: new Date(2024, 0, 15, 9, 0),
    status: "scheduled",
  },
  {
    id: "2",
    title: "Product showcase video",
    platform: "Facebook",
    type: "video",
    scheduledFor: new Date(2024, 0, 15, 14, 30),
    status: "scheduled",
  },
  {
    id: "3",
    title: "Educational reel",
    platform: "Instagram",
    type: "reel",
    scheduledFor: new Date(2024, 0, 16, 11, 0),
    status: "draft",
  },
]

export function EnhancedCalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("calendar")

  const getPostsForDate = (date: Date) => {
    return mockPosts.filter(
      (post) =>
        post.scheduledFor.getDate() === date.getDate() &&
        post.scheduledFor.getMonth() === date.getMonth() &&
        post.scheduledFor.getFullYear() === date.getFullYear(),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "published":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return FileText
      case "image":
        return Image
      case "video":
        return Video
      case "reel":
        return Zap
      default:
        return FileText
    }
  }

  const totalScheduled = mockPosts.filter((p) => p.status === "scheduled").length
  const totalPublished = mockPosts.filter((p) => p.status === "published").length
  const totalDrafts = mockPosts.filter((p) => p.status === "draft").length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{totalScheduled}</div>
                <div className="text-sm text-gray-600">Scheduled</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{totalPublished}</div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">{totalDrafts}</div>
                <div className="text-sm text-gray-600">Drafts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">8.5%</div>
                <div className="text-sm text-gray-600">Avg Engagement</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Template className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Content Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                  components={{
                    Day: ({ date, ...props }) => {
                      const postsForDay = getPostsForDate(date)
                      return (
                        <div className="relative">
                          <button {...props} className="w-full h-full">
                            {date.getDate()}
                            {postsForDay.length > 0 && (
                              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {postsForDay.length}
                              </div>
                            )}
                          </button>
                        </div>
                      )
                    },
                  }}
                />
              </CardContent>
            </Card>

            {/* Selected Date Posts */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedDate ? (
                  getPostsForDate(selectedDate).length > 0 ? (
                    getPostsForDate(selectedDate).map((post) => {
                      const TypeIcon = getTypeIcon(post.type)
                      return (
                        <div key={post.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                          <div className="flex items-center gap-2">
                            <TypeIcon className="h-4 w-4 text-gray-600" />
                            <span className="font-medium text-sm">{post.title}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">{post.platform}</span>
                            <Badge className={`text-xs ${getStatusColor(post.status)}`}>{post.status}</Badge>
                          </div>
                          <div className="text-xs text-gray-500">
                            {post.scheduledFor.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 mb-2">No posts scheduled</div>
                      <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Post
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8 text-gray-400">Select a date to view posts</div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <PostTemplates />
        </TabsContent>

        <TabsContent value="insights">
          <ContentInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
