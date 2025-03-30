"use client";

import DistrictForm from "../container/form/form";
import { useDistrictForm } from "../hook/useForm";

export default function DistrictCreate() {
  const { form, onSubmit } = useDistrictForm();
  return (
    <DistrictForm form={form} onSubmit={onSubmit} />
  );
}
