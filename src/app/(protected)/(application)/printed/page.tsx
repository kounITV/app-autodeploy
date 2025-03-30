"use client"

import { TitleLabel } from "@/components/containers/headerLabel"
import { CardPagination } from "@/components/containers/table/data-card-pagination"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/format-date"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useApplicationStatus } from "../application/hook/useApplicationStatus"
import { getOfficeId } from "@/lib/getSession"
import useApplicationList from "../application/hook/useTable"

enum ApplicationStatus {
  PROCESS = "PROCESS",
  FINISHED = "FINISHED",
}

export default function FolderShow() {
  const { onSubmit, loading } = useApplicationStatus();
  const { data: session } = useSession()
  const roleAccess = session?.user?.role === "ADMIN"
  const officeId = getOfficeId()
  const { result, meta, updatePagination } = useApplicationList({ printCountMin: 1, officeId })
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TitleLabel title='ລາຍການຜູ້ທີ່ອອກບັດແລ້ວ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນຜູ້ທີ່ອອກບັດແລ້ວລາຍການຫຼ້າສຸດ!' />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ລະຫັດຟອມ</TableHead>
              <TableHead>status</TableHead>
              <TableHead>ຊື່ ແລະ ນາມສະກຸນ</TableHead>
              <TableHead>ສັນຊາດ ແລະ ເຊື້ອຊາດ</TableHead>
              <TableHead>ຕໍາແໜ່ງ</TableHead>
              <TableHead>ບໍລິສັດ</TableHead>
              <TableHead>ຈໍານວນການພິມ</TableHead>
              <TableHead>ວັນທີອອກ</TableHead>
              <TableHead>ວັນໝົດອາຍຸ</TableHead>
              {roleAccess && <TableHead>ປ່ຽນສະຖານະ</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{`${record?.no}`}</TableCell>
                <TableCell>{`${record?.folder?.code}${record?.number?.number}`}</TableCell>
                <TableCell>{`${record?.status}`}</TableCell>
                <TableCell>{`${record?.profile?.firstName} ${record?.profile?.lastName}`}</TableCell>
                <TableCell>{`${record?.profile?.nationality.name} - ${record?.profile?.nationality.code}`}</TableCell>
                <TableCell>{`${record?.position.laoName} (${record?.position.englishName})`}</TableCell>
                <TableCell>{record?.company?.name}</TableCell>
                <TableCell>{record?.printCount}</TableCell>
                <TableCell>{formatDate({ date: record?.issueDate })}</TableCell>
                <TableCell>{formatDate({ date: record?.expirationDate })}</TableCell>
                {roleAccess && <TableCell>
                  <StatusChangeDialog record={record} onSubmit={onSubmit} loading={loading} />
                </TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CardPagination meta={meta} updatePagination={updatePagination} />
    </div>
  )
}

interface StatusChangeDialogProps {
  record: any
  onSubmit: (ids: number[], status: string) => Promise<void>
  loading: boolean
}

function StatusChangeDialog({ record, onSubmit, loading }: StatusChangeDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleStatusChange = async () => {
    if (selectedStatus) {
      await onSubmit([record.id], selectedStatus)
      setIsDialogOpen(false)
    }
  }
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          ປ່ຽນສະຖານະ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ປ່ຽນສະຖານະ</DialogTitle>
          <DialogDescription>
            ເລືອກສະຖານະໃໝ່ສໍາລັບການສະໝັກນີ້
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select
            onValueChange={(value) => setSelectedStatus(value as ApplicationStatus)}
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="ເລືອກສະຖານະ" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ApplicationStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleStatusChange} disabled={loading || !selectedStatus}>
            {loading ? 'ກໍາລັງດໍາເນີນການ...' : 'ຢືນຢັນ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}