/* eslint-disable no-magic-numbers */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
/* eslint-disable max-depth */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/naming-convention */
"use client"

import { useRef, useState, useEffect } from "react"
import { Camera, Download, Trash2, Settings, ImageIcon, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import CaptureHistory from "./capture-history"
import ImageSettings from "./image-settings"
import { Skeleton } from "@/components/ui/skeleton"
import { UploadForm } from "./form"

// Define available aspect ratios and sizes
export type AspectRatio = "3:4" | "1:1" | "4:3" | "16:9"
export type ImageSize = "small" | "medium" | "large"

export interface ImageConfig {
  aspectRatio: AspectRatio
  size: ImageSize
  width: number
  height: number
}

const imageSizeConfigs: Record<AspectRatio, Record<ImageSize, { width: number; height: number }>> = {
  "3:4": {
    small: { width: 300, height: 400 },
    medium: { width: 600, height: 800 },
    large: { width: 900, height: 1200 },
  },
  "1:1": {
    small: { width: 400, height: 400 },
    medium: { width: 800, height: 800 },
    large: { width: 1200, height: 1200 },
  },
  "4:3": {
    small: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 900 },
  },
  "16:9": {
    small: { width: 427, height: 240 },
    medium: { width: 853, height: 480 },
    large: { width: 1280, height: 720 },
  },
}

