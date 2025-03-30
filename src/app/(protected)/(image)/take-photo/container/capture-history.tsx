"use client"

import { cn } from "@/lib/utils"

interface CaptureHistoryProps {
  images: string[]
  selectedImage: string | null
  onSelectImage: (image: string) => void
  aspectRatioPadding: string
}

export default function CaptureHistory({
  images,
  selectedImage,
  onSelectImage,
  aspectRatioPadding,
}: CaptureHistoryProps) {
  if (images.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No images captured yet.</div>
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "relative cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 hover:opacity-95",
            selectedImage === image
              ? "border-primary ring-2 ring-primary/20 shadow-md"
              : "border-transparent hover:border-primary/40",
          )}
          onClick={() => onSelectImage(image)}
        >
          <div style={{ paddingBottom: aspectRatioPadding }} className="relative">
            <img
              src={image || "/placeholder.svg"}
              alt={`Capture ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

