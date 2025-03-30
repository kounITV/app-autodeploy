import { SquareUserRound } from "lucide-react";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/containers";
import { Form } from "@/components/containers/form";
import { formatDate } from "@/lib/format-date";
import { useUpdateDefaultValues } from "@/lib/update-default-values";
import { type checkBlacklistFormSchema } from "src/app/(protected)/blacklist/container/form/schema";
import { CurrentAddressSection, IdentitySection, OverseasAddressSection, PersonalInfoSection } from "./field";
import { type profileFormSchema } from "./schema";

interface ProfileFormProps {
  form: UseFormReturn<z.infer<typeof profileFormSchema>>;
  onSubmit: (data: z.infer<typeof profileFormSchema>) => Promise<void>;
  handleNext?: () => void;
  handlePrevious?: () => void;
  action?: "create" | "edit";
  blackProfile?: z.infer<typeof checkBlacklistFormSchema>;
}
const ProfileForm: React.FC<ProfileFormProps> = ({ form, onSubmit, action = "create", blackProfile, handlePrevious }) => {
  const { firstName, lastName, dateOfBirth } = blackProfile ?? {};
  const disabled = action === "create";
  useUpdateDefaultValues({ form, fieldName: "firstName", value: firstName, shouldUpdate: disabled });
  useUpdateDefaultValues({ form, fieldName: "lastName", value: lastName, shouldUpdate: disabled });
  useUpdateDefaultValues({ form, fieldName: "dateOfBirth", value: dateOfBirth, shouldUpdate: disabled });
  return (
    <>
      {action === "create" && (
        <div className="space-y-6 mx-6">
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">ລາຍລະອຽດທີ່ຜ່ານມາ</p>
              <div className="grid gap-1">
                <p className="text-sm">
                  ຊື່ແທ້ ແລະ ນາມສະກຸນ: <span className="font-medium">{firstName} {lastName}</span>
                </p>
                <p className="text-sm">
                  ວັນເດືອນປີເກີດ: <span className="font-medium">   {dateOfBirth ? formatDate({ date: dateOfBirth }) : "N/A"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Form formInstance={form} onSubmit={onSubmit} className="border-none shadow-none p-0" showButton={false}>
        <div className="flex flex-wrap gap-2">
          <Form.Field name="image" control={form.control} label="ຮູບພາບ (ຮູບໃຫມ່​)" description="ຮູບພາບປະກອບຕິດບັດ" required={false}>
            <Form.Input.Image
              label="3x4 cm"
              iconImage={<SquareUserRound className="w-10 h-10" />}
              accept="image/*"
              className="flex w-[3cm] h-[4cm] items-center justify-center rounded-lg border border-dashed bg-muted" />
          </Form.Field>
          <Form.Field name="oldImage" control={form.control} label="ຮູບພາບ (ຮູບເກົ່າ)" description="ຮູບພາບປະກອບຕິດບັດ" required={false}>
            <Form.Input.Image
              label="3x4 cm"
              iconImage={<SquareUserRound className="w-10 h-10" />}
              accept="image/*"
              className="flex w-[3cm] h-[4cm] items-center justify-center rounded-lg border border-dashed bg-muted" />
          </Form.Field>
        </div>
        <PersonalInfoSection form={form} disabled={disabled} />
        <IdentitySection form={form} />
        <CurrentAddressSection form={form} />
        <OverseasAddressSection form={form} />
        <div className=" space-x-3">
          {action === "create" && (
            <>
              <Button variant="outline" onClick={handlePrevious} className="w-full sm:w-auto" > ກັບຄືນ </Button>
              <Button loading={form?.formState.isSubmitting} disabled={form?.formState.isSubmitting} >ໄປຕໍ່</Button>
            </>
          )}
          {action === "edit" && (
            <>
              <Button loading={form?.formState.isSubmitting} disabled={form?.formState.isSubmitting} >ບັນທຶກ</Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
};

export default ProfileForm;

