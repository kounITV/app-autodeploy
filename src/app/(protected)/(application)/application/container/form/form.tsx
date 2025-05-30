"use client";

import { Form } from "@/components/containers/form";
import { Badge, Card, CardHeader, ScrollArea, Separator } from "@/components/ui";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { type UseFormReturn } from "react-hook-form";
import useCompanyCombobox from "src/app/(protected)/company/hook/useeCompanyCombobox";
import usePositionCombobox from "src/app/(protected)/position/hook/useePositionCombobox";
import { type z } from "zod";
import useeNumberCombobox from "../../hook/useeNumberCombobox";
import { type applicationSchema } from "./schema";
import { useUpdateDefaultValues } from "@/lib/update-default-values";
import { useOne } from "@/hooks/useOne";
import { IProfile } from "src/app/(protected)/profile/type";
import useVillageCombobox from "src/app/(protected)/(address)/village/hook/useDistrictCombobox";
import { getOfficeId } from "@/lib/getSession";
import useFolderCombobox from "../../../folder/hook/useCombobox";
import { useEffect } from "react";
import { IApplication } from "../../type";

const formTitle = "ອອກບັດໃຫມ່";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນອອກບັດໃຫມ່";

const expirationTermOptions = [
  { value: "SIX_MONTHS", label: "6 ເດືອນ" },
  { value: "ONE_YEAR", label: "1 ປີ" },
];

interface ApplicationFormProps {
  profileId: number;
  form: UseFormReturn<z.infer<typeof applicationSchema>>;
  onSubmit: (data: z.infer<typeof applicationSchema>) => Promise<void>;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ form, onSubmit, profileId }) => {
  const officeId = getOfficeId()
  const folder = form.watch("folderId");
  const numberId = form.watch("numberId");
  const dependBy = form.watch("dependBy");
  const { result: folderOptions } = useFolderCombobox({ status: "APPROVED_BY_POLICE", officeId });
  const { result: numberOptions, count } = useeNumberCombobox({ folderId: folder });
  const foundNumber = numberOptions.find((item) => item.value === numberId);
  useUpdateDefaultValues({ form, fieldName: "expirationTerm", value: foundNumber?.duration, shouldUpdate: foundNumber?.value });
  useUpdateDefaultValues({ form, fieldName: "positionId", value: 10, shouldUpdate: true });
  const { result: companyOptions } = useCompanyCombobox();
  const { result: positionOptions } = usePositionCombobox();
  const { result: villageOptions } = useVillageCombobox({});
  useEffect(() => {
    const expirationTerm = form.watch("expirationTerm");
    if (expirationTerm) {
      const { issueDate, expirationDate } = calculateDates(
        expirationTerm as ExpirationTerm,
      );
      form.setValue("issueDate", issueDate.toISOString(), {
        shouldValidate: true,
      });
      form.setValue("expirationDate", expirationDate.toISOString(), {
        shouldValidate: true,
      });
    }
  }, [form.watch("expirationTerm")]);
  const dependByOptions = [{ label: "ຂື້ນກັບບ້ານ", value: "VILLAGE" }, { label: "ຫົວໜ່ວຍທຸລະກິດ", value: "COMPANY" }];
  return (
    <div className="w-fit space-y-6 mx-auto">
      <ProfileCard profileId={profileId} />
      <Form formInstance={form} onSubmit={onSubmit} title={formTitle} 
        subtitle={formSubtitle}
      >
        <div className="space-y-4 -mt-8">
          <h3 className="text-lg font-medium">ຂໍ້ມູນແຟ້ມ ແລະ ຟອມ</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Form.Field name="folderId" control={form.control} label="ເລືອກແຟ້ມ">
              <Form.Input.Combobox placeholder="ແຟ້ມ" className="w-96" options={folderOptions} />
            </Form.Field>
            <Form.Field name="numberId" control={form.control} label={`ເລືອກຟອມເລກທີ(ຈໍານວນ ${count} ເລກທີ)`} >
              <Form.Input.Combobox placeholder="ຟອມເລກທິ" className="w-96" options={numberOptions} />
            </Form.Field>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">ຂໍ້ມູນຫົວໜ່ວຍທຸລະກິດ</h3>
          <div className="grid gap-4 sm:grid-cols-1">
            <Form.Field name="positionId" control={form.control} label="ເລືອກຕຳແໜ່ງ" >
              <Form.Input.Combobox placeholder="ຕຳແໜ່ງ" className="w-full" options={positionOptions} />
            </Form.Field>
          </div>
        </div>
        <div className="w-full">
          <Form.Field name="dependBy" control={form.control} label="ຂື້ນກັບ" required={false}>
            <Form.Input.Radio options={dependByOptions} className=" " />
          </Form.Field>
        </div>
        {dependBy === "COMPANY" && (
          <Form.Field name="companyId" control={form.control} label="ເລືອກຫົວໜ່ວຍທຸລະກິດ">
            <Form.Input.Combobox placeholder="ຫົວໜ່ວຍທຸລະກິດ" className="w-full" options={companyOptions} />
          </Form.Field>
        )}
        {dependBy === "VILLAGE" && (
          <Form.Field name="villageId" control={form.control} label="ເລືອກບ້ານ">
            <Form.Input.Combobox placeholder="ເລືອກບ້ານ" className="w-full" options={villageOptions} />
          </Form.Field>
        )}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">ຂໍ້ມູນກຳນົດອາຍຸບັດ</h3>
          <Form.Field name="expirationTerm" control={form.control} label="ອາຍຸບັດ" required={false}>
            <Form.Input.Select options={expirationTermOptions} className='w-full' disabled />
          </Form.Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Form.Field name="issueDate" control={form.control} label="ວັນທີອອກ" required={false}>
              <Form.Input.DateTimePicker disabled />
            </Form.Field>
            <Form.Field name="expirationDate" control={form.control} label="ວັນໝົດອາຍຸ" required={false}>
              <Form.Input.DateTimePicker disabled />
            </Form.Field>
          </div>
        </div>
      </Form>
    </div>

  );
};

