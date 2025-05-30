"use client";

import DistrictForm from "../container/form/form";
import { useVillageForm } from "../hook/useForm";

export default function VillageCreate() {
  const { form, onSubmit } = useVillageForm();
  return (
    <DistrictForm form={form} onSubmit={onSubmit} />
  );
}
