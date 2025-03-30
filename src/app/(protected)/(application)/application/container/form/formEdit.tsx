"use client";

import { Form } from "@/components/containers/form";
import { Avatar, AvatarFallback, AvatarImage, Badge, Card, CardHeader } from "@/components/ui";

import { format } from "date-fns";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import useCompanyCombobox from "src/app/(protected)/company/hook/useeCompanyCombobox";
import usePositionCombobox from "src/app/(protected)/position/hook/useePositionCombobox";
import { type z } from "zod";
import useeNumberCombobox from "../../hook/useeNumberCombobox";
import { type applicationSchema } from "./schema";
import { useOne } from "@/hooks/useOne";
import { IProfile } from "src/app/(protected)/profile/type";
import useVillageCombobox from "src/app/(protected)/(address)/village/hook/useDistrictCombobox";
import useFolderCombobox from "../../../folder/hook/useCombobox";

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

const ApplicationFormEdit: React.FC<ApplicationFormProps> = ({ form, onSubmit, profileId }) => {
  const folder = form.watch("folderId");
  const dependBy = form.watch("dependBy");
  const { result: folderOptions } = useFolderCombobox({ status: "POLICE_UNDER_REVIEW" });
  const { result: numberOptions } = useeNumberCombobox({ folderId: folder, isAvailable: false });
  const { result: companyOptions } = useCompanyCombobox();
  const { result: positionOptions } = usePositionCombobox();
  const dependByOptions = [{ label: "ຂື້ນກັບບ້ານ", value: "VILLAGE" }, { label: "ຫົວໜ່ວຍທຸລະກິດ", value: "COMPANY" }];
  const { result: villageOptions } = useVillageCombobox({});
  return (
    <div className="w-fit space-y-6 mx-auto">
      <ProfileCard profileId={profileId} />
      <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">ຂໍ້ມູນແຟ້ມ ແລະ ຟອມ</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Form.Field name="folderId" control={form.control} label="ເລືອກແຟ້ມ">
              <Form.Input.Combobox placeholder="ແຟ້ມ" className="w-96" options={folderOptions} disabled />
            </Form.Field>
            <Form.Field name="numberId" control={form.control} label="ເລືອກຟອມເລກທິ" >
              <Form.Input.Combobox placeholder="ຟອມເລກທິ" className="w-96" options={numberOptions} disabled/>
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
          <Form.Field name="expirationTerm" control={form.control} label="ອາຍຸບັດ">
            <Form.Input.Select options={expirationTermOptions} className='w-full' disabled />
          </Form.Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Form.Field name="issueDate" control={form.control} label="ວັນທີອອກ">
              <Form.Input.DateTimePicker disabled />
            </Form.Field>
            <Form.Field name="expirationDate" control={form.control} label="ວັນໝົດອາຍຸ" >
              <Form.Input.DateTimePicker disabled />
            </Form.Field>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ApplicationFormEdit;

const ProfileCard = ({ profileId }: { profileId: number }) => {
  const { data: profile } = useOne<IProfile>({ resource: "profile", id: profileId });
  const { image, firstName, gender, lastName, identityExpiryDate, identityIssueDate, identityNumber, identityType } = profile?.result ?? {};
  const formatDate = (dateString: string) => {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return format(date, "dd/MM/yy");
  };

  return (
    <div className=" mx-auto  space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4 ">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 rounded-none">
            <AvatarImage src={image} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>{"ບໍ່ມີຮູບພາບ"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-3xl font-bold">{firstName} {lastName}</h1>
            <Badge className="mt-2">
              {gender}
            </Badge>
            <div className="flex flex-col items-center sm:items-start">
              ເອກະສານຢັ້ງຢືນ: {identityType} {identityNumber}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              ອາຍຸ: {formatDate(identityIssueDate ?? "")} - {formatDate(identityExpiryDate ?? "")}
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

