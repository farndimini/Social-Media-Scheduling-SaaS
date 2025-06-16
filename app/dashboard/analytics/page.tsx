import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { EngagementChart } from "@/components/analytics/engagement-chart"
import { PlatformPerformance } from "@/components/analytics/platform-performance"
import { TopPosts } from "@/components/analytics/top-posts"
import { getAnalyticsData } from "@/lib/actions/analytics"

export default async function AnalyticsPage() {
  const analyticsData = await getAnalyticsData().catch(() => ({
    overview: {
      totalPosts: 0,
      totalEngagement: 0,
      totalImpressions: 0,
      totalReach: 0,
    },
    engagementData: [],
    platformPerformance: [],
    topPosts: [],
  }))

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <p className="text-muted-foreground">Track your social media performance</p>

      <AnalyticsOverview data={analyticsData.overview} />

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
            <CardDescription>Track your engagement metrics across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <EngagementChart data={analyticsData.engagementData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
            <CardDescription>Compare performance across different platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <PlatformPerformance data={analyticsData.platformPerformance} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your most engaging content</CardDescription>
          </CardHeader>
          <CardContent>
            <TopPosts posts={analyticsData.topPosts} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
