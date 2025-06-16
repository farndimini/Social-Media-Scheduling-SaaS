"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaUploader } from "@/components/media/media-uploader"
import { MediaGrid } from "@/components/media/media-grid"
import { Plus, ImageIcon, FileImage } from "lucide-react"
import { useRouter } from "next/navigation"

interface MediaItem {
  id: string
  file_name: string
  file_type: string
  url: string
  thumbnail_url: string | null
  alt_text: string | null
  created_at: string | null
}

interface MediaLibraryProps {
  initialMedia: MediaItem[]
}

export function MediaLibrary({ initialMedia }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia)
  const [isUploaderOpen, setIsUploaderOpen] = useState(false)
  const router = useRouter()

  const handleMediaUploaded = (newMedia: MediaItem) => {
    setMedia([newMedia, ...media])
    setIsUploaderOpen(false)
  }

  const handleDeleteMedia = (id: string) => {
    setMedia(media.filter((item) => item.id !== id))
  }

  const images = media.filter((item) => item.file_type.startsWith("image/"))
  const otherFiles = media.filter((item) => !item.file_type.startsWith("image/"))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Your Media</h2>
          <p className="text-sm text-muted-foreground">
            {media.length} item{media.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => setIsUploaderOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Upload Media
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Media ({media.length})</TabsTrigger>
          <TabsTrigger value="images">Images ({images.length})</TabsTrigger>
          <TabsTrigger value="other">Other Files ({otherFiles.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {media.length > 0 ? (
            <MediaGrid media={media} onDelete={handleDeleteMedia} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileImage className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No media files yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload media to use in your posts</p>
                <Button onClick={() => setIsUploaderOpen(true)}>Upload Media</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="images">
          {images.length > 0 ? (
            <MediaGrid media={images} onDelete={handleDeleteMedia} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No images yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload images to use in your posts</p>
                <Button onClick={() => setIsUploaderOpen(true)}>Upload Images</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="other">
          {otherFiles.length > 0 ? (
            <MediaGrid media={otherFiles} onDelete={handleDeleteMedia} />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileImage className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No other files yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload files to use in your posts</p>
                <Button onClick={() => setIsUploaderOpen(true)}>Upload Files</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <MediaUploader
        isOpen={isUploaderOpen}
        onClose={() => setIsUploaderOpen(false)}
        onUploadComplete={handleMediaUploaded}
      />
    </div>
  )
}
