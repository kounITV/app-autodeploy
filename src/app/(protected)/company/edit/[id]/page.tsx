"use client";

import CompanyForm from "../../container/form/form";
import { useCompanyEditForm } from "../../hook/useEditForm";

export default function CompanyCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useCompanyEditForm({ id: Number(params.id) });
  return (
    <CompanyForm form={form} onSubmit={onSubmit} />
  );
}
