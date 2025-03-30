"use client"

import { Button } from "@/components/ui/button"
import { Eye, Download, Trash2, FileIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

interface FilePreviewProps {
  file: File
  onDelete: () => void
}

export function FilePreview({ file, onDelete }: FilePreviewProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="flex items-center justify-between py-2 px-4 bg-gray-50 rounded-md">
      <div className="flex items-center gap-2">
        <FileIcon className="w-4 h-4 text-blue-500" />
        <span className="text-sm text-gray-600">{file.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowPreview(true)}>
          <Eye className="h-4 w-4 text-gray-500" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            const url = URL.createObjectURL(file)
            const a = document.createElement("a")
            a.href = url
            a.download = file.name
            a.click()
            URL.revokeObjectURL(url)
          }}
        >
          <Download className="h-4 w-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDelete}>
          <Trash2 className="h-4 w-4 text-gray-500" />
        </Button>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{file.name}</DialogTitle>
          </DialogHeader>
          <iframe src={URL.createObjectURL(file)} className="w-full h-full" title="PDF Preview" />
        </DialogContent>
      </Dialog>
    </div>
  )
}

