import { Button } from "@/components/ui";
import { Download } from "lucide-react";
import { cn } from "./utils";

export const handledDownloadImage = ({ src, name }: { src?: string, name?: string }) => {
  if (!src) {
    return;
  }
  fetch(src)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = name ? `${name}.jpeg` : "stay-permit.jpeg"
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    })
};
interface ImagePreviewProps {
  src?: string
  className?: string
  name?: string
}
export function DownloadImageButton({ src, name, className = "" }: ImagePreviewProps) {
  return (
    <>
      <Button className={"w-10"} size="icon" onClick={() => handledDownloadImage({ src, name })}>
        <div className={cn("w-full h-full", className)}>
          <Download className="w-full h-full" />
        </div>
      </Button>
    </>
  )
}

