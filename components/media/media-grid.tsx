"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Copy, FileText, ImageIcon, MoreHorizontal, Video } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteMedia } from "@/lib/actions/media"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format } from "date-fns"

interface MediaItem {
  id: string
  file_name: string
  file_type: string
  url: string
  thumbnail_url: string | null
  alt_text: string | null
  title: string | null
  description: string | null
  created_at: string | null
}

interface MediaGridProps {
  media: MediaItem[]
  onDelete: (id: string) => void
}

export function MediaGrid({ media, onDelete }: MediaGridProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media item?")) return

    try {
      await deleteMedia(id)
      onDelete(id)
    } catch (error) {
      console.error("Error deleting media:", error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("URL copied to clipboard")
      })
      .catch((err) => {
        console.error("Failed to copy URL:", err)
      })
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon className="h-6 w-6" />
    }
    if (fileType.startsWith("video/")) {
      return <Video className="h-6 w-6" />
    }
    return <FileText className="h-6 w-6" />
  }

  const formatFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`
    } else {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-square bg-muted">
              {item.file_type.startsWith("image/") ? (
                <Image
                  src={item.url || "/placeholder.svg"}
                  alt={item.alt_text || item.file_name}
                  fill
                  className="object-cover"
                  onClick={() => setSelectedMedia(item)}
                />
              ) : item.file_type.startsWith("video/") ? (
                <div className="h-full w-full relative" onClick={() => setSelectedMedia(item)}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground opacity-70" />
                  </div>
                  {item.thumbnail_url ? (
                    <Image
                      src={item.thumbnail_url || "/placeholder.svg"}
                      alt={item.title || item.file_name}
                      fill
                      className="object-cover opacity-80"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-800" />
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <p className="text-sm font-medium truncate">{item.title || item.file_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.created_at && format(new Date(item.created_at), "MMM d, yyyy")}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy URL
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedMedia(item)}>
                      {item.file_type.startsWith("video/") ? (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          Play Video
                        </>
                      ) : (
                        <>
                          <ImageIcon className="mr-2 h-4 w-4" />
                          View Details
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item.id)} className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
        {selectedMedia && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMedia.title || selectedMedia.file_name}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {selectedMedia.file_type.startsWith("image/") ? (
                <div className="relative aspect-video">
                  <Image
                    src={selectedMedia.url || "/placeholder.svg"}
                    alt={selectedMedia.alt_text || selectedMedia.file_name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : selectedMedia.file_type.startsWith("video/") ? (
                <video
                  src={selectedMedia.url}
                  controls
                  className="w-full aspect-video"
                  poster={selectedMedia.thumbnail_url || undefined}
                />
              ) : (
                <div className="flex items-center justify-center h-48 bg-muted">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">File Name</p>
                  <p className="text-sm text-muted-foreground">{selectedMedia.file_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">File Type</p>
                  <p className="text-sm text-muted-foreground">{selectedMedia.file_type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMedia.created_at && format(new Date(selectedMedia.created_at), "PPP")}
                  </p>
                </div>
                {selectedMedia.file_type.startsWith("image/") ? (
                  <div>
                    <p className="text-sm font-medium">Alt Text</p>
                    <p className="text-sm text-muted-foreground">{selectedMedia.alt_text || "None"}</p>
                  </div>
                ) : (
                  selectedMedia.file_type.startsWith("video/") && (
                    <>
                      <div>
                        <p className="text-sm font-medium">Title</p>
                        <p className="text-sm text-muted-foreground">{selectedMedia.title || "None"}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm text-muted-foreground">{selectedMedia.description || "None"}</p>
                      </div>
                    </>
                  )
                )}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => copyToClipboard(selectedMedia.url)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy URL
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(selectedMedia.id)
                    setSelectedMedia(null)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