export default function WebcamCapture() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImages, setCapturedImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 })
  const [isCapturing, setIsCapturing] = useState(false)

  // Add image configuration state
  const [imageConfig, setImageConfig] = useState<ImageConfig>({
    aspectRatio: "3:4",
    size: "medium",
    ...imageSizeConfigs["3:4"].medium,
  })

  // Start webcam
  const startWebcam = async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setCameraActive(true)
        setError(null)

        // Get video dimensions once video is loaded
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            setVideoDimensions({
              width: videoRef.current.videoWidth,
              height: videoRef.current.videoHeight,
            })
          }
        }
      }
    } catch {
      setError("Could not access webcam. Please ensure you've granted permission.")
      setCameraActive(false)
    }
  }

  // Stop webcam
  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setCameraActive(false)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  // Capture image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      setIsCapturing(true)

      setTimeout(() => {
        const video = videoRef.current
        const canvas = canvasRef.current
        const context = canvas?.getContext("2d")

        if (context && video && canvas) {
          // Set canvas dimensions based on current image config
          const { width, height } = imageConfig

          canvas.width = width
          canvas.height = height

          // Calculate source dimensions to maintain aspect ratio from the video
          const videoAspect = video.videoWidth / video.videoHeight
          const targetAspect = width / height

          let sourceWidth, sourceHeight, sourceX, sourceY

          if (videoAspect > targetAspect) {
            // Video is wider than target aspect ratio
            sourceHeight = video.videoHeight
            sourceWidth = sourceHeight * targetAspect
            sourceX = (video.videoWidth - sourceWidth) / 2
            sourceY = 0
          } else {
            // Video is taller than target aspect ratio
            sourceWidth = video.videoWidth
            sourceHeight = sourceWidth / targetAspect
            sourceX = 0
            sourceY = (video.videoHeight - sourceHeight) / 2
          }

          // Draw video frame to canvas with the correct aspect ratio
          context.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height)

          // Convert to data URL and add to captured images
          const imageDataUrl = canvas.toDataURL("image/png")
          setCapturedImages((prev) => [...prev, imageDataUrl])
          setSelectedImage(imageDataUrl)
          setIsCapturing(false)
        }
      }, 300)
    }
  }

  // Delete selected image
  const deleteSelectedImage = () => {
    if (selectedImage) {
      setCapturedImages((prev) => prev.filter((img) => img !== selectedImage))
      setSelectedImage(null)
    }
  }

  // Download selected image
  const downloadSelectedImage = () => {
    if (selectedImage) {
      const link = document.createElement("a")
      link.href = selectedImage
      link.download = `stay-permit-card-${new Date().toISOString()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const updateImageConfig = (newConfig: Partial<ImageConfig>) => {
    const aspectRatio = newConfig.aspectRatio || imageConfig.aspectRatio
    const size = newConfig.size || imageConfig.size

    setImageConfig({
      aspectRatio,
      size,
      ...imageSizeConfigs[aspectRatio][size],
    })
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const clearAllImages = () => {
    setCapturedImages([])
    setSelectedImage(null)
  }

  // Calculate aspect ratio CSS for display
  const getAspectRatioPadding = () => {
    const { width, height } = imageConfig
    return `${(height / width) * 100}%`
  }

  // Calculate crop overlay dimensions
  const getCropOverlayStyles = () => {
    if (!cameraActive || videoDimensions.width === 0) {
      return {}
    }
    const videoAspect = videoDimensions.width / videoDimensions.height
    const targetAspect = imageConfig.width / imageConfig.height

    let cropWidth, cropHeight, cropTop, cropLeft

    if (videoAspect > targetAspect) {
      cropHeight = "100%"
      cropWidth = `${(targetAspect / videoAspect) * 100}%`
      cropTop = "0"
      cropLeft = `${(100 - Number.parseFloat(cropWidth)) / 2}%`
    } else {
      cropWidth = "100%"
      cropHeight = `${(videoAspect / targetAspect) * 100}%`
      cropLeft = "0"
      cropTop = `${(100 - Number.parseFloat(cropHeight)) / 2}%`
    }

    return {
      cropArea: {
        position: "absolute" as const,
        top: cropTop,
        left: cropLeft,
        width: cropWidth,
        height: cropHeight,
        border: "2px solid #fff",
        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
        zIndex: 10,
        pointerEvents: "none" as const,
      },
    }
  }

  const cropStyles = getCropOverlayStyles()

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      <div className="flex-1">
        <Card className="mb-6 overflow-hidden border-none shadow-lg rounded-xl bg-gradient-to-b from-background to-background/80">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-2">
            <CardTitle className="flex items-center gap-2 text-xl font-medium">
              <Camera className="h-5 w-5" />
              ການຖ່າຍຮູບເວບເຄມ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              <div className="relative overflow-hidden bg-black rounded-b-xl">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto"
                  style={{ display: cameraActive ? "block" : "none" }}
                />

                {!cameraActive && (
                  <div
                    className="flex items-center justify-center bg-gradient-to-b from-muted/80 to-muted"
                    style={{
                      height: "400px",
                      width: "100%",
                    }}
                  >
                    <div className="text-center">
                      <Camera className="h-16 w-16 mx-auto text-muted-foreground/60" />
                      <p className="mt-2 text-muted-foreground">ກ້ອງຖ່າຍຮູບບໍ່ໃຊ້ງານ</p>
                    </div>
                  </div>
                )}
                {cameraActive && Object.keys(cropStyles).length > 0 && <div style={cropStyles.cropArea}></div>}

                {isCapturing && (
                  <div className="absolute inset-0 bg-white/20 flex items-center justify-center z-20">
                    <div className="bg-white/90 p-8 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md mx-4 my-2 flex items-center">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            )}

            <div className="flex justify-center gap-3 p-4 bg-muted/20">
              {!cameraActive ? (
                <Button
                  onClick={startWebcam}
                  size="lg"
                  className="px-6 rounded-full shadow-md bg-primary hover:bg-primary/90 transition-all"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  ເລີ່ມຖ່າຍຮູບ
                </Button>
              ) : (
                <>
                  <Button
                    onClick={captureImage}
                    variant="default"
                    size="lg"
                    className="px-6 rounded-full shadow-md bg-primary hover:bg-primary/90 transition-all"
                    disabled={isCapturing}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    {isCapturing ? "ກຳລັງຖ່າຍຮູບ..." : "ຖ່າຍຮູບ"}
                  </Button>
                  <Button
                    onClick={stopWebcam}
                    variant="outline"
                    size="lg"
                    className="px-6 rounded-full shadow-sm transition-all"
                  >
                    ປິດກ້ອງຖ່າຍຮູບ
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg overflow-hidden rounded-xl bg-gradient-to-b from-background to-background/80">
          <CardContent className="p-0">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="w-full rounded-none border-b bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="history"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent py-4 flex-1 text-base transition-all"
                >
                  ປະຫວັດການຖ່າຍຮູບ
                  {capturedImages.length > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
                      {capturedImages.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent py-4 flex-1 text-base transition-all"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  ການຕັ້ງຄ່າຮູບ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">ຮູບຖ່າຍຂອງທ່ານ</h2>
                  {capturedImages.length > 0 && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          ລຶບທັງໝົດ
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="border-none shadow-lg rounded-xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>ລຶບຮູບທັງໝົດ?</AlertDialogTitle>
                          <AlertDialogDescription>
                          ການກະທຳນີ້ບໍ່ສາມາດກັບໄປໄດ້. ນີ້ຈະລຶບຮູບຖ່າຍທັງໝົດອອກຢ່າງຖາວອນ.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={clearAllImages}
                            className="bg-destructive hover:bg-destructive/90 rounded-full"
                          >
                            ລຶບທັງໝົດ
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
                {capturedImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="bg-muted/30 p-6 rounded-full mb-4">
                      <ImageIcon className="h-12 w-12 text-muted-foreground/60" />
                    </div>
                    <p className="text-muted-foreground font-medium">ຍັງບໍ່ມີຮູບທີ່ຖ່າຍໄປແລ້ວ</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">Start the camera and take some photos</p>
                  </div>
                ) : (
                  <CaptureHistory
                    images={capturedImages}
                    selectedImage={selectedImage}
                    onSelectImage={setSelectedImage}
                    aspectRatioPadding={getAspectRatioPadding()}
                  />
                )}
              </TabsContent>

              <TabsContent value="settings" className="p-6">
                <ImageSettings imageConfig={imageConfig} updateImageConfig={updateImageConfig} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <Card className="border-none shadow-lg overflow-hidden rounded-xl bg-gradient-to-b from-background to-background/80 h-fit">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 pb-2">
            <CardTitle className="flex items-center gap-2 text-xl font-medium">
              <ImageIcon className="h-5 w-5" />
              ຮູບທີ່ເລືອກ
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {selectedImage ? (
              <div className="space-y-6">
                <div className="border rounded-xl overflow-hidden shadow-sm bg-muted/20 group relative">
                  <div className="relative" style={{ width: "100%", paddingBottom: getAspectRatioPadding() }}>
                    <img
                      src={selectedImage || "/placeholder.svg"}
                      alt="Selected capture"
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                </div>

                <div className="bg-muted/10 rounded-xl p-5 border border-muted">
                  <h3 className="text-base font-medium mb-4 flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    ອັບໂຫຼດຮູບເລືອກ
                  </h3>
                  <UploadForm image={selectedImage} />
                </div>

                <div className="flex gap-3 justify-center pt-2">
                  <Button
                    type="button"
                    onClick={downloadSelectedImage}
                    variant="outline"
                    className="rounded-full px-5 shadow-sm transition-all"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    ດາວໂຫຼດ
                  </Button>
                  <Button
                    type="button"
                    onClick={deleteSelectedImage}
                    variant="destructive"
                    className="rounded-full px-5 shadow-md transition-all"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    ລຶບ
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden border" style={{ paddingBottom: "75%" }}>
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-muted/80 to-muted">
                    <div className="text-center">
                      <div className="bg-muted/30 p-6 rounded-full mb-4 inline-block">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/60" />
                      </div>
                      <p className="mt-2 text-muted-foreground font-medium">ບໍ່ເລືອກຮູບ</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">ເລືອກຮູບຈາກຮູບຖ່າຍຂອງທ່ານ</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-center gap-3 pt-2">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-28" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

