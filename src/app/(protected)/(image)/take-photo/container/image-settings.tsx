"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import type { AspectRatio, ImageConfig, ImageSize } from "./webcam-capture"

interface ImageSettingsProps {
  imageConfig: ImageConfig
  updateImageConfig: (config: Partial<ImageConfig>) => void
}

export default function ImageSettings({ imageConfig, updateImageConfig }: ImageSettingsProps) {
  const aspectRatios: { value: AspectRatio; label: string; description: string }[] = [
    { value: "3:4", label: "3:4", description: "ຮູບແບບ (ບັດປະຈຳຕົວ, ພາສັດ)" },
    { value: "1:1", label: "1:1", description: "ສວັດ (ຮູບໂປຣຟາຍ)" },
    { value: "4:3", label: "4:3", description: "ຮູບແບບກວ້າງ" },
    { value: "16:9", label: "16:9", description: "ຫນ້າຈໍກວ້າງ" },
  ]
  const sizes: { value: ImageSize; label: string; description: string }[] = [
    { value: "small", label: "ນ້ອຍ", description: "ຮູບຂະໜາດນ້ອຍ" },
    { value: "medium", label: "ກາງ", description: "ໃຊ້ງານມາດຕະຖານ (ເລີ່ມຕົ້ນ)" },
    { value: "large", label: "ໃຫຍ່", description: "ພິມຄຸນນະພາບສູງ" },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">ອັດຕາສ່ວນພາບ</h3>
        <RadioGroup
          value={imageConfig.aspectRatio}
          onValueChange={(value) => updateImageConfig({ aspectRatio: value as AspectRatio })}
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          {aspectRatios.map((ratio) => (
            <div key={ratio.value} className="flex items-start space-x-2">
              <RadioGroupItem value={ratio.value} id={`ratio-${ratio.value}`} className="mt-1" />
              <Label htmlFor={`ratio-${ratio.value}`} className="flex flex-col cursor-pointer">
                <span className="font-medium">{ratio.label}</span>
                <span className="text-sm text-muted-foreground">{ratio.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">ຂະໜາດຮູບ</h3>
        <RadioGroup
          value={imageConfig.size}
          onValueChange={(value) => updateImageConfig({ size: value as ImageSize })}
          className="grid grid-cols-1 md:grid-cols-3 gap-2"
        >
          {sizes.map((size) => (
            <div key={size.value} className="flex items-start space-x-2">
              <RadioGroupItem value={size.value} id={`size-${size.value}`} className="mt-1" />
              <Label htmlFor={`size-${size.value}`} className="flex flex-col cursor-pointer">
                <span className="font-medium">{size.label}</span>
                <span className="text-sm text-muted-foreground">{size.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">ການຕັ້ງຄ່າປະຈຸບັນ</h4>
          <div className="text-sm space-y-1">
            <p>
              ອັດຕາພາບ: <span className="font-medium">{imageConfig.aspectRatio}</span>
            </p>
            <p>
              ຂະໜາດ: <span className="font-medium">{imageConfig.size}</span>
            </p>
            <p>
              ມາດຕະຖານ:{" "}
              <span className="font-medium">
                {imageConfig.width} × {imageConfig.height} ພິກເຊວ
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
  