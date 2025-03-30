"use client";

import GalleryForm from "../container/form";
import { useGalleryCreateForm } from "../hook/useForm";

export default function GalleryCreate() {
  const { form, onSubmit } = useGalleryCreateForm();
  return (
    <GalleryForm form={form} onSubmit={onSubmit} />
  );
}
