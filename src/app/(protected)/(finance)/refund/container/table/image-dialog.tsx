import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageDialogProps {
  images: { image: string }[]
}

export function ImageDialog({ images }: ImageDialogProps) {
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
  }
  const refundImage = images.length ? decodeURIComponent(images[currentIndex]?.image) : "";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          ເບິ່ງຮູບພາບ ({images.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] w-full h-full sm:w-4/5 sm:h-4/5 p-0 flex items-center justify-center bg-black/80 overflow-scroll">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white bg-red-500 z-50"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 text-white bg-black"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Image
          src={refundImage}
          alt={`Refund Image ${currentIndex + 1}`}
          width={1200}
          height={800}
          className="max-w-[90vw] max-h-[90vh] object-contain "
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 text-white bg-black"
          onClick={handleNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </DialogContent>
    </Dialog>
  )
}
