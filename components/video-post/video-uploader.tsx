"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X } from "lucide-react"

interface VideoUploaderProps {
  onUpload: (file: File, progress: number) => void
  progress: number
}

export function VideoUploader({ onUpload, progress }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("video/")) {
        handleFileSelected(droppedFile)
      }
    }
  }

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile)

    // Simulate upload progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 10
      onUpload(selectedFile, currentProgress)

      if (currentProgress >= 100) {
        clearInterval(interval)
      }
    }, 300)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    onUpload(null as any, 0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <h3 className="text-lg font-medium">Drag and drop your video</h3>
            <p className="text-sm text-muted-foreground mb-2">Supports MP4, MOV, and WebM formats</p>
            <p className="text-xs text-muted-foreground mb-4">Max file size: 100MB</p>
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              Select Video
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleFileChange} />
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium truncate">{file.name}</p>
            <Button type="button" variant="ghost" size="icon" onClick={handleRemoveFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right mt-1 text-muted-foreground">{progress}%</p>
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        <h4 className="font-medium mb-1">Video Requirements:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>YouTube Shorts: 9:16 aspect ratio, up to 60 seconds</li>
          <li>TikTok: 9:16 aspect ratio, up to 3 minutes</li>
          <li>Instagram Reels: 9:16 aspect ratio, up to 90 seconds</li>
        </ul>
      </div>
    </div>
  )
}
