"use client";

import ExchangeRateForm from "../container/form/form";
import { useExchangeRateCreateForm } from "../hook/useForm";

export default function ExchangeRateCreate() {
  const { form, onSubmit } = useExchangeRateCreateForm();
  return (
    <ExchangeRateForm form={form} onSubmit={onSubmit} />
  );
}
