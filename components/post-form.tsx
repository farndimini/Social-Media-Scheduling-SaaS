"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { createPost } from "@/lib/actions/posts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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

interface PostFormProps {
  accounts: any[]
}

export function PostForm({ accounts }: PostFormProps) {
  const router = useRouter()
  const [content, setContent] = useState("")
  const [link, setLink] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Group accounts by platform
  const twitterAccounts = accounts.filter((account) => account.platform === "twitter")
  const facebookAccounts = accounts.filter((account) => account.platform === "facebook")
  const instagramAccounts = accounts.filter((account) => account.platform === "instagram")
  const youtubeAccounts = accounts.filter((account) => account.platform === "youtube")
  const tiktokAccounts = accounts.filter((account) => account.platform === "tiktok")
  const linkedinAccounts = accounts.filter((account) => account.platform === "linkedin")

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!content) {
      setError("Please enter some content for your post")
      setIsSubmitting(false)
      return
    }

    if (selectedPlatforms.length === 0) {
      setError("Please select at least one platform")
      setIsSubmitting(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("content", content)

      if (link) {
        formData.append("link", link)
      }

      if (date) {
        formData.append("scheduledAt", date.toISOString())
      }

      selectedPlatforms.forEach((platform) => {
        formData.append("platforms", platform)
      })

      const result = await createPost(formData)

      if (result.success) {
        router.push("/dashboard/queue")
      } else {
        setError(result.error || "Failed to create post")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="content">Post Content</Label>
          <Textarea
            id="content"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="link">Link (optional)</Label>
          <Input id="link" placeholder="https://example.com" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Schedule</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Schedule for later"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Select Platforms</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {twitterAccounts.length > 0 && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="twitter"
                  checked={selectedPlatforms.includes("twitter")}
                  onCheckedChange={() => handlePlatformToggle("twitter")}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="twitter"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">{twitterAccounts[0].account_name}</p>
                </div>
              </div>
            )}

            {facebookAccounts.length > 0 && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="facebook"
                  checked={selectedPlatforms.includes("facebook")}
                  onCheckedChange={() => handlePlatformToggle("facebook")}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="facebook"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">{facebookAccounts[0].account_name}</p>
                </div>
              </div>
            )}

            {instagramAccounts.length > 0 && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="instagram"
                  checked={selectedPlatforms.includes("instagram")}
                  onCheckedChange={() => handlePlatformToggle("instagram")}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="instagram"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">{instagramAccounts[0].account_name}</p>
                </div>
              </div>
            )}

            {youtubeAccounts.length > 0 && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="youtube"
                  checked={selectedPlatforms.includes("youtube")}
                  onCheckedChange={() => handlePlatformToggle("youtube")}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="youtube"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      <Youtube className="h-4 w-4" />
                      YouTube
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">{youtubeAccounts[0].account_name}</p>
                </div>
              </div>
            )}

            {tiktokAccounts.length > 0 && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="tiktok"
                  checked={selectedPlatforms.includes("tiktok")}
                  onCheckedChange={() => handlePlatformToggle("tiktok")}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="tiktok"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      <TikTokIcon className="h-4 w-4" />
                      TikTok
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">{tiktokAccounts[0].account_name}</p>
                </div>
              </div>
            )}

            {linkedinAccounts.length > 0 && (
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="linkedin"
                  checked={selectedPlatforms.includes("linkedin")}
                  onCheckedChange={() => handlePlatformToggle("linkedin")}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="linkedin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </div>
                  </Label>
                  <p className="text-sm text-muted-foreground">{linkedinAccounts[0].account_name}</p>
                </div>
              </div>
            )}

            {twitterAccounts.length === 0 &&
              facebookAccounts.length === 0 &&
              instagramAccounts.length === 0 &&
              youtubeAccounts.length === 0 &&
              tiktokAccounts.length === 0 &&
              linkedinAccounts.length === 0 && (
                <div className="col-span-3 text-center py-4">
                  <p className="text-muted-foreground">No social accounts connected</p>
                  <Button variant="link" onClick={() => router.push("/dashboard/integrations")}>
                    Connect accounts
                  </Button>
                </div>
              )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Post"}
        </Button>
      </div>
    </form>
  )
}
