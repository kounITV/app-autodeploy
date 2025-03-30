"use client";

import { useUpdateDefaultValues } from "@/lib/update-default-values";
import FormProfileGallery from "../../../profileGallery/container/formProfileGallery";
import { useProfileGalleryCreateForm } from "../../../profileGallery/hook/useForm";
import GalleryForm from "../../container/form";
import { useGalleryEditForm } from "../../hook/useForm";

export default function GalleryEdit({ params }: { params: { id: number } }) {
  const galleryId = Number(params.id);
  const { form, onSubmit } = useGalleryEditForm({ id: galleryId });
  const { form: form2, onSubmit: onSubmit2 } = useProfileGalleryCreateForm();
  useUpdateDefaultValues({ form: form2, fieldName: "galleryId", value: galleryId, shouldUpdate: true })
  return (
    <div className="flex flex-wrap gap-2">
      <GalleryForm form={form} onSubmit={onSubmit} />
      <FormProfileGallery form={form2} onSubmit={onSubmit2} />
    </div>
  );
}
