"use client";

// import { useState } from "react";
import CompanyForm from "../container/form/form";
import { useCompanyForm } from "../hook/useForm";
// import { AddTypeDialog } from "../container/typeDialog";

export default function CompanyCreate() {
  const { form, onSubmit } = useCompanyForm();
  // const [isAddingType, setIsAddingType] = useState<boolean>(false);
  return (
    <>
      <CompanyForm form={form} onSubmit={onSubmit} />
      {/* <CompanyForm form={form} onSubmit={onSubmit} setIsAddingType={setIsAddingType}/> */}
      {/* <AddTypeDialog open={isAddingType} onOpenChange={(open) => setIsAddingType(open)}/> */}
    </>
  );
}
