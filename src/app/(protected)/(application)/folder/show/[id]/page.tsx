/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
"use client"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, MoreHorizontal, FileText, User, Calendar, Building, Home } from "lucide-react"

import { TitleLabel } from "@/components/containers/headerLabel"
import { WarningMessage } from "@/components/containers/warning-message"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useOne } from "@/hooks/useOne"
import { formatDate } from "@/lib/format-date"
// import useApplicationList from "src/app/(protected)/application/hook/useTable"
// import { useApplicationStatus } from "../../../application/hook/useApplicationStatus"
import FolderCardView from "../../container/card"
import { getOfficeIds } from "@/lib/getSession"
import { ImageViewer } from "@/components/containers/image-viewer"
import type { IFolder } from "../../type"
import { useApplicationStatus } from "src/app/(protected)/(application)/application/hook/useApplicationStatus"
import useApplicationList from "src/app/(protected)/(application)/application/hook/useTable"

export default function FolderShow({ params }: { params: { id: number } }) {
  const router = useRouter()
  const officeListIds = getOfficeIds()
  const { data: session } = useSession()
  const role = session?.user?.role === "POLICE_PRODUCTION"
  const { onSubmit, loading } = useApplicationStatus()
  const { data } = useOne<IFolder>({ resource: "folder", id: params.id })
  const { result } = useApplicationList({ folderId: params.id, officeIds: officeListIds })
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  const handleCheckboxChange = (id: number) => {
    setSelectedIds((prevIds) => {
      const isIdSelected = prevIds.includes(id)
      return isIdSelected ? prevIds.filter(removeId(id)) : [...prevIds, id]
    })
  }

  const removeId = (id: number) => (prevId: number) => prevId !== id

  const handleSelectAll = () => {
    setSelectedIds(selectedIds.length === result.length ? [] : result.map((record) => record.id))
  }

  const handleAction = () => {
    onSubmit(selectedIds, "APPROVED")
    setSelectedIds([])
    setIsDialogOpen(false)
  }

  const application = {
    DEFAULT: "ຍັງບໍ່ທັນກວດແລ້ວ",
    APPROVED: "ກວດແລ້ວ",
    PROCESS: "ກຳລັງປະຕິບັດການ",
    FINISHED: "ສຳເລັດ",
  }

  const handleEditProfile = (id: number) => {
    router.push(`/profile/edit/${id}`)
  }

  const handleEditApplication = (id: number) => {
    router.push(`/application/edit/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TitleLabel title="ຄຸ້ມຄອງແຟ້ມ ແລະ ແບບຟອມ" subtitle="ນີ້ແມ່ນລາຍການຂໍ້ມູນແຟ້ມ ແລະ ແບບຟອມຜູ່ຂໍອອກບັດພັກເຊົາຊົ່ວຄາວ!" />

        <div className="flex items-center gap-2">
          {role && selectedIds.length > 0 && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="gap-2">
                  <Check className="h-4 w-4" />
                  ກວດ ({selectedIds.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>ທ່ານແນ່ໃຈບໍ?</DialogTitle>
                  <DialogDescription>
                    <div>ການດຳເນີນການນີ້ບໍ່ສາມາດຍ້ອນຄືນໄດ້, ກວດໝັງໝົດ {selectedIds.length} ບັດ.</div>
                  </DialogDescription>
                  <WarningMessage />
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={handleAction} disabled={loading}>
                    ຢືນຢັນ
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <div className="w-[200px]">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
              className="w-full"
            >
              {viewMode === "table" ? "ສະແດງແບບກຣິດ" : "ສະແດງແບບຕາຕະລາງ"}
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        {role && (
          <FolderCardView
            folder={data?.result as IFolder}
            action={{ acceptText: "ສົ່ງຜະລິດ" }}
            status={"IN_PRODUCTION"}
          />
        )}
        {role !== true && <FolderCardView folder={data?.result as IFolder} status={"IN_PRODUCTION"} />}
      </div>
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">ລາຍການແບບຟອມ</CardTitle>
          <CardDescription>ລາຍການແບບຟອມທັງໝົດໃນແຟ້ມນີ້</CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === "table" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedIds.length === result.length && result.length > 0}
                        onCheckedChange={handleSelectAll}
                        disabled={!role}
                      />
                    </TableHead>
                    <TableHead>ຮູບ</TableHead>
                    <TableHead>ລະຫັດຟອມ</TableHead>
                    <TableHead>ຊື່ ແລະ ນາມສະກຸນ</TableHead>
                    <TableHead>ສັນຊາດ ແລະ ເຊື້ອຊາດ</TableHead>
                    <TableHead>ຕໍາແໜ່ງ</TableHead>
                    <TableHead>ຂື້ນກັບ</TableHead>
                    <TableHead>ຫົວໜ່ວຍທຸລະກິດ ຫຼື ບ້ານ</TableHead>
                    <TableHead>ສະຖານະ</TableHead>
                    <TableHead>ວັນທີອອກ</TableHead>
                    <TableHead>ວັນໝົດອາຍຸ</TableHead>
                    <TableHead className="text-right">ຈັດການ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="h-24 text-center">
                        ບໍ່ມີຂໍ້ມູນ
                      </TableCell>
                    </TableRow>
                  ) : (
                    result.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(record.id)}
                            onCheckedChange={() => handleCheckboxChange(record.id)}
                            disabled={!role}
                          />
                        </TableCell>
                        <TableCell>
                          <ImageViewer src={record?.profile?.image} className="my-1 rounded-md" />
                        </TableCell>
                        <TableCell className="font-medium">{`${record?.folder?.code}${record?.number?.number}`}</TableCell>
                        <TableCell>{`${record?.profile?.firstName} ${record?.profile?.lastName}`}</TableCell>
                        <TableCell>{`${record?.profile?.nationality.name} - ${record?.profile?.nationality.code}`}</TableCell>
                        <TableCell>{`${record?.position.laoName} (${record?.position.englishName})`}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-normal">
                            {getDependByLabel(record?.dependBy)}
                          </Badge>
                        </TableCell>
                        <TableCell>{`${record?.dependBy === "VILLAGE" && record?.village?.villageLao} ${record?.dependBy === "COMPANY" && record?.company?.name}`}</TableCell>
                        <TableCell>
                          <Badge variant={getBadgeVariant(record?.status)}>
                            {application[record?.status as keyof typeof application] || "Unknown Status"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate({ date: record?.issueDate })}</TableCell>
                        <TableCell>{formatDate({ date: record?.expirationDate })}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                              <DropdownMenuItem onClick={() => handleEditProfile(record.profile.id)}>
                                <User className="mr-2 h-4 w-4" />
                                ແກ້ໄຂຂໍ້ມຸນບຸກຄົນ
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditApplication(record.id)}>
                                <FileText className="mr-2 h-4 w-4" />
                                ແກ້ໄຂຂໍ້ມຸນຟອມ
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.length === 0 ? (
                <div className="col-span-full text-center py-10">ບໍ່ມີຂໍ້ມູນ</div>
              ) : (
                result.map((record) => (
                  <Card key={record.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="text-base font-medium">
                          {`${record?.profile?.firstName} ${record?.profile?.lastName}`}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {`${record?.folder?.code}${record?.number?.number}`}
                        </CardDescription>
                      </div>
                      {role && (
                        <Checkbox
                          checked={selectedIds.includes(record.id)}
                          onCheckedChange={() => handleCheckboxChange(record.id)}
                        />
                      )}
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex mb-3">
                        <div className="w-20 h-24 mr-3 flex-shrink-0 overflow-hidden rounded-md border">
                          <ImageViewer src={record?.profile?.image} className="h-full w-full object-cover" />
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{`${record?.position.laoName}`}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {record?.dependBy === "COMPANY" ? (
                              <Building className="h-3.5 w-3.5 text-muted-foreground" />
                            ) : (
                              <Home className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            <span>
                              {`${record?.dependBy === "VILLAGE" && record?.village?.villageLao} ${record?.dependBy === "COMPANY" && record?.company?.name}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>
                              {formatDate({ date: record?.issueDate })} - {formatDate({ date: record?.expirationDate })}
                            </span>
                          </div>
                          <div className="pt-1">
                            <Badge variant={getBadgeVariant(record?.status)}>
                              {application[record?.status as keyof typeof application] || "Unknown Status"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => handleEditProfile(record.profile.id)}>
                        ແກ້ໄຂຂໍ້ມຸນບຸກຄົນ
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditApplication(record.id)}>
                        ແກ້ໄຂຂໍ້ມຸນຟອມ
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const getBadgeVariant = (status: string): "secondary" | "default" | "outline" | "destructive" | undefined => {
  switch (status) {
    case "APPROVED":
      return "default";
    case "DEFAULT":
      return "default";
    case "PROCESS":
      return "secondary";
    case "FINISHED":
      return "outline";
    default:
      return undefined;
  }
};
const getDependByLabel = (status: string | undefined) => {
  switch (status) {
    case "COMPANY":
      return "ຫົວໜ່ວຍທຸລະກິດ"
    case "VILLAGE":
      return "ຂື້ນກັບບ້ານ"
    default:
      return "-"
  }
}

