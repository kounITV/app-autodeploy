"use client"

import { Button, Card, Dialog, DialogContent, Input } from "@/components/ui"
import { cn } from "@/lib/utils"
import { X, ChevronLeft, ChevronRight, ImagePlus } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { type Control, useController } from "react-hook-form"

interface ImageItem {
  file: File
  preview: string
  name: string
}

interface ImageUploadProps {
  name: string
  control: Control<any>
  maxFiles?: number
  maxSizeInBytes?: number
  label?: string
  allowedFileTypes?: string[]
}

export function ImageUploadManyName({
  name = "images",
  control,
  maxFiles = 5,
  maxSizeInBytes = 5 * 1024 * 1024,
  allowedFileTypes = ["image/jpeg", "image/png", "image/gif"],
}: ImageUploadProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
    rules: {
      validate: (value) => {
        if (!value || value.length === 0) return "At least one image is required"
        if (value.some((item: { name: any }) => !item.name)) return "All images must have names"
        return true
      },
    },
  })

  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: "",
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
    URL.revokeObjectURL(newFiles[index].preview)
    newFiles.splice(index, 1)
    onChange(newFiles)
  }

  const updateFileName = (index: number, newName: string) => {
    const newFiles = [...value]
    newFiles[index] = {
      ...newFiles[index],
      name: newName,
    }
    onChange(newFiles)
  }

  const navigatePreview = (direction: "left" | "right") => {
    if (previewIndex === null) return
    let newIndex = previewIndex + (direction === "left" ? -1 : 1)
    if (newIndex < 0) newIndex = value.length - 1
    if (newIndex >= value.length) newIndex = 0
    setPreviewIndex(newIndex)
  }

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (value && value.length) {
        value.forEach((item: ImageItem) => {
          URL.revokeObjectURL(item.preview)
        })
      }
    }
  }, [value])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((item: ImageItem, index: number) => (
          <Card key={index} className="relative w-[200px] h-[280px] flex flex-col overflow-hidden">
            <div
              className="relative w-full h-[200px] flex items-center justify-center overflow-hidden group cursor-pointer"
              onClick={() => setPreviewIndex(index)}
            >
              <Image
                src={item.preview || "/placeholder.svg"}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    setPreviewIndex(index)
                  }}
                >
                  View
                </Button>
              </div>
            </div>

            <div className="p-3 flex-1 flex flex-col">
              <Input
                value={item.name}
                onChange={(e) => updateFileName(index, e.target.value)}
                placeholder="Enter image name"
                className="w-full mb-2"
              />

              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                  {item.file.name.length > 15 ? `${item.file.name.substring(0, 15)}...` : item.file.name}
                </span>
                <Button type="button" variant="destructive" size="sm" onClick={() => removeFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {value.length < maxFiles && (
          <div
            {...getRootProps()}
            className={cn(
              "w-[200px] h-[280px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/10" : "border-gray-200 hover:border-primary",
            )}
          >
            <input {...getInputProps()} />
            <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-center text-sm text-gray-500 px-4">ດຶງໄຟລ໌ມາທີ່ນີ້ ຫຼື ຄລິກເພື່ອເລືອກໄຟລ໌</p>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        ອັບໂຫລດຮູບພາບສູງສຸດ {maxFiles} ຮູບ. ປະເພດທີ່ອະນຸຍາດ: jpeg, png, gif. ຂະຫນາດສູງສຸດ: {maxSizeInBytes / 1024 / 1024}MB ຕໍ່ຮູບ.
      </p>

      {error && <p className="text-sm text-destructive">{error.message}</p>}

      {/* Data Preview */}
      {value.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Data Preview:</h3>
          <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[200px] text-xs">
            {JSON.stringify(
              value.map((item: ImageItem) => ({
                image: item.file.name,
                name: item.name,
              })),
              null,
              2,
            )}
          </pre>
        </div>
      )}

      <Dialog open={previewIndex !== null} onOpenChange={(open) => !open && setPreviewIndex(null)}>
        <DialogContent className="max-w-3xl p-0">
          {previewIndex !== null && value[previewIndex] && (
            <div className="relative w-full h-[80vh]">
              <Image
                src={value[previewIndex]?.preview || "/placeholder.svg"}
                alt={value[previewIndex]?.name || `Full Preview ${previewIndex + 1}`}
                fill
                className="object-contain"
              />
              <div className="absolute top-0 left-0 right-0 bg-background/80 p-2 text-center">
                <h3 className="font-medium">{value[previewIndex]?.name || `Image ${previewIndex + 1}`}</h3>
              </div>
              <Button
                className="absolute top-1/2 left-4 transform -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation()
                  navigatePreview("left")
                }}
                variant="outline"
                size="icon"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation()
                  navigatePreview("right")
                }}
                variant="outline"
                size="icon"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setPreviewIndex(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

