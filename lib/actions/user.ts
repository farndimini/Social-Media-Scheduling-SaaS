"use server"

import { createClient } from "@/lib/supabase/server"

export async function getUserProfile() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  // First, check if the profile exists
  const { data: profiles, error: fetchError } = await supabase.from("profiles").select("*").eq("id", session.user.id)

  if (fetchError) {
    console.error("Error fetching user profile:", fetchError)
    throw new Error("Failed to fetch user profile")
  }

  // If no profile exists, create one
  if (!profiles || profiles.length === 0) {
    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert([
        {
          id: session.user.id,
          full_name: session.user.user_metadata?.full_name || "",
          email: session.user.email,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (createError) {
      console.error("Error creating user profile:", createError)
      throw new Error("Failed to create user profile")
    }

    return newProfile
  }

  // Return the first profile if multiple exist (shouldn't happen, but just in case)
  return profiles[0]
}

export async function updateUserProfile(formData: FormData) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  const fullName = formData.get("fullName") as string

  try {
    // Update user metadata
    const { error: userError } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    })

    if (userError) throw userError

    // Update profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", session.user.id)

    if (profileError) throw profileError

    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}
