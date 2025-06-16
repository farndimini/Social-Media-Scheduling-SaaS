"use server"

import { createClient } from "@/lib/supabase/server"
import { addDays, format, subDays } from "date-fns"

export async function getAnalyticsData() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  // In a real app, we would fetch real analytics data from the database
  // For now, we'll generate mock data

  // Generate engagement data for the last 90 days
  const engagementData = []
  const today = new Date()
  for (let i = 90; i >= 0; i--) {
    const date = subDays(today, i)
    engagementData.push({
      date: format(date, "MMM d"),
      likes: Math.floor(Math.random() * 100) + 10,
      comments: Math.floor(Math.random() * 30) + 5,
      shares: Math.floor(Math.random() * 20) + 2,
    })
  }

  // Calculate totals for overview
  const totalPosts = 42 // Mock value
  const totalEngagement = engagementData.reduce((sum, day) => sum + day.likes + day.comments + day.shares, 0)
  const totalImpressions = 12500 // Mock value
  const totalReach = 8750 // Mock value

  // Platform performance data
  const platformPerformance = [
    { name: "Instagram", value: 45, color: "#E1306C" },
    { name: "Facebook", value: 30, color: "#4267B2" },
    { name: "Twitter", value: 25, color: "#1DA1F2" },
  ]

  // Top performing posts
  const topPosts = [
    {
      id: "1",
      content: "Check out our new product launch! #NewProduct",
      platform: "instagram",
      engagement: {
        likes: 245,
        comments: 32,
        shares: 18,
      },
      published_at: addDays(subDays(today, 5), 0).toISOString(),
    },
    {
      id: "2",
      content: "Excited to announce our latest feature release!",
      platform: "facebook",
      engagement: {
        likes: 189,
        comments: 24,
        shares: 12,
      },
      published_at: addDays(subDays(today, 8), 0).toISOString(),
    },
    {
      id: "3",
      content: "Join our webinar tomorrow at 2 PM EST. Register now!",
      platform: "twitter",
      engagement: {
        likes: 156,
        comments: 18,
        shares: 25,
      },
      published_at: addDays(subDays(today, 12), 0).toISOString(),
    },
  ]

  return {
    overview: {
      totalPosts,
      totalEngagement,
      totalImpressions,
      totalReach,
    },
    engagementData,
    platformPerformance,
    topPosts,
  }
}
