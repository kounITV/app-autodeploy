"use client";

import OfficeForm from "../container/form/form";
import { useOfficeForm } from "../hook/useForm";

export default function OfficeCreate() {
  const { form, onSubmit } = useOfficeForm();
  return (
    <OfficeForm form={form} onSubmit={onSubmit} />
  );
}
