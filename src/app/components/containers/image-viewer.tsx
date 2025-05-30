"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  Download,
  X,
  Maximize2,
  ImageOff,
  RefreshCw,
  Fullscreen,
  FlipHorizontal,
  FlipVertical,
  Minus,
  Plus,
  Move,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { handledDownloadImage } from "@/lib/downloadImage"

interface ImagePreviewProps {
  src?: string
  alt?: string
  thumbnail?: boolean
  className?: string
  name?: string
  aspectRatio?: "square" | "video" | "auto"
}

export function ImageViewer({
  src,
  name,
  alt = "Image preview",
  thumbnail = true,
  className = "",
  aspectRatio = "square",
}: ImagePreviewProps) {
  // State
  const [showPreview, setShowPreview] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [flipX, setFlipX] = useState(false)
  const [flipY, setFlipY] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Refs
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)

  // Motion values for dragging
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Reset transforms
  const resetTransforms = () => {
    setZoom(1)
    setRotation(0)
    setFlipX(false)
    setFlipY(false)
    x.set(0)
    y.set(0)
  }

  // Image manipulation handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5))
  const handleRotateClockwise = () => setRotation((prev) => prev + 90)
  const handleRotateCounterClockwise = () => setRotation((prev) => prev - 90)
  const handleFlipHorizontal = () => setFlipX((prev) => !prev)
  const handleFlipVertical = () => setFlipY((prev) => !prev)

  // Download handler
  const handleDownload = () => {
    if (!src) return

    const link = document.createElement("a")
    link.href = src
    link.download = name || "image"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Fullscreen handler
  const toggleFullscreen = () => {
    if (!fullscreenRef.current) return

    if (!document.fullscreenElement) {
      fullscreenRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    if (!showPreview) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) {
        setShowPreview(false)
        return
      }

      // Prevent default for these keys to avoid browser actions
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "+", "-", "r", "f", "h", "v"].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case "+":
          handleZoomIn()
          break
        case "-":
          handleZoomOut()
          break
        case "r":
          handleRotateClockwise()
          break
        case "R":
          handleRotateCounterClockwise()
          break
        case "h":
          handleFlipHorizontal()
          break
        case "v":
          handleFlipVertical()
          break
        case "f":
          toggleFullscreen()
          break
        case "0":
          resetTransforms()
          break
        case "d":
          handleDownload()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [showPreview])

  // Reset transforms when dialog closes
  useEffect(() => {
    if (!showPreview) {
      resetTransforms()
    }
  }, [showPreview])

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "auto":
        return "aspect-auto"
      default:
        return "aspect-square"
    }
  }

  return (
    <>
      {thumbnail ? (
        <motion.div
          onClick={() => src && !hasError && setShowPreview(true)}
          whileHover={src && !hasError ? { scale: 1.02 } : {}}
          className={cn(
            "group relative overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm h-fit",
            src && !hasError ? "hover:shadow-lg cursor-pointer" : "opacity-80",
            className,
          )}
        >
          <div
            className={cn("relative w-full overflow-hidden flex items-center justify-center", getAspectRatioClass())}
          >
            {src && !hasError ? (
              <>
                <Image
                  src={src || "/placeholder.svg"}
                  alt={alt}
                  unoptimized
                  fill
                  crossOrigin="anonymous"
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, 300px"
                  onError={() => setHasError(true)}
                />
                <motion.div
                  className="absolute inset-0 bg-black/0 flex items-center justify-center"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="bg-background/80 backdrop-blur-sm p-2 rounded-full"
                  >
                    <Maximize2 className="text-foreground h-5 w-5" />
                  </motion.div>
                </motion.div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                <ImageOff className="h-6 w-6 " />
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        <Button
          variant="outline"
          onClick={() => src && !hasError && setShowPreview(true)}
          disabled={!src || hasError}
          className="flex items-center justify-center gap-2"
        >
          {src && !hasError ? <Maximize2 className="h-4 w-4" /> : <ImageOff className="h-4 w-4" />}
          Preview
        </Button>
      )}

      <AnimatePresence>
        {src && !hasError && showPreview && (
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent
              ref={fullscreenRef}
              showCloseButton={false}
              className="max-w-[95vw] max-h-[95vh] p-0 gap-0 overflow-hidden border-none bg-background/95 backdrop-blur-md rounded-xl shadow-2xl"
            >
              <div className="absolute top-0 left-0 right-0 z-10 p-3 flex items-center justify-between bg-gradient-to-b from-background/90 to-background/0 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-normal bg-background/80">
                    {Math.round(zoom * 100)}%
                  </Badge>

                  {name && (
                    <span className="text-sm font-medium text-foreground/80 hidden sm:inline-block">{name}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <TooltipProvider delayDuration={300}>
                    <div className="hidden sm:flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Zoom Out (-)</TooltipContent>
                      </Tooltip>

                      <div className="w-24 px-2 hidden md:block">
                        <Slider
                          value={[zoom * 100]}
                          min={50}
                          max={300}
                          step={5}
                          onValueChange={(value) => setZoom(value[0] / 100)}
                          className="h-1"
                        />
                      </div>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">Zoom In (+)</TooltipContent>
                      </Tooltip>
                    </div>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRotateClockwise}>
                          <RotateCw className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Rotate CW (R)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hidden sm:flex"
                          onClick={handleRotateCounterClockwise}
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Rotate CCW (Shift+R)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hidden sm:flex"
                          onClick={handleFlipHorizontal}
                        >
                          <FlipHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Flip Horizontal (H)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hidden sm:flex"
                          onClick={handleFlipVertical}
                        >
                          <FlipVertical className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Flip Vertical (V)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={resetTransforms}>
                          <RefreshCw className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Reset (0)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleFullscreen}>
                          <Fullscreen className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Fullscreen (F)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handledDownloadImage({ src, name })}>
                          <Download className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Download (D)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowPreview(false)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">Close (Esc)</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div
                ref={imageContainerRef}
                className="relative w-full h-[calc(95vh-2rem)] overflow-hidden bg-muted/20 flex items-center justify-center"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 rounded-full border-4 border-muted-foreground/20"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin"></div>
                    </div>
                  </div>
                )}

                {zoom > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-muted-foreground z-10">
                    <Move className="h-3.5 w-3.5" />
                    <span>Scroll to navigate</span>
                  </div>
                )}

                <ScrollArea
                  className={cn(
                    "w-full h-full flex items-center justify-center",
                    zoom > 1 ? "overflow-auto" : "overflow-hidden",
                  )}
                  style={{
                    cursor: zoom > 1 ? "grab" : "default",
                  }}
                >
                  <div className="min-w-full min-h-full flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isLoading ? 0 : 1,
                        scale: zoom,
                        rotate: rotation,
                        scaleX: flipX ? -1 : 1,
                        scaleY: flipY ? -1 : 1,
                      }}
                      transition={{
                        opacity: { duration: 0.3 },
                        scale: { type: "spring", stiffness: 300, damping: 30 },
                        rotate: { type: "spring", stiffness: 200, damping: 30 },
                      }}
                      className="transform-gpu"
                    >
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={alt}
                        width={1200}
                        height={800}
                        unoptimized
                        className="max-h-[85vh] max-w-[85vw] object-contain rounded-md shadow-lg"
                        onLoad={() => setIsLoading(false)}
                        onError={() => setHasError(true)}
                        priority
                        draggable={false}
                      />
                    </motion.div>
                  </div>
                </ScrollArea>
              </div>

              {/* Mobile controls */}
              <div className="sm:hidden absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center gap-2 bg-gradient-to-t from-background/90 to-background/0 backdrop-blur-sm">
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={handleRotateClockwise}>
                  <RotateCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => handledDownloadImage({ src, name })}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

