"use client";

import CurrencyForm from "../container/form/form";
import { useCurrencyCreateForm } from "../hook/useForm";

export default function CurrencyCreate() {
  const { form, onSubmit } = useCurrencyCreateForm();
  return (
    <CurrencyForm form={form} onSubmit={onSubmit} />
  );
}
