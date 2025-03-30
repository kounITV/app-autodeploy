"use client";

import NationalityForm from "../../container/form/form";
import { usenationalityEditForm } from "../../hook/useEditForm";

export default function nationalityCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = usenationalityEditForm({ id: Number(params.id) });
  return (
    <NationalityForm form={form} onSubmit={onSubmit} />
  );
}
