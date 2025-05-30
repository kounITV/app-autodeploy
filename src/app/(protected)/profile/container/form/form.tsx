import React, { useRef, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/containers";
import { Form } from "@/components/containers/form";
import { useUpdateDefaultValues } from "@/lib/update-default-values";
import { type checkBlacklistFormSchema } from "src/app/(protected)/blacklist/container/form/schema";
import { CurrentAddressSection, IdentitySection, OverseasAddressSection, PersonalInfoSection } from "./field";
import { type profileFormSchema } from "./schema";
import { AddVillageDialog } from "src/app/(protected)/(address)/village/container/addVillageDialog";

interface ProfileFormProps {
  form: UseFormReturn<z.infer<typeof profileFormSchema>>;
  onSubmit: (data: z.infer<typeof profileFormSchema>) => Promise<void>;
  handleNext?: () => void;
  handlePrevious?: () => void;
  action?: "create" | "edit";
  blackProfile?: z.infer<typeof checkBlacklistFormSchema>;
}
const ProfileForm: React.FC<ProfileFormProps> = ({ form, onSubmit, action = "create", blackProfile, handlePrevious }) => {
  const { firstName, lastName, dateOfBirth, identityNumber } = blackProfile ?? {};
  const disabled = action === "create";
  const [isAddingVillage, setIsAddingVillage] = useState<boolean>(false); 
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const handleSetIsAddingVillage = (value: boolean) => {
    setIsAddingVillage(value);
  };
  useUpdateDefaultValues({ form, fieldName: "firstName", value: firstName, shouldUpdate: disabled });
  useUpdateDefaultValues({ form, fieldName: "lastName", value: lastName, shouldUpdate: disabled });
  useUpdateDefaultValues({ form, fieldName: "dateOfBirth", value: dateOfBirth, shouldUpdate: disabled });
  useUpdateDefaultValues({ form, fieldName: "identityNumber", value: identityNumber, shouldUpdate: true });
  return (
    <>
      <Form formInstance={form} onSubmit={onSubmit} className="border-none shadow-none p-0" showButton={false}>
        <PersonalInfoSection form={form} disabled={disabled}  />
        <IdentitySection form={form} />
        <CurrentAddressSection form={form} setIsAddingVillage={handleSetIsAddingVillage}/>
        <OverseasAddressSection form={form} />
        {/* <ProfileDocuments form={form} /> */}
        <div className=" space-x-3">
          {action === "create" && (
            <>
              <Button ref={nextButtonRef} loading={form?.formState.isSubmitting} disabled={form?.formState.isSubmitting} >ໄປຕໍ່</Button>
              <Button variant="outline" onClick={handlePrevious} className="w-full sm:w-auto" > ກັບຄືນ </Button>
            </>
          )}
          {action === "edit" && (
            <>
              <Button loading={form?.formState.isSubmitting} disabled={form?.formState.isSubmitting} >ບັນທຶກ</Button>
            </>
          )}
        </div>
      </Form>
      <AddVillageDialog open={isAddingVillage} onOpenChange={setIsAddingVillage}/>
    </>
  );
};

export default ProfileForm;

