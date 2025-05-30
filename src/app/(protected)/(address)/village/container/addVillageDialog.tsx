import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import DistrictForm from "./form/form";
import { useVillageFormDialog } from "../hook/useForm";

export function AddVillageDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void} ) {
  const { form, onSubmit } = useVillageFormDialog(onOpenChange);
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className="sm:max-w-[425px] p-0 border-none">
        <DistrictForm form={form} onSubmit={onSubmit} className="md:grid-cols-1 "/>
      </DialogContent>
    </Dialog>
  )
}
