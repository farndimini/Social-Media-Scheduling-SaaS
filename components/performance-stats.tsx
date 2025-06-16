"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Sample data for performance stats
const performanceData = [
  {
    name: "Mon",
    engagement: 120,
    reach: 240,
    impressions: 300,
  },
  {
    name: "Tue",
    engagement: 150,
    reach: 290,
    impressions: 350,
  },
  {
    name: "Wed",
    engagement: 180,
    reach: 320,
    impressions: 410,
  },
  {
    name: "Thu",
    engagement: 190,
    reach: 380,
    impressions: 450,
  },
  {
    name: "Fri",
    engagement: 210,
    reach: 400,
    impressions: 480,
  },
  {
    name: "Sat",
    engagement: 250,
    reach: 450,
    impressions: 520,
  },
  {
    name: "Sun",
    engagement: 280,
    reach: 500,
    impressions: 580,
  },
]

export function PerformanceStats() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={performanceData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="engagement" fill="hsl(var(--primary))" name="Engagement" />
          <Bar dataKey="reach" fill="hsl(var(--secondary))" name="Reach" />
          <Bar dataKey="impressions" fill="hsl(var(--muted))" name="Impressions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
