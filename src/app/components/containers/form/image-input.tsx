"use client"

import type React from "react"
import { ImagePlus, Trash2, Crop, Check, ZoomIn, ZoomOut } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Input, Button, Dialog, DialogContent } from "@/components/ui"
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/crop-image";

interface ImageInputProps {
  iconImage?: React.ReactNode
  [key: string]: any
}

export const ImageInput = ({ iconImage, label = "ເລືອກຮູບພາບ", ...props }: ImageInputProps) => {
  const displayImage = props.value ?? ""
  const typeOf = typeof displayImage
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState(displayImage)
  const [fileName, setFileName] = useState<string>("")
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  useEffect(() => {
    if (typeOf === "string") {
      setPreview(props.value)
    }
  }, [props.value, typeOf])
  useEffect(() => {
    if (!showFullPreview) {
      setZoom(1)
      setRotation(0)
    }
  }, [showFullPreview])
  useEffect(() => {
    if (typeOf === "string" && props.value !== preview) {
      setPreview(props.value)
    }
  }, [props.value])

  const onCropComplete = (_:any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }
  
  const handleCropSave = async () => {
    if (!croppedAreaPixels) return
    const croppedImage = await getCroppedImg(preview, croppedAreaPixels)
    const objectUrl = URL.createObjectURL(croppedImage)
    setPreview(objectUrl)
    setShowFullPreview(false)
    if (props.onChange) props.onChange(croppedImage)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : undefined
    const displayUrl = file ? URL.createObjectURL(file) : ""
    setPreview(displayUrl)
    if (file) {
      setFileName(file.name)
    }
    if (props.onChange && file) {
      props.onChange(file)
    } else if (props.onChange) {
      props.onChange(undefined)
    }
  }

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setPreview("")
    if (inputRef.current) inputRef.current.value = ""
    if (props.onChange) {
      props.onChange(undefined)
    }
  }

  const handleExpandImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setShowFullPreview(true)
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 1))
  const handleResetZoom = () => {
    setZoom(1)
    setRotation(0)
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleDownload = () => {
    if (!preview) return

    const link = document.createElement("a")
    link.href = preview
    link.download = `image-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  console.log(fileName)
  return (
    <div className="space-y-2 relative">
      <Button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="bg-primary text-white hover:bg-primary/90"
      >
        ເລືອກຮູບພາບ
      </Button>

      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            handleFileChange(e);
            setShowFullPreview(true);
          }
        }}
      />
      {fileName && (
        <div className="flex gap-1 absolute -bottom-10 bg-secondary rounded-md p-1">
          <div className="text-sm text-gray-700 w-[79px] underline cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap" onClick={() => setShowFullPreview(true)}>
            {fileName}
          </div>
          <button onClick={(e) => {
            handleRemoveImage(e)
            setFileName("")
          }}>X</button>
        </div>
      )}
      <Dialog open={showFullPreview} onOpenChange={setShowFullPreview}>
        <DialogContent className="max-w-4xl p-1">
          <div className="relative w-full h-[80vh]">
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={3.8 / 5}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              objectFit="vertical-cover"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button variant="secondary" onClick={handleZoomOut}><ZoomOut size={"medium"} /></Button>
              <Button variant="secondary" onClick={handleZoomIn}><ZoomIn size={"medium"} /></Button>
              <Button onClick={(e) => {
                handleRemoveImage(e)
                setShowFullPreview(false)
                }}>ຍົກເລີກ</Button>
              <Button onClick={handleCropSave} className="flex gap-2"><Check size="medium" />ຢືນຢັນ</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

