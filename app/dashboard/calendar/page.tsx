import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { PostTemplates } from "@/components/dashboard/post-templates"
import { ContentInsights } from "@/components/dashboard/content-insights"
import { QuickActions } from "@/components/dashboard/quick-actions"

export const dynamic = "force-dynamic"

export default async function CalendarPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          تقويم المحتوى
        </h1>
        <p className="text-muted-foreground text-lg">
          خطط وأدر منشوراتك على جميع منصات التواصل الاجتماعي بطريقة احترافية
        </p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Calendar Section - Takes 3 columns */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">التقويم التفاعلي</CardTitle>
                  <CardDescription>عرض شامل لجميع منشوراتك المجدولة</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-muted-foreground">مجدول</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-muted-foreground">منشور</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-xs text-muted-foreground">مسودة</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CalendarView initialPosts={[]} />
            </CardContent>
          </Card>

          {/* Content Templates */}
          <PostTemplates />
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          <ContentInsights />
        </div>
      </div>
    </div>
  )
}
