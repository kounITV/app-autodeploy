import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

enum ApplicationStatus {
  DEFAULT = "DEFAULT",
}

interface StatusChangeDialogProps {
  record: any
  onSubmit: (ids: number[], status: string) => Promise<void>
  loading: boolean
}

export function StatusChangeDialog({ record, onSubmit, loading }: StatusChangeDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleStatusChange = async () => {
    await onSubmit([record.id], ApplicationStatus.DEFAULT)
    setIsDialogOpen(false)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)} className="bg-secondary">
          ປ່ຽນສະຖານະ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ປ່ຽນສະຖານະການພິມ</DialogTitle>
          <DialogDescription>
            ທ່ານຕ້ອງການປ່ຽນສະຖານະບໍ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            ຍົກເລີກ
          </Button>
          <Button
            disabled={loading}
            onClick={handleStatusChange}
          >
            ຢືນຢັນ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}