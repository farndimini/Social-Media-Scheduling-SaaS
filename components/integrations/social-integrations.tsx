"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Facebook, Instagram, Twitter, Check, ExternalLink, Youtube, Linkedin } from "lucide-react"
import { connectSocialAccount, disconnectSocialAccount } from "@/lib/actions/social-accounts"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SocialAccount {
  id: string
  platform: string
  account_name: string
  is_active: boolean | null
}

interface SocialIntegrationsProps {
  initialAccounts: SocialAccount[]
}

interface PlatformConfig {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  connected: boolean
  accountName?: string
  accountId?: string
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

export function SocialIntegrations({ initialAccounts }: SocialIntegrationsProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>(initialAccounts)
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const platforms: PlatformConfig[] = [
    {
      id: "twitter",
      name: "Twitter / X",
      icon: <Twitter className="h-6 w-6" />,
      description: "Schedule tweets and track engagement",
      connected: accounts.some((account) => account.platform === "twitter"),
      accountName: accounts.find((account) => account.platform === "twitter")?.account_name,
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="h-6 w-6" />,
      description: "Post to your Facebook pages and groups",
      connected: accounts.some((account) => account.platform === "facebook"),
      accountName: accounts.find((account) => account.platform === "facebook")?.account_name,
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="h-6 w-6" />,
      description: "Schedule posts and stories",
      connected: accounts.some((account) => account.platform === "instagram"),
      accountName: accounts.find((account) => account.platform === "instagram")?.account_name,
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: <Youtube className="h-6 w-6" />,
      description: "Upload and schedule YouTube Shorts",
      connected: accounts.some((account) => account.platform === "youtube"),
      accountName: accounts.find((account) => account.platform === "youtube")?.account_name,
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: <TikTokIcon className="h-6 w-6" />,
      description: "Schedule TikTok videos and track performance",
      connected: accounts.some((account) => account.platform === "tiktok"),
      accountName: accounts.find((account) => account.platform === "tiktok")?.account_name,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="h-6 w-6" />,
      description: "Share updates and articles to your profile",
      connected: accounts.some((account) => account.platform === "linkedin"),
      accountName: accounts.find((account) => account.platform === "linkedin")?.account_name,
    },
  ]

  const handleConnect = async (platform: string) => {
    setIsConnecting(platform)
    setError(null)

    try {
      // In a real app, this would redirect to OAuth flow
      // For demo purposes, we'll simulate a connection
      const accountName = prompt(`Enter your ${platform} username:`)
      if (!accountName) {
        setIsConnecting(null)
        return
      }

      const result = await connectSocialAccount({
        platform,
        accountName,
      })

      if (!result.success) {
        throw new Error(result.error || "Failed to connect account")
      }

      setAccounts([...accounts, result.account])
    } catch (err) {
      console.error("Error connecting account:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsConnecting(null)
    }
  }

  const handleDisconnect = async (platform: string) => {
    if (!confirm(`Are you sure you want to disconnect your ${platform} account?`)) return

    try {
      const account = accounts.find((acc) => acc.platform === platform)
      if (!account) return

      await disconnectSocialAccount(account.id)
      setAccounts(accounts.filter((acc) => acc.id !== account.id))
    } catch (error) {
      console.error("Error disconnecting account:", error)
      setError("Failed to disconnect account")
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <Card key={platform.id} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">{platform.icon}</div>
              <div>
                <h3 className="font-medium">{platform.name}</h3>
                <p className="text-sm text-muted-foreground">{platform.description}</p>
              </div>
            </div>

            {platform.connected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Connected as {platform.accountName}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <ExternalLink className="h-3 w-3" />
                    <span className="text-xs">View Profile</span>
                  </Button>
                </div>
                <Button variant="outline" className="w-full" onClick={() => handleDisconnect(platform.id)}>
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={() => handleConnect(platform.id)}
                disabled={isConnecting === platform.id}
              >
                {isConnecting === platform.id ? "Connecting..." : "Connect"}
              </Button>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">API Documentation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Learn how to use our API to programmatically manage your social media accounts and posts.
        </p>
        <Button variant="outline" className="gap-2">
          <ExternalLink className="h-4 w-4" />
          View API Documentation
        </Button>
      </div>
    </div>
  )
}