export default ApplicationForm;

type ExpirationTerm = "SIX_MONTHS" | "ONE_YEAR";
const calculateDates = (term: ExpirationTerm) => {
  const issueDate = new Date();
  const expirationDate = new Date(issueDate);
  switch (term) {
    case "SIX_MONTHS":
      expirationDate.setMonth(expirationDate.getMonth() + 6);
      break;
    case "ONE_YEAR":
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      break;
    default:
      break;
  }
  expirationDate.setDate(expirationDate.getDate() - 1);
  return { issueDate, expirationDate };
};

export const isTwoWeeksLeftBeforeExpiry = (expirationDate?: string): boolean => {
  if (!expirationDate) {
    return false
  }

  const now = new Date();
  const expiry = new Date(expirationDate);

  const diffInMs = expiry.getTime() - now.getTime();
  // eslint-disable-next-line no-magic-numbers
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  // eslint-disable-next-line no-magic-numbers
  return diffInDays <= 14;
};

const ProfileCard = ({ profileId }: { profileId: number }) => {
  const path = usePathname();
  const type = path.split('/').pop();
  const { data: profile } = useOne<IProfile>({ resource: "profile", id: profileId });
  const { data } = useOne<IApplication>({ resource: "application/history", id: profileId });
  const history = data?.result;
  let no = 1;
  const { image, firstName, gender, lastName, identityExpiryDate, identityIssueDate, identityNumber, identityType, applicationNumber } = profile?.result
    ?? {};
  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };
  const IdentifyOptions = [
    { value: "passport", label: "Passport" },
    { value: "nationalId", label: "ບັດປະຈຳຕົວ" },
    { value: "driverLicense", label: "ໃບຂັບຂີ່" },
  ];
  const getIdentityLabel = (value: string | undefined) => {
    const found = IdentifyOptions.find((option) => option.value === value);
    return found?.label ?? value ?? "-";
  };
  return (
    <div className=" mx-auto  space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 ">
          <div className="w-[105px] h-[140px]">
            <Image
              src={image ?? ""}
              alt="ຮູບພາບບຸກຄົນ"
              width={105}
              height={140}
              unoptimized
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-3xl font-bold">{firstName} {lastName}</h1>
            <Badge className="mt-2">
              {gender}
            </Badge>
            <div className="flex flex-col items-center sm:items-start">
              ເອກະສານຢັ້ງຢືນ: {getIdentityLabel(identityType)} {identityNumber}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              ອາຍຸ: {formatDate(identityIssueDate ?? "")} - {formatDate(identityExpiryDate ?? "")}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              ເລກທີໃບຄໍາຮ້ອງ: {applicationNumber ?? "-"}
            </div>
          </div>
        </CardHeader>
        {((Array.isArray(history) && history.length > 0) && type === 'RENEW') &&
        <div>
          <Separator className="my-2" />
          <ScrollArea className="h-52 w-full rounded-md">
            <div className="p-4">
              {Array.isArray(history) && (
                <div className="px-2 py-1">
                  <h4 className="mb-4 font-bold leading-none">ປະວັດສະຖານທີ່ເຮັດວຽກ:</h4>
                  <table className="min-w-full text-sm text-left border-none">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border-none">ລໍາດັບ</th>
                        <th className="px-4 py-2 border-none">{history.companyId !== null ? "ຊື່ບໍລິສັດ" : "ບ້ານ"}</th>
                        <th className="px-4 py-2 border-none">ວັນທີອອກບັດ</th>
                        <th className="px-4 py-2 border-none">ວັນທີໝົດອາຍຸ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((row: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border-none">{no++}</td>
                          {row.company ? (
                            <td className="px-4 py-2 border-none">{row.company?.name ?? '-'}</td>
                          ):(
                            <td className="px-4 py-2 border-none">{row.village?.name ?? '-'}</td>
                          )}
                          <td className="px-4 py-2 border-none">{formatDate(row.issueDate) ?? '-'}</td>
                          <td className="px-4 py-2 border-none">{formatDate(row.expirationDate) ?? '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        }
      </Card>
    </div>
  );
};

