"use server"

import { createClient } from "@/lib/supabase/server"

export async function getUserSubscription() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  // Get user subscription
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select(`
      *,
      plan:plans(*)
    `)
    .eq("user_id", session.user.id)
    .single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" which is fine
    console.error("Error fetching subscription:", error)
    throw new Error("Failed to fetch subscription")
  }

  return subscription
}

export async function updateSubscription(planId: string) {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  try {
    // Get the plan details
    const { data: plan, error: planError } = await supabase.from("plans").select("*").eq("id", planId).single()

    if (planError) {
      throw planError
    }

    // Check if user already has a subscription
    const { data: existingSubscription, error: subError } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", session.user.id)
      .single()

    if (subError && subError.code !== "PGRST116") {
      throw subError
    }

    // Calculate next billing date (1 month from now)
    const currentPeriodEnd = new Date()
    currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1)

    if (existingSubscription) {
      // Update existing subscription
      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({
          plan_id: planId,
          status: "active",
          current_period_end: currentPeriodEnd.toISOString(),
          cancel_at_period_end: false,
        })
        .eq("id", existingSubscription.id)

      if (updateError) {
        throw updateError
      }
    } else {
      // Create new subscription
      const { error: insertError } = await supabase.from("subscriptions").insert({
        user_id: session.user.id,
        plan_id: planId,
        status: "active",
        current_period_end: currentPeriodEnd.toISOString(),
        cancel_at_period_end: false,
      })

      if (insertError) {
        throw insertError
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating subscription:", error)
    return { success: false, error: "Failed to update subscription" }
  }
}

export async function cancelSubscription() {
  const supabase = createClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("Not authenticated")
  }

  try {
    // Update subscription to cancel at period end
    const { error } = await supabase
      .from("subscriptions")
      .update({
        cancel_at_period_end: true,
      })
      .eq("user_id", session.user.id)

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error("Error canceling subscription:", error)
    return { success: false, error: "Failed to cancel subscription" }
  }
}
