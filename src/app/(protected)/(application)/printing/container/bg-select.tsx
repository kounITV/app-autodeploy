import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from "@/components/ui";

interface BgOptionProps {
  onChange: (value: string) => void;
}

export function BgOption({ onChange }: BgOptionProps) {
  return(
    <Select onValueChange={onChange} defaultValue="print:bg-none mix-blend-multiply">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="ເລືອກແບບການພິມ" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="print:bg-none mix-blend-multiply">1. ບັດໃນເຂດ</SelectItem>
          <SelectItem value="print:bg-[#B69E80]">2. ບັດນອກເຂດ</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}