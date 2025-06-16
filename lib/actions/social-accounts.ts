"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getSocialAccounts() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  // Get social accounts
  const { data: accounts, error } = await supabase
    .from("social_accounts")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching social accounts:", error)
    throw new Error("Failed to fetch social accounts")
  }

  return accounts
}

export async function connectSocialAccount(data: { platform: string; accountName: string }) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  try {
    // In a real app, this would involve OAuth flow with the platform
    // For now, we'll just create a mock account
    const { data: account, error } = await supabase
      .from("social_accounts")
      .insert({
        user_id: session.user.id,
        platform: data.platform,
        account_name: data.accountName,
        account_id: `mock-${data.platform}-${Date.now()}`,
        is_active: true,
        metadata: { mock: true },
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    revalidatePath("/dashboard/integrations")
    return { success: true, account }
  } catch (error) {
    console.error("Error connecting social account:", error)
    return { success: false, error: "Failed to connect social account" }
  }
}

export async function disconnectSocialAccount(accountId: string) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  try {
    // Delete the account
    const { error } = await supabase.from("social_accounts").delete().eq("id", accountId).eq("user_id", session.user.id)

    if (error) {
      throw error
    }

    revalidatePath("/dashboard/integrations")
    return { success: true }
  } catch (error) {
    console.error("Error disconnecting social account:", error)
    throw new Error("Failed to disconnect social account")
  }
}

export async function toggleSocialAccount(accountId: string, isActive: boolean) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  try {
    // Update the account
    const { error } = await supabase
      .from("social_accounts")
      .update({ is_active: isActive })
      .eq("id", accountId)
      .eq("user_id", session.user.id)

    if (error) {
      throw error
    }

    revalidatePath("/dashboard/integrations")
    return { success: true }
  } catch (error) {
    console.error("Error toggling social account:", error)
    return { success: false, error: "Failed to toggle social account" }
  }
}

export async function deleteSocialAccount(accountId: string) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  try {
    // Delete the account
    const { error } = await supabase.from("social_accounts").delete().eq("id", accountId).eq("user_id", session.user.id)

    if (error) {
      throw error
    }

    revalidatePath("/dashboard/integrations")
    return { success: true }
  } catch (error) {
    console.error("Error deleting social account:", error)
    return { success: false, error: "Failed to delete social account" }
  }
}

export async function addSocialAccount(formData: FormData) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  const platform = formData.get("platform") as string
  const accountName = formData.get("accountName") as string

  if (!platform || !accountName) {
    return { success: false, error: "Platform and account name are required" }
  }

  try {
    // In a real app, this would involve OAuth flow with the platform
    // For now, we'll just create a mock account
    const { data: account, error } = await supabase
      .from("social_accounts")
      .insert({
        user_id: session.user.id,
        platform: platform,
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

    revalidatePath("/dashboard/integrations")
    return { success: true, accountId: account.id }
  } catch (error) {
    console.error("Error connecting social account:", error)
    return { success: false, error: "Failed to connect social account" }
  }
}
