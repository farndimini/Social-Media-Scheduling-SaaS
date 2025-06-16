"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getMediaItems() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  // Get media items
  const { data: media, error } = await supabase
    .from("media")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching media:", error)
    throw new Error("Failed to fetch media")
  }

  return media
}

export async function uploadMedia(formData: FormData) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  const file = formData.get("file") as File
  const altText = formData.get("altText") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const isVideo = formData.get("isVideo") === "true"

  if (!file) {
    return { success: false, error: "No file provided" }
  }

  try {
    // Upload file to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("media")
      .upload(`${session.user.id}/${fileName}`, file)

    if (uploadError) {
      throw uploadError
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(uploadData.path)

    // Create thumbnail for images and videos
    let thumbnailUrl = null
    if (file.type.startsWith("image/")) {
      // In a real app, you would generate a thumbnail
      // For now, we'll use the same URL
      thumbnailUrl = publicUrlData.publicUrl
    } else if (file.type.startsWith("video/")) {
      // In a real app, you would generate a video thumbnail
      // For now, we'll use a placeholder
      thumbnailUrl = "/placeholder.svg?height=400&width=400"
    }

    // Insert record in media table
    const { data: mediaData, error: mediaError } = await supabase
      .from("media")
      .insert({
        user_id: session.user.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        url: publicUrlData.publicUrl,
        thumbnail_url: thumbnailUrl,
        alt_text: altText || null,
        title: title || null,
        description: description || null,
      })
      .select()
      .single()

    if (mediaError) {
      throw mediaError
    }

    revalidatePath("/dashboard/media")
    return { success: true, media: mediaData }
  } catch (error) {
    console.error("Error uploading media:", error)
    return { success: false, error: "Failed to upload media" }
  }
}

export async function deleteMedia(mediaId: string) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  try {
    // Get the media item to get the file path
    const { data: media, error: fetchError } = await supabase
      .from("media")
      .select("*")
      .eq("id", mediaId)
      .eq("user_id", session.user.id)
      .single()

    if (fetchError) {
      throw fetchError
    }

    // Extract the path from the URL
    const urlParts = media.url.split("/")
    const filePath = `${session.user.id}/${urlParts[urlParts.length - 1]}`

    // Delete from storage
    const { error: storageError } = await supabase.storage.from("media").remove([filePath])

    if (storageError) {
      console.error("Error deleting from storage:", storageError)
      // Continue anyway to delete the database record
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from("media")
      .delete()
      .eq("id", mediaId)
      .eq("user_id", session.user.id)

    if (deleteError) {
      throw deleteError
    }

    revalidatePath("/dashboard/media")
    return { success: true }
  } catch (error) {
    console.error("Error deleting media:", error)
    throw new Error("Failed to delete media")
  }
}
