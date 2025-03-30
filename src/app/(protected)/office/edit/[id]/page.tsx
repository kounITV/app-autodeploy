"use client";

import OfficeForm from "../../container/form/form";
import { useOfficeEditForm } from "../../hook/useEditForm";

export default function OfficeCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useOfficeEditForm({ id: Number(params.id) });
  return (
    <OfficeForm form={form} onSubmit={onSubmit} />
  );
}
