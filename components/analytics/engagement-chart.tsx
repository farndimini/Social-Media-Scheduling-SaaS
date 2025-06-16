"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EngagementData {
  date: string
  likes: number
  comments: number
  shares: number
}

interface EngagementChartProps {
  data: EngagementData[]
}

export function EngagementChart({ data }: EngagementChartProps) {
  return (
    <Tabs defaultValue="30days">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="7days">7 Days</TabsTrigger>
          <TabsTrigger value="30days">30 Days</TabsTrigger>
          <TabsTrigger value="90days">90 Days</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="7days" className="mt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.slice(-7)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="likes" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="comments" stroke="hsl(var(--secondary))" />
              <Line type="monotone" dataKey="shares" stroke="hsl(var(--muted))" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="30days" className="mt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.slice(-30)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="likes" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="comments" stroke="hsl(var(--secondary))" />
              <Line type="monotone" dataKey="shares" stroke="hsl(var(--muted))" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>

      <TabsContent value="90days" className="mt-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="likes" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="comments" stroke="hsl(var(--secondary))" />
              <Line type="monotone" dataKey="shares" stroke="hsl(var(--muted))" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  )
}
