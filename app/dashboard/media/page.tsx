import { MediaLibrary } from "@/components/media/media-library"
import { getMediaItems } from "@/lib/actions/media"

export default async function MediaPage() {
  const mediaItems = await getMediaItems().catch(() => [])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Media Library</h1>
      <p className="text-muted-foreground">Upload and manage your media assets</p>

      <MediaLibrary initialMedia={mediaItems} />
    </div>
  )
}
