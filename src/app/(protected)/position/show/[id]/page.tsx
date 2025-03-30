/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage, Badge, Card, CardContent, CardHeader, Spinner } from "@/components/ui";
import { format } from "date-fns";
import { BuildingIcon, CalendarIcon, CreditCardIcon, FileTextIcon, FlagIcon, FolderIcon, MapPinIcon, PhoneIcon, UserIcon } from "lucide-react";
import { useProfile } from "src/app/(protected)/dashboard/hook/useProfile";

export default function ProfileShow({ params }: { params: { id: number } }) {
  const id = Number(params.id);
  const { result, loading } = useProfile({ id });
  if (loading) {
    return <Spinner size="large" show={true} />;
  }
  const {
    Profile = {},
    Position = {},
    BusinessUnit = {},
    RegistrationDocument = {},
    Folder = {},
    status = "",
    requestDate = null,
    formId = "",
    applicationType = "",
    expirationTerm = "",
  } = result || {};
  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-100 dark:bg-[--background] rounded-lg shadow-md">
      <Card className="w-full shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-4">
          <Avatar className="w-[120px] h-[160px] rounded-sm shadow-md">
            <AvatarImage
              src="/thavisoukmnlv.jpg"
              alt={`${Profile?.firstName || "ບໍ່ມີ"} ${Profile?.lastName || ""}`}
            />
            <AvatarFallback className="text-2xl font-semibold">
              {Profile?.firstName?.[0] || ""}
              {Profile?.lastName?.[0] || ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <h1 className="text-4xl font-bold ">
              {Profile?.firstName || "ບໍ່ມີ"} {Profile?.lastName || ""}
            </h1>
            <p className="text-lg text-gray-600">
              {Position?.laoName || "ບໍ່ມີ"} (<span className="font-semibold">{Position?.englishName || "ບໍ່ມີ"}</span>)
            </p>
            <Badge variant={status === "PENDING" ? "secondary" : "default"} className="px-4 py-2 text-sm">
              {status || "ບໍ່ມີ"}
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
            <p><PhoneIcon className="w-4 h-4 inline mr-2 text-gray-500" /> {Profile?.phoneNumber || "ບໍ່ມີ"}</p>
            <p><CalendarIcon className="w-4 h-4 inline mr-2 text-gray-500" /> ວັນເດືອນປີເກີດ: {Profile?.dateOfBirth ? format(new Date(Profile.dateOfBirth), "dd/MM/yyyy") : "ບໍ່ມີ"}</p>
            <p><UserIcon className="w-4 h-4 inline mr-2 text-gray-500" /> ເພດ: {Profile?.gender || "ບໍ່ມີ"}</p>
            <p><FlagIcon className="w-4 h-4 inline mr-2 text-gray-500" /> ສັນຊາດ: {Profile?.nationality || "ບໍ່ມີ"}</p>
            <p><UserIcon className="w-4 h-4 inline mr-2 text-gray-500" /> ຊົນເຜົ່າ: {Profile?.ethnicity || "ບໍ່ມີ"}</p>
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
            <p>ປະເພດ: {Profile?.identityType || "ບໍ່ມີ"}</p>
            <p>ເລກທີ: {Profile?.identityNumber || "ບໍ່ມີ"}</p>
            <p>ວັນອອກ: {Profile?.identityIssueDate ? format(new Date(Profile.identityIssueDate), "dd/MM/yyyy") : "ບໍ່ມີ"}</p>
            <p>ວັນໝົດອາຍຸ: {Profile?.identityExpiryDate ? format(new Date(Profile.identityExpiryDate), "dd/MM/yyyy") : "ບໍ່ມີ"}</p>
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
            <p>ປັດຈຸບັນ: {Profile?.currentVillage || "ບໍ່ມີ"}, {Profile?.currentDistrict || "ບໍ່ມີ"}, {Profile?.currentProvince || "ບໍ່ມີ"}</p>
            <p>ຕ່າງປະເທດ: {Profile?.overseasDistrict || "ບໍ່ມີ"}, {Profile?.overseasProvince || "ບໍ່ມີ"}</p>
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
            <p>ຊື່: {BusinessUnit?.name || "ບໍ່ມີ"}</p>
            <p>ລະຫັດທຸລະກິດ: {BusinessUnit?.businessCode || "ບໍ່ມີ"}</p>
            <p>ລົງທະບຽນໂດຍ: {BusinessUnit?.businessRegisterBy || "ບໍ່ມີ"}</p>
            <p>ໄຟລ໌ເອກະສານ: {BusinessUnit?.documentFile || "ບໍ່ມີ"}</p>
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
            <p>ເລກທີຟອມ: {Folder?.code || ""}{formId || "ບໍ່ມີ"}</p>
            <p>ປະເພດໃບຄຳຮ້ອງ: {applicationType || "ບໍ່ມີ"}</p>
            <p>ໄລຍະໝົດອາຍຸ: {expirationTerm || "ບໍ່ມີ"}</p>
            <p>ວັນຂໍຮ້ອງ: {requestDate ? format(new Date(requestDate), "dd/MM/yyyy") : "ບໍ່ມີ"}</p>
            <p>ເອກະສານລົງທະບຽນ: {RegistrationDocument?.type || "ບໍ່ມີ"} (Lao: {RegistrationDocument?.laoName || "ບໍ່ມີ"})</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-900 rounded-t-lg">
            <h2 className="text-xl font-semibold flex items-center gap-3">
              <FolderIcon className="w-6 h-6 text-pink-600" />ຂໍ້ມູນແຟ້ມ
            </h2>
          </CardHeader>
          <CardContent className="p-4 space-y-2 text-gray-700">
            <p>ຊື່ແຟ້ມ: {Folder?.name || "ບໍ່ມີ"}</p>
            <p>ລະຫັດແຟ້ມ: {Folder?.code || "ບໍ່ມີ"}</p>
            <p>ຈຳນວນໃບຄຳຮ້ອງທັງໝົດ: {Folder?.totalApplications || "0"}</p>
            <p>ໃບຄຳຮ້ອງທີ່ຜ່ານການອະນຸມັດ: {Folder?.approvedApplications || "0"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

