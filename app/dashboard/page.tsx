"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  Brain,
  Activity,
  Users,
  Calendar,
  BarChart3,
  Eye,
  MessageSquare,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface AnomalyAlert {
  id: string
  type: "warning" | "critical" | "info"
  title: string
  description: string
  action?: string
  timestamp: Date
}

interface NextBestAction {
  id: string
  title: string
  description: string
  impact: string
  urgency: "high" | "medium" | "low"
  action: () => void
}

export default function Dashboard() {
  const router = useRouter()
  const [anomalyAlerts, setAnomalyAlerts] = useState<AnomalyAlert[]>([
    {
      id: "1",
      type: "warning",
      title: "Unusual Engagement Drop",
      description: "Instagram posts showing 23% lower engagement than predicted",
      action: "Review Content Strategy",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "info",
      title: "Trending Opportunity",
      description: "#TechInnovation trending - 3 scheduled posts could benefit",
      action: "Optimize Posts",
      timestamp: new Date(),
    },
  ])

  const [nextBestActions, setNextBestActions] = useState<NextBestAction[]>([
    {
      id: "1",
      title: "Review LinkedIn Post",
      description: "Scheduled for 2 PM - predicted engagement: +47%",
      impact: "+47% engagement",
      urgency: "high",
      action: () => router.push("/dashboard/queue"),
    },
    {
      id: "2",
      title: "Connect YouTube Channel",
      description: "Unlock video content optimization",
      impact: "New platform reach",
      urgency: "medium",
      action: () => router.push("/dashboard/integrations"),
    },
    {
      id: "3",
      title: "Optimize Video for Reels",
      description: "Convert existing video to Instagram Reels format",
      impact: "+156% reach potential",
      urgency: "high",
      action: () => router.push("/dashboard/media"),
    },
  ])

  const [performanceSnapshot, setPerformanceSnapshot] = useState({
    topPerformer: {
      platform: "LinkedIn",
      content: "AI in Marketing: 5 Game-Changing Trends",
      engagement: 2847,
      growth: "+234%",
    },
    todayMetrics: {
      posts: 12,
      scheduled: 8,
      engagement: 1234,
      reach: 5678,
    },
    weeklyGrowth: {
      engagement: 15.3,
      reach: 8.7,
      followers: 12.1,
    },
  })

  const [aiEngineStatus, setAiEngineStatus] = useState({
    pcoe: { active: true, performance: 98 },
    osm: { active: true, performance: 96 },
    acg: { active: false, performance: 87 },
    rcmm: { active: true, performance: 94 },
    cpes: { active: true, performance: 91 },
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceSnapshot((prev) => ({
        ...prev,
        todayMetrics: {
          ...prev.todayMetrics,
          engagement: prev.todayMetrics.engagement + Math.floor(Math.random() * 10),
          reach: prev.todayMetrics.reach + Math.floor(Math.random() * 50),
        },
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header with AI Status */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Command Nexus
          </h1>
          <p className="text-gray-600 mt-1">SHADOWHACKER-DOMINION Intelligence Dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-100 text-green-800 px-3 py-1">
            <Activity className="w-4 h-4 mr-1" />
            AI Systems Online
          </Badge>
          <Button
            onClick={() => router.push("/dashboard/ai-command-center")}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Brain className="w-4 h-4 mr-2" />
            AI Command Center
          </Button>
        </div>
      </div>

      {/* Predictive Anomaly Detection */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Predictive Anomaly Detection</span>
            <Badge className="bg-orange-100 text-orange-800">{anomalyAlerts.length} Active</Badge>
          </CardTitle>
          <CardDescription>Real-time alerts for unusual patterns and opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {anomalyAlerts.map((alert) => (
            <Alert
              key={alert.id}
              className={`border-l-4 ${alert.type === "critical" ? "border-l-red-500" : alert.type === "warning" ? "border-l-orange-500" : "border-l-blue-500"}`}
            >
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-gray-600">{alert.description}</p>
                  </div>
                  {alert.action && (
                    <Button size="sm" variant="outline">
                      {alert.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Dynamic Performance Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Dynamic Performance Snapshot</span>
            </CardTitle>
            <CardDescription>Real-time performance metrics and top performers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{performanceSnapshot.todayMetrics.posts}</div>
                <div className="text-sm text-gray-600">Total Posts</div>
                <div className="text-xs text-green-600">+2 from last week</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{performanceSnapshot.todayMetrics.scheduled}</div>
                <div className="text-sm text-gray-600">Scheduled</div>
                <div className="text-xs text-blue-600">Next in 2 hours</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600">
                  {performanceSnapshot.todayMetrics.engagement.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Engagement</div>
                <div className="text-xs text-green-600">+{performanceSnapshot.weeklyGrowth.engagement}% this week</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600">
                  {performanceSnapshot.todayMetrics.reach.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Reach</div>
                <div className="text-xs text-green-600">+{performanceSnapshot.weeklyGrowth.reach}% this week</div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                Today's Top Performer
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{performanceSnapshot.topPerformer.content}</p>
                  <p className="text-sm text-gray-600">{performanceSnapshot.topPerformer.platform}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {performanceSnapshot.topPerformer.engagement.toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">{performanceSnapshot.topPerformer.growth}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Engine Status */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>AI Engine Status</span>
            </CardTitle>
            <CardDescription>SHADOWHACKER-GOD system performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(aiEngineStatus).map(([key, engine]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${engine.active ? "bg-green-500" : "bg-gray-400"}`} />
                  <span className="font-medium text-sm">{key.toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{engine.performance}%</div>
                  <Progress value={engine.performance} className="w-16 h-1" />
                </div>
              </div>
            ))}
            <Button
              onClick={() => router.push("/dashboard/ai-command-center")}
              className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600"
            >
              View Full Command Center
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Next Best Action Module */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-600" />
            <span>Next Best Action</span>
            <Badge className="bg-green-100 text-green-800">AI Recommended</Badge>
          </CardTitle>
          <CardDescription>AI-powered suggestions for maximum impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nextBestActions.map((action) => (
              <div key={action.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-l-green-500">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{action.title}</h4>
                  <Badge className={`text-xs ${getUrgencyColor(action.urgency)}`}>{action.urgency}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                <p className="text-xs text-green-600 font-medium mb-3">{action.impact}</p>
                <Button size="sm" onClick={action.action} className="w-full">
                  Take Action
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Workflow Shortcuts */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            <span>Personalized Workflow Shortcuts</span>
          </CardTitle>
          <CardDescription>Adaptive shortcuts based on your usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { icon: Plus, label: "Create Post", action: () => router.push("/create-post"), color: "bg-blue-500" },
              {
                icon: Calendar,
                label: "Schedule",
                action: () => router.push("/dashboard/calendar"),
                color: "bg-green-500",
              },
              {
                icon: BarChart3,
                label: "Analytics",
                action: () => router.push("/dashboard/analytics"),
                color: "bg-purple-500",
              },
              { icon: Eye, label: "Queue", action: () => router.push("/dashboard/queue"), color: "bg-orange-500" },
              {
                icon: MessageSquare,
                label: "Engage",
                action: () => router.push("/dashboard/ai-command-center"),
                color: "bg-pink-500",
              },
              {
                icon: Users,
                label: "Connect",
                action: () => router.push("/dashboard/integrations"),
                color: "bg-indigo-500",
              },
            ].map((shortcut, index) => (
              <Button
                key={index}
                onClick={shortcut.action}
                className={`h-20 flex flex-col items-center justify-center space-y-2 ${shortcut.color} hover:opacity-90 transition-all duration-200 hover:scale-105`}
              >
                <shortcut.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{shortcut.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
