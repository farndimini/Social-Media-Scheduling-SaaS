"use server"

import { createClient as createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  const content = formData.get("content") as string
  const link = formData.get("link") as string
  const scheduledAt = formData.get("scheduledAt") as string
  const platforms = formData.getAll("platforms") as string[]

  if (!content) {
    return { success: false, error: "Content is required" }
  }

  if (platforms.length === 0) {
    return { success: false, error: "At least one platform is required" }
  }

  try {
    // Create the post
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert({
        user_id: session.user.id,
        content,
        link: link || null,
        scheduled_at: scheduledAt || null,
        status: scheduledAt ? "scheduled" : "draft",
      })
      .select()
      .single()

    if (postError) {
      throw postError
    }

    // Get the selected social accounts
    const { data: accounts, error: accountsError } = await supabase
      .from("social_accounts")
      .select("id, platform")
      .in("platform", platforms)
      .eq("user_id", session.user.id)
      .eq("is_active", true)

    if (accountsError) {
      throw accountsError
    }

    // Create post_platforms entries
    if (accounts && accounts.length > 0) {
      const postPlatforms = accounts.map((account) => ({
        post_id: post.id,
        social_account_id: account.id,
        status: "pending",
      }))

      const { error: platformsError } = await supabase.from("post_platforms").insert(postPlatforms)

      if (platformsError) {
        throw platformsError
      }
    }

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/queue")
    return { success: true, postId: post.id }
  } catch (error) {
    console.error("Error creating post:", error)
    return { success: false, error: "Failed to create post" }
  }
}

export async function createVideoPost(data: {
  title: string
  description: string
  tags: string[]
  videoId: string
  platforms: string[]
  scheduledAt: string | null
}) {
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  if (!data.title) {
    return { success: false, error: "Title is required" }
  }

  if (!data.videoId) {
    return { success: false, error: "Video is required" }
  }

  if (data.platforms.length === 0) {
    return { success: false, error: "At least one platform is required" }
  }

  try {
    // Create the post
    const { data: post, error: postError } = await supabase
      .from("posts")
      .insert({
        user_id: session.user.id,
        content: data.title, // Store title in content field
        link: null,
        scheduled_at: data.scheduledAt,
        status: data.scheduledAt ? "scheduled" : "draft",
        metadata: {
          type: "video",
          description: data.description,
          tags: data.tags,
        },
      })
      .select()
      .single()

    if (postError) {
      throw postError
    }

    // Associate the video with the post
    const { error: mediaError } = await supabase.from("post_media").insert({
      post_id: post.id,
      media_id: data.videoId,
      display_order: 1,
    })

    if (mediaError) {
      throw mediaError
    }

    // Get the selected social accounts
    const { data: accounts, error: accountsError } = await supabase
      .from("social_accounts")
      .select("id, platform")
      .in("platform", data.platforms)
      .eq("user_id", session.user.id)
      .eq("is_active", true)

    if (accountsError) {
      throw accountsError
    }

    // Create post_platforms entries
    if (accounts && accounts.length > 0) {
      const postPlatforms = accounts.map((account) => ({
        post_id: post.id,
        social_account_id: account.id,
        status: "pending",
      }))

      const { error: platformsError } = await supabase.from("post_platforms").insert(postPlatforms)

      if (platformsError) {
        throw platformsError
      }
    }

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/queue")
    return { success: true, postId: post.id }
  } catch (error) {
    console.error("Error creating video post:", error)
    return { success: false, error: "Failed to create video post" }
  }
}

export async function getUpcomingPosts() {
  try {
    const supabase = createServerClient()
    const session = await supabase.auth.getSession()

    if (!session.data.session) {
      return []
    }

    const userId = session.data.session.user.id

    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        post_platforms(
          id,
          social_account(
            id,
            platform,
            username
          )
        ),
        media(
          id,
          url,
          type
        )
      `)
      .eq("user_id", userId)
      .order("scheduled_at", { ascending: true })

    if (error) {
      console.error("Error fetching upcoming posts:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error in getUpcomingPosts:", error)
    return []
  }
}

export async function deletePost(postId: string) {
  const supabase = createServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  try {
    // Delete the post
    const { error } = await supabase.from("posts").delete().eq("id", postId).eq("user_id", session.user.id)

    if (error) {
      throw error
    }

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/queue")
    return { success: true }
  } catch (error) {
    console.error("Error deleting post:", error)
    return { success: false, error: "Failed to delete post" }
  }
}
