"use client";

import CompanyForm from "../container/form/form";
import { useCompanyForm } from "../hook/useForm";

export default function CompanyCreate() {
  const { form, onSubmit } = useCompanyForm();
  return (
    <CompanyForm form={form} onSubmit={onSubmit} />
  );
}
