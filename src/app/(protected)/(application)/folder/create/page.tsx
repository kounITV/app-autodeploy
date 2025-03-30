"use client";

import { FolderForm } from "../container/form";
import { useFolderForm } from "../hook/useForm";

export default function FolderCreate() {
  const { form, onSubmit } = useFolderForm();
  return (
    <>
      <FolderForm form={form} onSubmit={onSubmit} />
    </>
  );
}
