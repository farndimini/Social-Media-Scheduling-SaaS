import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export function createClient() {
  const cookieStore = cookies()

  try {
    return createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie setting errors (can happen in middleware)
            console.error("Error setting cookie:", error)
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            console.error("Error removing cookie:", error)
          }
        },
      },
    })
  } catch (error) {
    console.error("Error creating server client:", error)
    throw error
  }
}

export async function getSession() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error("Error getting session:", error)
      return null
    }

    return data.session
  } catch (error) {
    console.error("Error in getSession:", error)
    return null
  }
}

export async function getUserDetails() {
  try {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error("Error getting session in getUserDetails:", error)
      return null
    }

    if (!data.session) {
      return null
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.session.user.id)
      .single()

    if (profileError) {
      console.error("Error getting profile:", profileError)
      return null
    }

    return profile
  } catch (error) {
    console.error("Error in getUserDetails:", error)
    return null
  }
}
