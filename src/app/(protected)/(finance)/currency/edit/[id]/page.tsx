"use client";

import CurrencyForm from "../../container/form/form";
import { useCurrencyEditForm } from "../../hook/useForm";

export default function CurrencyCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useCurrencyEditForm({ id: Number(params.id) });
  return (
    <CurrencyForm form={form} onSubmit={onSubmit} />
  );
}
