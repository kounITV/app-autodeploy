"use client";

import DistrictForm from "../../container/form/form";
import { useDistrictEditForm } from "../../hook/useEditForm";

export default function DistrictCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useDistrictEditForm({ id: Number(params.id) });
  return (
    <DistrictForm form={form} onSubmit={onSubmit} />
  );
}
