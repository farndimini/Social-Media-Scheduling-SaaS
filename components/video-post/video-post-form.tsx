"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, Video } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { createVideoPost } from "@/lib/actions/posts"
import { VideoMediaSelector } from "./video-media-selector"
import { VideoUploader } from "./video-uploader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface VideoPostFormProps {
  accounts: any[]
  media: any[]
}

export function VideoPostForm({ accounts, media }: VideoPostFormProps) {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("upload")
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null)

  // Filter accounts by platform
  const youtubeAccounts = accounts.filter((account) => account.platform === "youtube")
  const tiktokAccounts = accounts.filter((account) => account.platform === "tiktok")
  const instagramAccounts = accounts.filter((account) => account.platform === "instagram")

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

    if (!selectedVideo && !uploadedVideo) {
      setError("Please select or upload a video")
      setIsSubmitting(false)
      return
    }

    if (selectedPlatforms.length === 0) {
      setError("Please select at least one platform")
      setIsSubmitting(false)
      return
    }

    try {
      // In a real app, we would upload the video if it's a new upload
      // For now, we'll just use the selected video or a placeholder

      const videoId = selectedVideo || "placeholder-video-id"

      const result = await createVideoPost({
        title,
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
        videoId,
        platforms: selectedPlatforms,
        scheduledAt: date ? date.toISOString() : null,
      })

      if (result.success) {
        router.push("/dashboard/queue")
      } else {
        setError(result.error || "Failed to create video post")
      }
    } catch (error) {
      console.error("Error creating video post:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVideoUpload = (file: File, progress: number) => {
    setUploadProgress(progress)
    if (progress === 100) {
      setUploadedVideo(file)
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
          <Label htmlFor="title">Video Title</Label>
          <Input
            id="title"
            placeholder="Enter a title for your video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter a description for your video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input id="tags" placeholder="tag1, tag2, tag3" value={tags} onChange={(e) => setTags(e.target.value)} />
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
                    YouTube Shorts
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
                    TikTok
                  </Label>
                  <p className="text-sm text-muted-foreground">{tiktokAccounts[0].account_name}</p>
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
                    Instagram Reels
                  </Label>
                  <p className="text-sm text-muted-foreground">{instagramAccounts[0].account_name}</p>
                </div>
              </div>
            )}

            {youtubeAccounts.length === 0 && tiktokAccounts.length === 0 && instagramAccounts.length === 0 && (
              <div className="col-span-3 text-center py-4">
                <p className="text-muted-foreground">No video platforms connected</p>
                <Button variant="link" onClick={() => router.push("/dashboard/integrations")}>
                  Connect platforms
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Video</h3>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload New
              </TabsTrigger>
              <TabsTrigger value="library" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Media Library
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <VideoUploader onUpload={handleVideoUpload} progress={uploadProgress} />
              {uploadedVideo && (
                <div className="mt-4 p-4 border rounded-md">
                  <p className="font-medium">{uploadedVideo.name}</p>
                  <p className="text-sm text-muted-foreground">{(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="library">
              <VideoMediaSelector media={media} selectedVideo={selectedVideo} onSelect={setSelectedVideo} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Video Post"}
        </Button>
      </div>
    </form>
  )
}
