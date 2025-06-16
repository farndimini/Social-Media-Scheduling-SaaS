"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateUserProfile } from "@/lib/actions/user"
import { useToast } from "@/components/ui/use-toast"

interface AccountSettingsProps {
  initialProfile: any | null
}

export function AccountSettings({ initialProfile }: AccountSettingsProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState(initialProfile?.full_name || "")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await updateUserProfile(formData)

    setIsLoading(false)

    if (result.success) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={initialProfile?.email || ""} disabled placeholder="Your email address" />
        <p className="text-sm text-muted-foreground">
          Your email address is associated with your account and cannot be changed.
        </p>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
