"use client"

import { Button, Card, Dialog, DialogContent } from "@/components/ui";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { type Control, useController } from "react-hook-form";

interface FileUploadProps {
  name: string;
  control: Control<any>;
  maxFiles?: number;
  maxSizeInBytes?: number;
  label?: string;
  allowedFileTypes?: string[];
}

export function FileUpload({
  name = "files",
  control,
  maxFiles = 10,
  maxSizeInBytes = 10 * 1024 * 1024,
  allowedFileTypes = ["application/pdf"],
}: FileUploadProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: [] });

  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
      }));
      onChange([...value, ...newFiles].slice(0, maxFiles));
    },
    [value, onChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxSizeInBytes,
    maxFiles: maxFiles - value.length,
  });

  const removeFile = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const navigatePreview = (direction: "left" | "right") => {
    if (previewIndex === null) return;
    let newIndex = previewIndex + (direction === "left" ? -1 : 1);
    if (newIndex < 0) newIndex = value.length - 1;
    if (newIndex >= value.length) newIndex = 0;
    setPreviewIndex(newIndex);
  };

  return (
    <div className="space-y-4">
      <div className="w-full space-y-3">
        {value.length < maxFiles && (
          <div
            {...getRootProps()}
            className={cn(
              "  h-[100px] border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors",
              isDragActive ? "border-primary bg-primary/10" : "border-gray-200 hover:border-primary"
            )}
          >
            <input {...getInputProps()} />
            <p className="text-center text-sm text-gray-500">ດຶງໄຟລ໌ມາທີ່ນີ້ ຫຼື ຄລິກເພື່ອເລືອກໄຟລ໌</p>
          </div>
        )}
         <div className="grid grid-cols-1 gap-y-2">
         {value.map((file: any, index: number) => (
          <Card
            key={index}
            className="relative  h-[60px] flex items-center  border border-gray-300 p-4 group cursor-pointer"
            onClick={() => setPreviewIndex(index)}
          >
            <FileText className="h-6 w-6 text-gray-600 mr-2" />
            <p className="text-sm truncate max-w-[150px] text-left">{file.name}</p>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(index);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}
         </div>
      </div>
      <p className="text-sm text-muted-foreground">
        ອັບໂຫລດໄຟລ໌ PDF ສູງສຸດ {maxFiles} ຟາຍ. ຂະຫນາດສູງສຸດ: {maxSizeInBytes / 1024 / 1024}MB ຕໍ່ໄຟລ໌.
      </p>
      <Dialog open={previewIndex !== null} onOpenChange={(open) => !open && setPreviewIndex(null)}>
        <DialogContent className="max-w-5xl">
          {previewIndex !== null && (
            <div className="relative w-full h-[80vh]">
              <iframe
                src={decodeURIComponent(value[previewIndex]?.preview)}
                title={`Preview ${previewIndex + 1}`}
                className="w-full h-full border"
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
  );
}
