"use client";

import ProvinceForm from "../../container/form/form";
import { useProvinceEditForm } from "../../hook/useEditForm";

export default function ProvinceCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useProvinceEditForm({ id: Number(params.id) });
  return (
    <ProvinceForm form={form} onSubmit={onSubmit} />
  );
}
