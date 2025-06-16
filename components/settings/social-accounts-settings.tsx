"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Facebook, Instagram, Plus, Twitter, Trash2, Youtube, Linkedin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SocialAccount {
  id: string
  platform: string
  account_name: string
  is_active: boolean | null
}

interface SocialAccountsSettingsProps {
  initialAccounts: SocialAccount[]
}

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

export function SocialAccountsSettings({ initialAccounts }: SocialAccountsSettingsProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>(initialAccounts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [platform, setPlatform] = useState("")
  const [accountName, setAccountName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleToggleActive = async (id: string, currentStatus: boolean | null) => {
    try {
      await supabase.from("social_accounts").update({ is_active: !currentStatus }).eq("id", id)

      setAccounts(accounts.map((account) => (account.id === id ? { ...account, is_active: !currentStatus } : account)))
    } catch (error) {
      console.error("Error updating account status:", error)
    }
  }

  const handleDeleteAccount = async (id: string) => {
    if (!confirm("Are you sure you want to disconnect this account?")) return

    try {
      await supabase.from("social_accounts").delete().eq("id", id)

      setAccounts(accounts.filter((account) => account.id !== id))
    } catch (error) {
      console.error("Error deleting account:", error)
    }
  }

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    if (!platform || !accountName) {
      setError("Platform and account name are required")
      setIsSubmitting(false)
      return
    }

    try {
      // In a real app, this would redirect to OAuth flow
      // For now, we'll just create a mock account
      const { data, error } = await supabase
        .from("social_accounts")
        .insert({
          platform,
          account_name: accountName,
          account_id: `mock-${platform}-${Date.now()}`,
          is_active: true,
          metadata: { mock: true },
        })
        .select()
        .single()

      if (error) throw error

      setAccounts([...accounts, data])
      setIsDialogOpen(false)
      setPlatform("")
      setAccountName("")
    } catch (err) {
      console.error("Error adding account:", err)
      setError("Failed to add account")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {accounts.length === 0 ? (
          <div className="text-center py-8 border rounded-md">
            <p className="text-muted-foreground">No social accounts connected</p>
          </div>
        ) : (
          accounts.map((account) => (
            <div key={account.id} className="flex items-center justify-between gap-4 rounded-lg border p-4">
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
                  checked={account.is_active || false}
                  onCheckedChange={() => handleToggleActive(account.id, account.is_active)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleDeleteAccount(account.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="w-full gap-2">
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
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
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
                <Input
                  id="accountName"
                  placeholder="@youraccount"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Note: In a real application, you would be redirected to authenticate with the selected platform.</p>
                <p>For demo purposes, we're creating mock connections.</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
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
