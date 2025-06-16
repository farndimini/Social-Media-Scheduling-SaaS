import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const platform = formData.get("platform") as string
    const accountName = formData.get("accountName") as string

    if (!platform || !accountName) {
      return NextResponse.json({ error: "Platform and account name are required" }, { status: 400 })
    }

    // Validate platform
    const validPlatforms = ["twitter", "facebook", "instagram", "youtube", "tiktok", "linkedin"]
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 })
    }

    // In a real app, this would redirect to OAuth flow
    // For now, we'll just create a mock account
    const { data, error } = await supabase
      .from("social_accounts")
      .insert({
        user_id: session.user.id,
        platform,
        account_name: accountName,
        account_id: `mock-${platform}-${Date.now()}`,
        is_active: true,
        metadata: { mock: true },
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, account: data })
  } catch (error) {
    console.error("Error adding social account:", error)
    return NextResponse.json({ error: "Failed to add social account" }, { status: 500 })
  }
}
