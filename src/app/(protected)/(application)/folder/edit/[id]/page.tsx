"use client";

import { FolderForm } from "../../container/form";
import { useFolderEditForm } from "../../hook/useEditForm";

export default function ProfileEdit({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useFolderEditForm({ id: Number(params.id) });
  return (
    <FolderForm form={form} onSubmit={onSubmit} isEdit />
  );
}
