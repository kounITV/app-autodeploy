/* eslint-disable complexity */
"use client";
import { Avatar, AvatarFallback, AvatarImage, Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { useList } from "@/hooks/useList";
import { formatDate } from "@/lib/format-date";
import { format } from "date-fns";
import { BuildingIcon, CalendarIcon, CreditCardIcon, FileTextIcon, FlagIcon, FolderIcon, MapPinIcon, PhoneIcon, UserIcon } from "lucide-react";
import { IApplication } from "src/app/(protected)/(application)/application/type";

export default function ProfileShow({ params }: { params: { id: number } }) {
  const profileId = Number(params.id);
  const { result: application } = useList<IApplication>({ resource: "/application", initialFilters: { profileId: profileId } });
  const {
    profile,
    position,
    folder,
    company,
    applicationType = "",
    expirationTerm = "",
    number,
  } = application?.[0] || {};
  return (
    <div className=" mx-auto p-6 space-y-8 ">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-4">
          <Avatar className="w-[120px] h-[160px] rounded-sm shadow-md">
            <AvatarImage
              src="/thavisoukmnlv.jpg"
              alt={`${profile?.firstName || "ບໍ່ມີ"} ${profile?.lastName || ""}`}
            />
            <AvatarFallback className="text-2xl font-semibold">
              {profile?.firstName?.[0] || ""}
              {profile?.lastName?.[0] || ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <h1 className="text-4xl font-bold ">
              {profile?.firstName || "ບໍ່ມີ"} {profile?.lastName || ""}
            </h1>
            <p className="text-lg text-gray-600">
              {position?.laoName || "ບໍ່ມີ"} (<span className="font-semibold">{position?.englishName || "ບໍ່ມີ"}</span>)
            </p>
            <Badge variant={profile?.gender === "MALE" ? "secondary" : "default"} className="px-4 py-2 text-sm">
              {profile?.gender || "ບໍ່ມີ"}
            </Badge>
          </div>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md rounded-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-900 rounded-t-lg">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <UserIcon className="w-6 h-6 text-blue-600" /> ຂໍ້ມູນສ່ວນຕົວ
            </h2>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-gray-700">
            <p><PhoneIcon className="w-4 h-4 inline mr-2 text-gray-500" /> {profile?.phoneNumber || "ບໍ່ມີ"}</p>
            <p><PhoneIcon className="w-4 h-4 inline mr-2 text-gray-500" /> {profile?.phoneNumber || "ບໍ່ມີ"}</p>
            <p><CalendarIcon className="w-4 h-4 inline mr-2 text-gray-500" /> ວັນເດືອນປີເກີດ: {profile?.dateOfBirth ? formatDate({ date: profile.dateOfBirth }) : "ບໍ່ມີ"}</p>
            <p><UserIcon className="w-4 h-4 inline mr-2 text-gray-500" /> ເພດ: {profile?.gender || "ບໍ່ມີ"}</p>
            <p><FlagIcon className="w-4 h-4 inline mr-2 text-gray-500" /> ສັນຊາດ: {profile?.nationality.code || "ບໍ່ມີ"}</p>
            <p><UserIcon className="w-4 h-4 inline mr-2 text-gray-500" /> ຊົນເຜົ່າ: {profile?.ethnicity.name || "ບໍ່ມີ"}</p>
          </CardContent>
        </Card>

        {/* Identity Information */}
        <Card className="shadow-md rounded-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-900 rounded-t-lg">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <CreditCardIcon className="w-6 h-6 text-green-600" /> ຂໍ້ມູນບັດປະຈຳໂຕ
            </h2>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-gray-700">
            <p>ປະເພດ: {profile?.identityType || "ບໍ່ມີ"}</p>
            <p>ເລກທີ: {profile?.identityNumber || "ບໍ່ມີ"}</p>
            <p>ວັນອອກ: {profile?.identityIssueDate ? format(new Date(profile.identityIssueDate), "dd/MM/yyyy") : "ບໍ່ມີ"}</p>
            <p>ວັນໝົດອາຍຸ: {profile?.identityExpiryDate ? format(new Date(profile.identityExpiryDate), "dd/MM/yyyy") : "ບໍ່ມີ"}</p>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="shadow-md rounded-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-900 rounded-t-lg">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <MapPinIcon className="w-6 h-6 text-red-600" /> ຂໍ້ມູນທີ່ຢູ່
            </h2>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-gray-700">
            <p>ປັດຈຸບັນ: {profile?.currentVillage.villageLao || "ບໍ່ມີ"}, {profile?.district.districtLao || "ບໍ່ມີ"}, {profile?.province.provinceLao || "ບໍ່ມີ"}</p>
            <p>ຕ່າງປະເທດ: {profile?.overseasCountry?.name || "ບໍ່ມີ"}, {profile?.overseasProvince || "ບໍ່ມີ"}</p>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="shadow-md rounded-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-900 rounded-t-lg">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <BuildingIcon className="w-6 h-6 text-yellow-600" /> ຂໍ້ມູນທຸລະກິດ
            </h2>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-gray-700">
            <p>ຊື່: {company?.name || "ບໍ່ມີ"}</p>
            <p>ລະຫັດທຸລະກິດ: {company?.businessCode || "ບໍ່ມີ"}</p>
            <p>ລົງທະບຽນໂດຍ: {company?.businessRegisterBy || "ບໍ່ມີ"}</p>
          </CardContent>
        </Card>

        {/* Application Details */}
        <Card className="shadow-md rounded-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-900 p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <FileTextIcon className="w-6 h-6 text-purple-600" /> ລາຍລະອຽດໃບຄຳຮ້ອງຂໍອອກບັດ
            </h2>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-gray-700">
            <p>ເລກທີຟອມ: {folder?.code || ""}{number?.number || "ບໍ່ມີ"}</p>
            <p>ປະເພດໃບຄຳຮ້ອງ: {applicationType || "ບໍ່ມີ"}</p>
            <p>ໄລຍະໝົດອາຍຸ: {expirationTerm || "ບໍ່ມີ"}</p>
            <p>ວັນສ້າງ: {application?.[0]?.createdAt ? formatDate({ date: application?.[0]?.createdAt }) : "ບໍ່ມີ"}</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-900 rounded-t-lg">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <FolderIcon className="w-6 h-6 text-pink-600" />ຂໍ້ມູນແຟ້ມ
            </h2>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-gray-700">
            <p>ຊື່ແຟ້ມ: {folder?.name || "ບໍ່ມີ"}</p>
            <p>ລະຫັດແຟ້ມ: {folder?.code || "ບໍ່ມີ"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

