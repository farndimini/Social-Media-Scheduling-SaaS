import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpcomingPosts } from "@/components/upcoming-posts"
import { AccountsOverview } from "@/components/accounts-overview"
import { PerformanceStats } from "@/components/performance-stats"
import { Share2, Clock, LineChart } from "lucide-react"
import { getUpcomingPosts } from "@/lib/actions/posts"
import { getSocialAccounts } from "@/lib/actions/social-accounts"

export default async function DashboardPage() {
  // Fetch data for the dashboard
  const upcomingPosts = await getUpcomingPosts().catch(() => [])
  const socialAccounts = await getSocialAccounts().catch(() => [])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingPosts.length}</div>
                <p className="text-xs text-muted-foreground">Scheduled posts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingPosts.filter((p) => p.status === "scheduled").length}</div>
                <p className="text-xs text-muted-foreground">Upcoming posts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Data not available yet</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{socialAccounts.filter((a) => a.is_active).length}</div>
                <p className="text-xs text-muted-foreground">Connected platforms</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Posts</CardTitle>
                <CardDescription>Your scheduled posts for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingPosts initialPosts={upcomingPosts} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your social media accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <AccountsOverview initialAccounts={socialAccounts} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your social media performance across all platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <PerformanceStats />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
