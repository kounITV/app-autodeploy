"use client";

import VillageForm from "../container/form/form";
import { useVillageForm } from "../hook/useForm";

export default function VillageCreate() {
  const { form, onSubmit } = useVillageForm();
  return (
    <VillageForm form={form} onSubmit={onSubmit} />
  );
}
