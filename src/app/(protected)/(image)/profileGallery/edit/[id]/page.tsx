"use client";

import FormProfileGallery from "../../container/formProfileGallery";
import { useProfileGalleryEditForm } from "../../hook/useForm";

export default function EditFormProfileGallery({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useProfileGalleryEditForm({ id: Number(params.id) });
  return (
    <FormProfileGallery form={form} onSubmit={onSubmit} />
  );
}
