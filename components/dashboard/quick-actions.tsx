"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, Video, FileText, Calendar, Zap, Instagram, Youtube } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Text Post",
      icon: FileText,
      color: "bg-blue-500 hover:bg-blue-600",
      onClick: () => router.push("/create-post?type=text"),
    },
    {
      title: "Image Post",
      icon: ImageIcon,
      color: "bg-green-500 hover:bg-green-600",
      onClick: () => router.push("/create-post?type=image"),
    },
    {
      title: "Video Post",
      icon: Video,
      color: "bg-purple-500 hover:bg-purple-600",
      onClick: () => router.push("/create-video-post"),
    },
    {
      title: "Instagram Reel",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      onClick: () => router.push("/create-video-post?type=reel"),
    },
    {
      title: "YouTube Short",
      icon: Youtube,
      color: "bg-red-500 hover:bg-red-600",
      onClick: () => router.push("/create-video-post?type=short"),
    },
    {
      title: "Schedule Later",
      icon: Calendar,
      color: "bg-orange-500 hover:bg-orange-600",
      onClick: () => router.push("/create-post?schedule=true"),
    },
  ]

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold text-lg">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`h-auto p-4 flex flex-col items-center gap-2 text-white ${action.color} transition-all duration-200 hover:scale-105`}
              onClick={action.onClick}
            >
              <action.icon className="h-6 w-6" />
              <span className="text-xs font-medium text-center">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
