import { cn } from "@/lib/utils";
import { useBarcode } from "next-barcode";

export function Barcode({ barcode, className }: { barcode: string, className?: string }) {
  const { inputRef } = useBarcode({
    value: barcode,
    options: {
      background: undefined,
      height: 25,
      displayValue: false,
      margin: 0,
    },
  });
  return <svg ref={inputRef} className={cn("w-auto h-[25px]", className )} />;
}