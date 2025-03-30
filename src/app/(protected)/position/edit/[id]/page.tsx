"use client";

import PositionForm from "../../container/form/form";
import { usePositionEditForm } from "../../hook/useEditForm";

export default function PositionCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = usePositionEditForm({ id: Number(params.id) });
  return (
    <PositionForm form={form} onSubmit={onSubmit} />
  );
}
