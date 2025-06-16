"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, BarChart, Users, Share2 } from "lucide-react"

interface AnalyticsOverviewProps {
  data: {
    totalPosts: number
    totalEngagement: number
    totalImpressions: number
    totalReach: number
  }
}

export function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <Share2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalPosts}</div>
          <p className="text-xs text-muted-foreground">Published posts</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalEngagement.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Likes, comments, shares</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Impressions</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalImpressions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Total views</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Reach</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalReach.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Unique viewers</p>
        </CardContent>
      </Card>
    </div>
  )
}
