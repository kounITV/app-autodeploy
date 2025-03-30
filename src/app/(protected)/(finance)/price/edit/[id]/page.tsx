"use client";

import PriceForm from "../../container/form/form";
import { usePriceEditForm } from "../../hook/useEditForm";

export default function PriceCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = usePriceEditForm({ id: Number(params.id) });
  return (
    <PriceForm form={form} onSubmit={onSubmit} />
  );
}
