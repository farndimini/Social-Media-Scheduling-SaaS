"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Video, ImageIcon, FileText, Calendar, Zap, TrendingUp, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "منشور نصي",
      description: "إنشاء منشور نصي سريع",
      icon: FileText,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => router.push("/create-post?type=text"),
    },
    {
      title: "منشور بصورة",
      description: "إضافة صورة مع النص",
      icon: ImageIcon,
      color: "bg-green-500 hover:bg-green-600",
      action: () => router.push("/create-post?type=image"),
    },
    {
      title: "فيديو/ريل",
      description: "إنشاء محتوى فيديو",
      icon: Video,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => router.push("/create-video-post"),
    },
    {
      title: "جدولة متقدمة",
      description: "جدولة متعددة المنصات",
      icon: Calendar,
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => router.push("/dashboard/queue"),
    },
  ]

  const quickStats = [
    { label: "منشورات اليوم", value: "8", icon: Zap, color: "text-blue-600" },
    { label: "معدل التفاعل", value: "12.5%", icon: TrendingUp, color: "text-green-600" },
    { label: "متابعين جدد", value: "+24", icon: Users, color: "text-purple-600" },
  ]

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-0 shadow-sm bg-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">إجراءات سريعة</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {actions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-auto p-4 flex flex-col items-center gap-2 border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200 ${action.color} text-white hover:text-white`}
                  onClick={action.action}
                >
                  <Icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
