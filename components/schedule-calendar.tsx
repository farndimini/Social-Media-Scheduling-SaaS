"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function ScheduleCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Sample scheduled posts data
  const scheduledPosts = [
    {
      id: 1,
      date: new Date(2025, 3, 29),
      platform: "instagram",
      content: "Check out our new product launch! #NewProduct",
    },
    {
      id: 2,
      date: new Date(2025, 3, 29),
      platform: "facebook",
      content: "Excited to announce our latest feature release!",
    },
    {
      id: 3,
      date: new Date(2025, 3, 30),
      platform: "twitter",
      content: "Join our webinar tomorrow at 2 PM EST. Register now!",
    },
    {
      id: 4,
      date: new Date(2025, 4, 1),
      platform: "instagram",
      content: "Behind the scenes look at our team retreat #TeamBuilding",
    },
    {
      id: 5,
      date: new Date(2025, 4, 2),
      platform: "facebook",
      content: "Customer spotlight: See how ABC Corp increased sales by 200%",
    },
  ]

  // Filter posts for the selected date
  const postsForSelectedDate = scheduledPosts.filter(
    (post) =>
      date &&
      post.date.getDate() === date.getDate() &&
      post.date.getMonth() === date.getMonth() &&
      post.date.getFullYear() === date.getFullYear(),
  )

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

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
      </div>
      <div>
        <h3 className="font-medium mb-4">
          {date
            ? date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
            : "Select a date"}
        </h3>
        {postsForSelectedDate.length > 0 ? (
          <div className="space-y-3">
            {postsForSelectedDate.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getPlatformIcon(post.platform)}
                    <span className="text-sm font-medium capitalize">{post.platform}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {post.date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-sm">{post.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-md">
            <p className="text-muted-foreground">No posts scheduled for this date</p>
          </div>
        )}
      </div>
    </div>
  )
}
