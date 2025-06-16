"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, X, Loader2, Video } from "lucide-react"
import { uploadMedia } from "@/lib/actions/media"
import { Progress } from "@/components/ui/progress"

interface MediaUploaderProps {
  isOpen: boolean
  onClose: () => void
  onUploadComplete: (media: any) => void
}

export function MediaUploader({ isOpen, onClose, onUploadComplete }: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [altText, setAltText] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isVideo, setIsVideo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file size (limit to 100MB for videos, 10MB for images)
    const isVideoFile = selectedFile.type.startsWith("video/")
    const maxSize = isVideoFile ? 100 * 1024 * 1024 : 10 * 1024 * 1024

    if (selectedFile.size > maxSize) {
      setError(`File size exceeds the limit (${isVideoFile ? "100MB" : "10MB"})`)
      return
    }

    setFile(selectedFile)
    setIsVideo(isVideoFile)
    setError(null)

    // Create preview
    if (isVideoFile) {
      const videoUrl = URL.createObjectURL(selectedFile)
      setPreview(videoUrl)
    } else if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (!droppedFile) return

    // Check file size (limit to 100MB for videos, 10MB for images)
    const isVideoFile = droppedFile.type.startsWith("video/")
    const maxSize = isVideoFile ? 100 * 1024 * 1024 : 10 * 1024 * 1024

    if (droppedFile.size > maxSize) {
      setError(`File size exceeds the limit (${isVideoFile ? "100MB" : "10MB"})`)
      return
    }

    setFile(droppedFile)
    setIsVideo(isVideoFile)
    setError(null)

    // Create preview
    if (isVideoFile) {
      const videoUrl = URL.createObjectURL(droppedFile)
      setPreview(videoUrl)
    } else if (droppedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(droppedFile)
    } else {
      setPreview(null)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const simulateProgress = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress > 95) {
        clearInterval(interval)
        progress = 95 // Hold at 95% until the actual upload completes
      }
      setUploadProgress(Math.min(progress, 95))
    }, 500)
    return interval
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    // Simulate upload progress
    const progressInterval = simulateProgress()

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("altText", altText)
      formData.append("title", title)
      formData.append("description", description)
      formData.append("isVideo", isVideo.toString())

      const result = await uploadMedia(formData)

      if (!result.success) {
        throw new Error(result.error || "Failed to upload media")
      }

      // Complete the progress bar
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Short delay to show 100% before closing
      setTimeout(() => {
        onUploadComplete(result.media)
        resetForm()
      }, 500)
    } catch (err) {
      clearInterval(progressInterval)
      console.error("Error uploading media:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setAltText("")
    setTitle("")
    setDescription("")
    setPreview(null)
    setIsVideo(false)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="relative">
                {isVideo ? (
                  <video ref={videoRef} src={preview} className="max-h-48 mx-auto" controls />
                ) : (
                  <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto" />
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFile(null)
                    setPreview(null)
                    setIsVideo(false)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ""
                    }
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">Drag and drop or click to upload</p>
                <p className="text-xs text-muted-foreground">Supports images (max 10MB) and videos (max 100MB)</p>
                <div className="flex gap-2 mt-2">
                  <div className="flex items-center gap-1 text-xs">
                    <Video className="h-3 w-3" />
                    <span>YouTube Shorts, Instagram Reels</span>
                  </div>
                </div>
              </div>
            )}
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,video/*"
            />
          </div>

          {file && (
            <div className="space-y-2">
              <Label htmlFor="fileName">File Name</Label>
              <Input id="fileName" value={file.name} disabled />
            </div>
          )}

          {isVideo && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Video Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a title for your video..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isUploading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Video Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your video..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isUploading}
                />
              </div>
            </>
          )}

          {!isVideo && (
            <div className="space-y-2">
              <Label htmlFor="altText">Alt Text (for images)</Label>
              <Textarea
                id="altText"
                placeholder="Describe this image..."
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                disabled={isUploading}
              />
              <p className="text-xs text-muted-foreground">
                Alt text helps make your content accessible to people with visual impairments.
              </p>
            </div>
          )}

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file || isUploading}>
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
