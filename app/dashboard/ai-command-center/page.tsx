"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  Zap,
  Shield,
  Globe,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Cpu,
  Database,
  Settings,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Network,
} from "lucide-react"

interface AIEngine {
  id: string
  name: string
  description: string
  icon: any
  isActive: boolean
  performance: number
  accuracy: number
  gradient: string
  stats: {
    label: string
    value: string | number
  }[]
  insights: string[]
  tuningParams?: {
    name: string
    value: number
    min: number
    max: number
    description: string
  }[]
}

export default function AICommandCenter() {
  const [engines, setEngines] = useState<AIEngine[]>([
    {
      id: "pcoe",
      name: "PCOE",
      description: "Predictive Content Optimization Engine",
      icon: Brain,
      isActive: true,
      performance: 98,
      accuracy: 94,
      gradient: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Predictions Made", value: "15,847" },
        { label: "Accuracy Rate", value: "94%" },
        { label: "Time Saved", value: "127h" },
      ],
      insights: [
        "Video content performs 67% better on Tuesdays",
        "Optimal posting window: 2:30-4:00 PM",
        "Hashtag #Innovation trending +234%",
      ],
      tuningParams: [
        { name: "Reach Priority", value: 70, min: 0, max: 100, description: "Prioritize reach over engagement" },
        { name: "Risk Tolerance", value: 45, min: 0, max: 100, description: "Willingness to try trending topics" },
      ],
    },
    {
      id: "osm",
      name: "OSM",
      description: "Omnichannel Synchronicity Matrix",
      icon: Globe,
      isActive: true,
      performance: 96,
      accuracy: 92,
      gradient: "from-purple-500 to-pink-500",
      stats: [
        { label: "Platforms Synced", value: "8" },
        { label: "Success Rate", value: "96%" },
        { label: "Posts Adapted", value: "2,341" },
      ],
      insights: [
        "LinkedIn posts need 23% longer content",
        "Instagram Stories have 45% higher completion rate",
        "Cross-platform campaigns show 156% better ROI",
      ],
    },
    {
      id: "acg",
      name: "ACG",
      description: "Autonomous Content Generation",
      icon: Zap,
      isActive: true,
      performance: 87,
      accuracy: 89,
      gradient: "from-green-500 to-emerald-500",
      stats: [
        { label: "Content Generated", value: "1,234" },
        { label: "Adoption Rate", value: "78%" },
        { label: "Brand Voice Match", value: "94%" },
      ],
      insights: [
        "AI-generated captions have 23% higher engagement",
        "Personalized content performs 45% better",
        "Trending topic integration increases reach by 67%",
      ],
      tuningParams: [
        {
          name: "Creativity Level",
          value: 65,
          min: 0,
          max: 100,
          description: "Balance between safe and creative content",
        },
        {
          name: "Brand Voice Strictness",
          value: 85,
          min: 0,
          max: 100,
          description: "How closely to match brand voice",
        },
      ],
    },
    {
      id: "rcmm",
      name: "RCMM",
      description: "Reputation & Crisis Management Monitor",
      icon: Shield,
      isActive: true,
      performance: 94,
      accuracy: 97,
      gradient: "from-red-500 to-orange-500",
      stats: [
        { label: "Threats Detected", value: "23" },
        { label: "Response Time", value: "0.3s" },
        { label: "Crisis Prevented", value: "7" },
      ],
      insights: [
        "Brand sentiment trending positive (+12%)",
        "Competitor mention spike detected",
        "Potential PR opportunity identified",
      ],
    },
    {
      id: "cpes",
      name: "CPES",
      description: "Cross-Platform Engagement Synthesis",
      icon: MessageSquare,
      isActive: true,
      performance: 91,
      accuracy: 88,
      gradient: "from-indigo-500 to-purple-500",
      stats: [
        { label: "Messages Processed", value: "8,947" },
        { label: "Response Rate", value: "97%" },
        { label: "Satisfaction Score", value: "4.8/5" },
      ],
      insights: [
        "Peak engagement hours: 9-11 AM, 2-4 PM",
        "Question-based posts get 34% more comments",
        "Video responses increase satisfaction by 23%",
      ],
    },
  ])

  const [feedbackMode, setFeedbackMode] = useState(false)
  const [selectedEngine, setSelectedEngine] = useState<string | null>(null)

  // Toggle engine function
  const toggleEngine = (engineId: string) => {
    setEngines((prevEngines) =>
      prevEngines.map((engine) => (engine.id === engineId ? { ...engine, isActive: !engine.isActive } : engine)),
    )
  }

  // Update tuning parameters
  const updateTuningParam = (engineId: string, paramName: string, value: number) => {
    setEngines((prevEngines) =>
      prevEngines.map((engine) =>
        engine.id === engineId
          ? {
              ...engine,
              tuningParams: engine.tuningParams?.map((param) =>
                param.name === paramName ? { ...param, value } : param,
              ),
            }
          : engine,
      ),
    )
  }

  // Provide feedback
  const provideFeedback = (engineId: string, positive: boolean) => {
    // In a real app, this would send feedback to the AI system
    console.log(`Feedback for ${engineId}: ${positive ? "positive" : "negative"}`)
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEngines((prevEngines) =>
        prevEngines.map((engine) => ({
          ...engine,
          performance: Math.max(85, Math.min(99, engine.performance + (Math.random() - 0.5) * 2)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-900 to-blue-900 min-h-screen text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            SHADOWHACKER-GOD Intelligence Core
          </h1>
          <p className="text-gray-300 mt-1">Advanced AI Engine Command & Control</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-900 text-green-300 px-3 py-1">
            <Activity className="w-4 h-4 mr-1" />
            All Systems Operational
          </Badge>
          <Button
            onClick={() => setFeedbackMode(!feedbackMode)}
            variant={feedbackMode ? "destructive" : "secondary"}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {feedbackMode ? "Exit Feedback" : "Feedback Mode"}
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Processed</p>
                <p className="text-2xl font-bold text-cyan-400">47.2K</p>
              </div>
              <Database className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Engines</p>
                <p className="text-2xl font-bold text-green-400">{engines.filter((e) => e.isActive).length}/5</p>
              </div>
              <Cpu className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Avg Performance</p>
                <p className="text-2xl font-bold text-purple-400">
                  {Math.round(engines.reduce((sum, e) => sum + e.performance, 0) / engines.length)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Uptime</p>
                <p className="text-2xl font-bold text-orange-400">99.9%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="engines" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="engines" className="data-[state=active]:bg-slate-700">
            AI Engines
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-slate-700">
            Deep Insights
          </TabsTrigger>
          <TabsTrigger value="tuning" className="data-[state=active]:bg-slate-700">
            Engine Tuning
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-slate-700">
            Network View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="engines" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {engines.map((engine) => {
              const IconComponent = engine.icon
              return (
                <Card key={engine.id} className="bg-slate-800 border-slate-700 overflow-hidden">
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
                          <span className="text-sm font-medium text-gray-300">Performance</span>
                          <span className="text-sm text-gray-400">{Math.round(engine.performance)}%</span>
                        </div>
                        <Progress value={engine.performance} className="h-2" />
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {engine.stats.map((stat, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-400">{stat.label}</span>
                            <span className="font-semibold text-white">{stat.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        {engine.isActive ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-green-400">Active & Processing</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-orange-400" />
                            <span className="text-sm text-orange-400">Inactive</span>
                          </>
                        )}
                      </div>

                      {feedbackMode && (
                        <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
                          <span className="text-xs text-gray-400">Rate Performance:</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => provideFeedback(engine.id, true)}
                            className="text-green-400 hover:bg-green-400/20"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => provideFeedback(engine.id, false)}
                            className="text-red-400 hover:bg-red-400/20"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engines.map((engine) => (
              <Card key={engine.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <engine.icon className="h-5 w-5" />
                    {engine.name} Insights
                  </CardTitle>
                  <CardDescription className="text-gray-400">Explainable AI decision factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {engine.insights.map((insight, index) => (
                      <div key={index} className="p-3 bg-slate-700 rounded-lg">
                        <p className="text-sm text-gray-300">{insight}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-900/50 rounded-lg border border-blue-700">
                    <p className="text-xs text-blue-300">
                      <strong>Accuracy:</strong> {engine.accuracy}% | <strong>Confidence:</strong> High
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tuning" className="space-y-6">
          <Alert className="bg-yellow-900/50 border-yellow-700">
            <Settings className="h-4 w-4" />
            <AlertDescription className="text-yellow-300">
              <strong>Advanced Users Only:</strong> Adjusting these parameters will affect AI engine behavior. Changes
              take effect immediately.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {engines
              .filter((engine) => engine.tuningParams)
              .map((engine) => (
                <Card key={engine.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <engine.icon className="h-5 w-5" />
                      {engine.name} Tuning
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Fine-tune engine parameters for optimal performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {engine.tuningParams?.map((param) => (
                      <div key={param.name} className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium text-gray-300">{param.name}</label>
                          <span className="text-sm text-gray-400">{param.value}%</span>
                        </div>
                        <Slider
                          value={[param.value]}
                          onValueChange={(value) => updateTuningParam(engine.id, param.name, value[0])}
                          max={param.max}
                          min={param.min}
                          step={1}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500">{param.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Network className="h-5 w-5" />
                AI Engine Network Visualization
              </CardTitle>
              <CardDescription className="text-gray-400">Real-time data flow between AI engines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center bg-slate-900 rounded-lg">
                <div className="text-center">
                  <Network className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive Network Visualization</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Real-time visualization of data flows and engine interconnections
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
