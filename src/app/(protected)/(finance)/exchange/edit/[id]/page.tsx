"use client";

import ExchangeRateForm from "../../container/form/form";
import { useExchangeRateEditForm } from "../../hook/useForm";

export default function ExchangeRateCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useExchangeRateEditForm({ id: Number(params.id) });
  return (
    <ExchangeRateForm form={form} onSubmit={onSubmit} />
  );
}
