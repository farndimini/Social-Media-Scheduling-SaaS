"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface VideoMediaSelectorProps {
  media: any[]
  selectedVideo: string | null
  onSelect: (id: string) => void
}

export function VideoMediaSelector({ media, selectedVideo, onSelect }: VideoMediaSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMedia = media.filter((item) => item.file_name.toLowerCase().includes(searchTerm.toLowerCase()))

  if (media.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No videos found in your media library</p>
        <p className="text-sm text-muted-foreground mt-2">Upload a new video or add videos to your library</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search videos..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className={`relative rounded-md overflow-hidden border cursor-pointer transition-all ${
              selectedVideo === item.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onSelect(item.id)}
          >
            <div className="aspect-video bg-muted relative">
              <video src={item.url} className="w-full h-full object-cover" poster={item.thumbnail_url || undefined} />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium truncate">{item.file_name}</p>
              <p className="text-xs text-muted-foreground">{(item.file_size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
