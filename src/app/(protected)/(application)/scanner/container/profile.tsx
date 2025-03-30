/* eslint-disable complexity */
import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon, BriefcaseIcon, UserIcon, AlertCircleIcon, FileX2Icon } from "lucide-react"
import { format } from "date-fns"
import { ImageViewer } from "@/components/containers/image-viewer"
import { IApplication } from "../../application/type"

export default function PermitCard({ data }: { data?: IApplication }) {
  if (!data) {
    return (
      <div className="h-fit">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="flex flex-col items-center pb-6 pt-8">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-4">
              <FileX2Icon className="h-10 w-10 text-muted-foreground/70" />
            </div>
            <h2 className="text-xl font-bold text-center">ບໍ່ມີຂໍ້ມູນ</h2>
            <p className="text-sm text-muted-foreground text-center mt-2">ຂໍ້ມູນບັດອະນຸຍາດບໍ່ສາມາດໂຫຼດໄດ້ຫຼືບໍ່ມີຢູ່</p>
          </CardHeader>
          <CardContent className="pb-8">
            <div className="flex justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
                <AlertCircleIcon className="h-4 w-4" />
                <span>ກະລຸນາກວດສອບການເຊື່ອມຕໍ່ຂອງທ່ານແລະລອງໃໝ່ອີກຄັ້ງ</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return "-"
    }
    try {
      return format(new Date(dateString), "MMM dd, yyyy")
    } catch {
      return "Invalid Date"
    }
  }
  const isExpired = () => {
    if (!data?.expirationDate) {
      return true
    }
    const currentDate = new Date()
    const expiryDate = new Date(data.expirationDate)
    return currentDate > expiryDate
  }
  return (
    <div className=" h-fit">
      <Card className="w-full max-w-md md:max-w-4xl shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/3 md:border-r md:border-gray-200">
            <CardHeader className="flex flex-col items-center pb-2">
              <div className="flex  gap-2">
                <div>
                  <div>{"ຮູບພາບ (ຮູບໃຫມ່​)"}</div>
                  <ImageViewer src={data?.profile?.image} className="my-1 h-28 w-28" />
                </div>
                <div>
                  <div>{"ຮູບພາບ (ຮູບເກົ່າ)"}</div>
                  <ImageViewer src={data?.profile?.oldImage} className="my-1  h-28 w-28" />
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-center">
                {data?.profile?.firstName || "-"} {data?.profile?.lastName || "-"}
              </h2>
              <div className="flex flex-col gap-2 w-full mt-1">
                <Badge
                  className={`${isExpired() ? "bg-red-500" : "bg-green-500"} text-white w-full justify-center py-1`}
                >
                  {isExpired() ? "ໝົດອາຍຸ" : "ຍັງໃຊ້ໄດ້"}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground mt-1 text-center">{data?.number?.price?.name || "-"}</div>
              <div className="text-sm font-medium mt-1">Permit #: {data?.number?.number || "-"}</div>
              <div className="hidden md:block w-full mt-4">
                <Section title="ຂໍ້ມູນສ່ວນຕົວ" icon={<UserIcon className="h-4 w-4" />}>
                  <InfoItem label="ເລກຟອມ" value={data?.profile?.applicationNumber || "-"} />
                  <InfoItem label="ເບີໂທ" value={data?.profile?.phoneNumber || "-"} />
                  <InfoItem
                    label="ວັນເກີດ"
                    value={data?.profile?.dateOfBirth ? formatDate(data.profile.dateOfBirth) : "-"}
                  />
                  <InfoItem label="ເພດ" value={data?.profile?.gender || "-"} />
                  <InfoItem label="ສັນຊາດ" value={data?.profile?.nationality?.nationality || "-"} />
                  <InfoItem label="ປະເພດເອກະສານ" value={data?.profile?.identityType || "-"} />
                </Section>
              </div>
            </CardHeader>
          </div>
          <div className="md:w-2/3">
            <CardContent className="space-y-4 md:p-6">
              <div className="md:hidden">
                <Section title="ຂໍ້ມູນສ່ວນຕົວ" icon={<UserIcon className="h-4 w-4" />}>
                  <InfoItem label="ເລກຟອມ" value={data?.profile?.applicationNumber || "-"} />
                  <InfoItem label="ເບີໂທ" value={data?.profile?.phoneNumber || "-"} />
                  <InfoItem
                    label="ວັນເກີດ"
                    value={data?.profile?.dateOfBirth ? formatDate(data.profile.dateOfBirth) : "-"}
                  />
                  <InfoItem label="ເພດ" value={data?.profile?.gender || "-"} />
                  <InfoItem label="ສັນຊາດ" value={data?.profile?.nationality?.nationality || "-"} />
                  <InfoItem label="ປະເພດເອກະສານ" value={data?.profile?.identityType || "-"} />
                </Section>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-4 space-y-4 md:space-y-0">
                <Section title="ລາຍລະອຽດຂໍ້ມູນບັດ" icon={<CalendarIcon className="h-4 w-4" />}>
                  <InfoItem label="ປະເພດ" value={data?.type || "-"} />
                  <InfoItem label="ໄລຍະເວລາ" value={data?.expirationTerm?.replace("_", " ").toLowerCase() || "-"} />
                  <InfoItem label="ວັນທີອອກ" value={data?.issueDate ? formatDate(data.issueDate) : "-"} />
                  <InfoItem label="ວັນທີໝົດອາຍຸ" value={data?.expirationDate ? formatDate(data.expirationDate) : "-"} />
                  <InfoItem label="ປະເພດບັດ" value={data?.number?.price?.type || "-"} />
                  <InfoItem label="ລາຄາ" value={data?.number?.price?.price ? `$${data.number.price.price}` : "-"} />
                </Section>
                <Section title="ການຈ້າງງານ" icon={<BriefcaseIcon className="h-4 w-4" />}>
                  <InfoItem label="ບໍລິສັດ" value={data?.company?.name || "-"} />
                  <InfoItem label="ລະຫັດທຸລະກິດ" value={data?.company?.businessCode || "-"} />
                  <InfoItem label="ຕຳແໜ່ງ" value={data?.position?.englishName || "-"} />
                  <InfoItem label="ສຳນັກງານ" value={data?.office?.name || "-"} />
                </Section>
              </div>
              <Section title="ສະຖານທີ່" icon={<MapPinIcon className="h-4 w-4" />}>
                <div className="md:grid md:grid-cols-3 md:gap-4">
                  <InfoItem label="ແຂວງ" value={data?.profile?.province?.provinceLao || "-"} />
                  <InfoItem label="ເມືອງ" value={data?.profile?.district?.districtLao || "-"} />
                  <InfoItem label="ບ້ານ" value={data?.village?.villageLao || "-"} />
                </div>
              </Section>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      </div>
      <div className="bg-muted/50 rounded-lg p-3 space-y-2">{children}</div>
    </div>
  )
}
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

