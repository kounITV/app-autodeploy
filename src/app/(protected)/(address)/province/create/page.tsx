"use client";

import ProvinceForm from "../container/form/form";
import { useProvinceForm } from "../hook/useForm";

export default function ProvinceCreate() {
  const { form, onSubmit } = useProvinceForm();
  return (
    <ProvinceForm form={form} onSubmit={onSubmit} />
  );
}
