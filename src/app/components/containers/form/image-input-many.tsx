"use client"

import { Button, Card, Dialog, DialogContent } from "@/components/ui"
import { cn } from "@/lib/utils"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { type Control, useController } from "react-hook-form"

interface ImageUploadProps {
  name: string
  control: Control<any>
  maxFiles?: number
  maxSizeInBytes?: number
  label?: string
  allowedFileTypes?: string[]
}

export function ImageUploadMany({
  name = "images",
  control,
  maxFiles = 5,
  maxSizeInBytes = 5 * 1024 * 1024,
  allowedFileTypes = ["image/jpeg", "image/png", "image/gif"],
}: ImageUploadProps) {
  const { field: { value, onChange }, fieldState: { error }, } = useController({ name, control, defaultValue: [], })

  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))
      onChange([...value, ...newFiles].slice(0, maxFiles))
    },
    [value, onChange, maxFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSizeInBytes,
    maxFiles: maxFiles - value.length,
  })

  const removeFile = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange(newFiles)
  }

  const navigatePreview = (direction: "left" | "right") => {
    if (previewIndex === null) return
    let newIndex = previewIndex + (direction === "left" ? -1 : 1)
    if (newIndex < 0) newIndex = value.length - 1
    if (newIndex >= value.length) newIndex = 0
    setPreviewIndex(newIndex)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((file: any, index: number) => (
          <Card
            key={index}
            className="relative w-[200px] h-[200px] flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={() => setPreviewIndex(index)}
          >
            <Image
              src={file.preview || "/placeholder.svg"}
              alt={`Preview ${index + 1}`}
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
                removeFile(index)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}
        {value.length < maxFiles && (
          <div
            {...getRootProps()}
            className={cn(
              "w-[200px] h-[200px] border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/10" : "border-gray-200 hover:border-primary",
            )}
          >
            <input {...getInputProps()} />
            <p className="text-center text-sm text-gray-500">"ດຶງໄຟລ໌ມາທີ່ນີ້ ຫຼື ຄລິກເພື່ອເລືອກໄຟລ໌"</p>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        ອັບໂຫລດຮູບພາບສູງສຸດ {maxFiles}MB ປະເພດທີ່ອະນຸຍາດ: {"jpeg, png, gif"}. ຂະຫນາດສູງສຸດ: {maxSizeInBytes / 1024 / 1024}MB ຕໍ່ຮູບ.
      </p>
      <Dialog open={previewIndex !== null} onOpenChange={(open) => !open && setPreviewIndex(null)}>
        <DialogContent className="max-w-3xl">
          {previewIndex !== null && (
            <div className="relative w-full h-[80vh]">
              <Image
                src={value[previewIndex]?.preview || "/placeholder.svg"}
                alt={`Full Preview ${previewIndex + 1}`}
                fill
                className="object-contain"
              />
              <Button
                className="absolute top-1/2 left-4 transform -translate-y-1/2"
                onClick={() => navigatePreview("left")}
                variant="outline"
                size="icon"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={() => navigatePreview("right")}
                variant="outline"
                size="icon"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

