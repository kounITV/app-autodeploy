"use client";

import PriceForm from "../container/form/form";
import { usePriceForm } from "../hook/useForm";

export default function PriceCreate() {
  const { form, onSubmit } = usePriceForm();
  return (
    <PriceForm form={form} onSubmit={onSubmit} />
  );
}
