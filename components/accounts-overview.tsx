"use client"

import type React from "react"

import { Facebook, Instagram, Plus, Twitter, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { toggleSocialAccount, deleteSocialAccount } from "@/lib/actions/social-accounts"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

// TikTok icon component since it's not in lucide-react
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
)

// Function to get platform icon
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="h-5 w-5" />
    case "facebook":
      return <Facebook className="h-5 w-5" />
    case "twitter":
      return <Twitter className="h-5 w-5" />
    case "youtube":
      return <Youtube className="h-5 w-5" />
    case "tiktok":
      return <TikTokIcon className="h-5 w-5" />
    case "linkedin":
      return <Linkedin className="h-5 w-5" />
    default:
      return null
  }
}

export function AccountsOverview({ initialAccounts = [] }) {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleToggleAccount = async (accountId: string, currentStatus: boolean) => {
    try {
      await toggleSocialAccount(accountId, !currentStatus)
      setAccounts(
        accounts.map((account) => (account.id === accountId ? { ...account, is_active: !currentStatus } : account)),
      )
    } catch (error) {
      console.error("Error toggling account:", error)
    }
  }

  const handleDeleteAccount = async (accountId: string) => {
    if (confirm("Are you sure you want to disconnect this account?")) {
      try {
        await deleteSocialAccount(accountId)
        setAccounts(accounts.filter((account) => account.id !== accountId))
      } catch (error) {
        console.error("Error deleting account:", error)
      }
    }
  }

  const handleAddAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch("/api/social-accounts", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to add account")
      }

      const data = await response.json()

      // In a real app, we would redirect to OAuth flow
      // For now, just close the dialog and refresh
      setIsAddDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error adding account:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {accounts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No social accounts connected</p>
        </div>
      ) : (
        accounts.map((account) => (
          <div key={account.id} className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                {getPlatformIcon(account.platform)}
              </div>
              <div>
                <p className="font-medium">{account.account_name}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {account.platform}
                  </Badge>
                  {account.is_active ? (
                    <Badge variant="secondary" className="text-xs">
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      Disabled
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={account.is_active}
                onCheckedChange={() => handleToggleAccount(account.id, account.is_active)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={() => handleDeleteAccount(account.id)}
              >
                Disconnect
              </Button>
            </div>
          </div>
        ))
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Connect New Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Social Media Account</DialogTitle>
            <DialogDescription>Connect your social media accounts to schedule posts.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddAccount}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="platform">Platform</Label>
                <Select name="platform" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input id="accountName" name="accountName" placeholder="@youraccount" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Connecting..." : "Connect Account"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
