"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Heart, MessageCircle, Share2, Eye, Calendar, Clock, Target, Zap } from "lucide-react"

export function ContentInsights() {
  const insights = [
    {
      title: "Best Time to Post",
      value: "9:00 AM - 11:00 AM",
      description: "Highest engagement rate",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Best Day to Post",
      value: "Tuesday",
      description: "35% increase in reach",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Best Content Type",
      value: "Short Videos",
      description: "18.5% engagement rate",
      icon: Zap,
      color: "text-purple-600",
    },
  ]

  const platformStats = [
    { platform: "Instagram", followers: 12500, growth: 8.5, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { platform: "LinkedIn", followers: 8200, growth: 12.3, color: "bg-blue-600" },
    { platform: "Twitter", followers: 15600, growth: 5.7, color: "bg-sky-500" },
    { platform: "Facebook", followers: 9800, growth: 3.2, color: "bg-blue-700" },
  ]

  const weeklyStats = [
    { day: "Sunday", posts: 3, engagement: 85 },
    { day: "Monday", posts: 2, engagement: 92 },
    { day: "Tuesday", posts: 4, engagement: 78 },
    { day: "Wednesday", posts: 3, engagement: 88 },
    { day: "Thursday", posts: 2, engagement: 95 },
    { day: "Friday", posts: 1, engagement: 72 },
    { day: "Saturday", posts: 2, engagement: 80 },
  ]

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">2.4K</div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <Eye className="h-3 w-3" />
                Views Today
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">186</div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <Heart className="h-3 w-3" />
                New Likes
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">42</div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <MessageCircle className="h-3 w-3" />
                Comments
              </div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-orange-600">28</div>
              <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                <Share2 className="h-3 w-3" />
                Shares
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Insights */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-green-600" />
            Content Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg bg-white ${insight.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{insight.title}</div>
                  <div className="font-bold text-lg">{insight.value}</div>
                  <div className="text-xs text-gray-600">{insight.description}</div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Platform Performance */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-purple-600" />
            Platform Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {platformStats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{stat.platform}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{stat.followers.toLocaleString()}</span>
                  <Badge variant="secondary" className="text-xs">
                    +{stat.growth}%
                  </Badge>
                </div>
              </div>
              <Progress value={stat.growth * 5} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyStats.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{day.day}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600">{day.posts} posts</span>
                  <div className="w-16">
                    <Progress value={day.engagement} className="h-2" />
                  </div>
                  <span className="text-xs font-medium w-8">{day.engagement}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
