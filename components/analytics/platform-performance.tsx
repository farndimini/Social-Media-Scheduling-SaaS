"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Facebook, Instagram, Twitter } from "lucide-react"

interface PlatformData {
  name: string
  value: number
  color: string
}

interface PlatformPerformanceProps {
  data: PlatformData[]
}

export function PlatformPerformance({ data }: PlatformPerformanceProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      default:
        return null
    }
  }

  const renderCustomizedLegend = (props: any) => {
    const { payload } = props

    return (
      <div className="flex flex-col gap-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <div className="flex items-center gap-1">
              {getPlatformIcon(entry.value)}
              <span className="text-sm">{entry.value}</span>
            </div>
            <span className="text-sm text-muted-foreground ml-auto">{entry.payload.value}%</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend content={renderCustomizedLegend} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
