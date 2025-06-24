"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Zap,
  Shield,
  Globe,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Cpu,
  Database,
} from "lucide-react"

interface EngineStatus {
  id: string
  name: string
  description: string
  icon: any
  isActive: boolean
  performance: number
  gradient: string
  stats: {
    label: string
    value: string | number
  }[]
}

export default function AICommandCenter() {
  const [engines, setEngines] = useState<EngineStatus[]>([
    {
      id: "pcoe",
      name: "PCOE",
      description: "Predictive Content Optimization Engine",
      icon: Brain,
      isActive: true,
      performance: 98,
      gradient: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Prediction Accuracy", value: "98%" },
        { label: "Content Analyzed", value: "1,247" },
        { label: "Optimal Times Found", value: "47" },
      ],
    },
    {
      id: "osm",
      name: "OSM",
      description: "Omnichannel Synchronicity Matrix",
      icon: Globe,
      isActive: true,
      performance: 96,
      gradient: "from-purple-500 to-pink-500",
      stats: [
        { label: "Success Rate", value: "96%" },
        { label: "Platforms Connected", value: "8" },
        { label: "Synced Posts", value: "342" },
      ],
    },
    {
      id: "acg",
      name: "ACG",
      description: "Autonomous Content Generation",
      icon: Zap,
      isActive: false,
      performance: 87,
      gradient: "from-green-500 to-emerald-500",
      stats: [
        { label: "Generation Quality", value: "87%" },
        { label: "Brand Voice Match", value: "94%" },
        { label: "Content Created", value: "156" },
      ],
    },
    {
      id: "rcmm",
      name: "RCMM",
      description: "Reputation & Crisis Management Monitor",
      icon: Shield,
      isActive: true,
      performance: 94,
      gradient: "from-red-500 to-orange-500",
      stats: [
        { label: "Coverage", value: "96%" },
        { label: "Threats Detected", value: "3" },
        { label: "Brand Sentiment", value: "82%" },
      ],
    },
    {
      id: "cpes",
      name: "CPES",
      description: "Cross-Platform Engagement Synthesis",
      icon: MessageSquare,
      isActive: true,
      performance: 91,
      gradient: "from-indigo-500 to-purple-500",
      stats: [
        { label: "Processing Rate", value: "91%" },
        { label: "Messages Handled", value: "2,847" },
        { label: "Response Time", value: "1.2s" },
      ],
    },
  ])

  const [systemStats, setSystemStats] = useState({
    totalProcessed: 15847,
    activeEngines: 4,
    systemHealth: 96,
    uptime: "99.9%",
  })

  // Safe toggle function
  const toggleEngine = (engineId: string) => {
    setEngines((prevEngines) =>
      prevEngines.map((engine) => (engine.id === engineId ? { ...engine, isActive: !engine.isActive } : engine)),
    )
  }

  // Update system stats based on active engines
  useEffect(() => {
    const activeCount = engines.filter((engine) => engine.isActive).length
    setSystemStats((prev) => ({
      ...prev,
      activeEngines: activeCount,
      systemHealth: Math.round(
        engines.reduce((sum, engine) => sum + (engine.isActive ? engine.performance : 0), 0) / engines.length,
      ),
    }))
  }, [engines])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEngines((prevEngines) =>
        prevEngines.map((engine) => ({
          ...engine,
          performance: Math.max(85, Math.min(99, engine.performance + (Math.random() - 0.5) * 2)),
        })),
      )

      setSystemStats((prev) => ({
        ...prev,
        totalProcessed: prev.totalProcessed + Math.floor(Math.random() * 10),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Command Center</h1>
          <p className="text-gray-600 mt-1">SHADOWHACKER-GOD Intelligence System</p>
        </div>
        <Badge className="bg-green-100 text-green-800 px-3 py-1">
          <Activity className="w-4 h-4 mr-1" />
          System Online
        </Badge>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Processed</p>
                <p className="text-2xl font-bold">{systemStats.totalProcessed.toLocaleString()}</p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Engines</p>
                <p className="text-2xl font-bold">{systemStats.activeEngines}/5</p>
              </div>
              <Cpu className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Health</p>
                <p className="text-2xl font-bold">{systemStats.systemHealth}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Uptime</p>
                <p className="text-2xl font-bold">{systemStats.uptime}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="engines" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engines">AI Engines</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="engines" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {engines.map((engine) => {
              const IconComponent = engine.icon
              return (
                <Card key={engine.id} className="overflow-hidden">
                  <CardHeader className={`bg-gradient-to-r ${engine.gradient} text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{engine.name}</CardTitle>
                          <CardDescription className="text-white/80">{engine.description}</CardDescription>
                        </div>
                      </div>
                      <Switch
                        checked={engine.isActive}
                        onCheckedChange={() => toggleEngine(engine.id)}
                        className="data-[state=checked]:bg-white/30"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Performance</span>
                          <span className="text-sm text-gray-600">{Math.round(engine.performance)}%</span>
                        </div>
                        <Progress value={engine.performance} className="h-2" />
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {engine.stats.map((stat, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">{stat.label}</span>
                            <span className="font-semibold">{stat.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        {engine.isActive ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">Active & Running</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                            <span className="text-sm text-orange-600">Inactive</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Engagement Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Next 24 Hours</span>
                    <Badge className="bg-green-100 text-green-800">+23% Expected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Peak Time</span>
                    <span className="font-semibold">2:30 PM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Best Platform</span>
                    <span className="font-semibold">Instagram</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Content Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">Video Content</p>
                    <p className="text-xs text-gray-600">87% higher engagement expected</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">Trending Hashtags</p>
                    <p className="text-xs text-gray-600">#TechTrends #Innovation #AI</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium">Optimal Length</p>
                    <p className="text-xs text-gray-600">150-200 characters for maximum reach</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  Threat Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">LOW</div>
                  <p className="text-sm text-gray-600">No immediate threats detected</p>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-700">All systems secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Brand Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">82%</div>
                  <p className="text-sm text-gray-600">Positive sentiment</p>
                  <Progress value={82} className="mt-4" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  Active Mentions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">47</div>
                  <p className="text-sm text-gray-600">In the last hour</p>
                  <div className="mt-4 flex justify-center">
                    <Badge className="bg-purple-100 text-purple-800">+12% vs yesterday</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Performance Analytics</CardTitle>
              <CardDescription>Real-time performance metrics for all AI engines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {engines.map((engine) => (
                  <div key={engine.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{engine.name}</span>
                      <span className="text-sm text-gray-600">{Math.round(engine.performance)}%</span>
                    </div>
                    <Progress value={engine.performance} className="h-2" />
                    <p className="text-xs text-gray-500">{engine.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
