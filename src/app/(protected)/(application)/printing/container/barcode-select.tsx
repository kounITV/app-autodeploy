import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from "@/components/ui";
  
interface BarCodeOptionsProps {
  onChange: (value: string) => void;
  bgOptions: string,
}

export function BarCodeOptions({ onChange, bgOptions }: BarCodeOptionsProps) {
  return(
    <Select onValueChange={onChange} defaultValue="barcode">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="ເລືອກ" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="barcode">1.Barcode</SelectItem>
          {bgOptions !== "print:bg-none mix-blend-multiply" &&
            <SelectItem value="qrcode">2. QR code(Beta)</SelectItem>
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}