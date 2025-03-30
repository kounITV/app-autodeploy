"use client";

import VillageForm from "../../container/form/form";
import { useVillageEditForm } from "../../hook/useEditForm";

export default function VillageCreate({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useVillageEditForm({ id: Number(params.id) });
  return (
    <VillageForm form={form} onSubmit={onSubmit} />
  );
}
