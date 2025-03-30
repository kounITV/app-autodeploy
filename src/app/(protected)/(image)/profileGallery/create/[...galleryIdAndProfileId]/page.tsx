"use client";

import { useUpdateDefaultValues } from "@/lib/update-default-values";
import FormProfileGallery from "../../container/formProfileGallery";
import { useProfileGalleryCreateForm } from "../../hook/useForm";

export default function ProfileGalleryCreate({ params }: { params: { galleryIdAndProfileId: number[] } }) {
  const [galleryID, profileId] = params.galleryIdAndProfileId;
  const NewProfileId = Number(profileId);
  const NewGalleryId = Number(galleryID);
  const { form, onSubmit } = useProfileGalleryCreateForm();
  useUpdateDefaultValues({ form, fieldName: "galleryId", value: NewGalleryId, shouldUpdate: NewGalleryId !== 0 })
  useUpdateDefaultValues({ form, fieldName: "profileId", value: NewProfileId, shouldUpdate: NewProfileId !== 0 })
  return (
    <FormProfileGallery form={form} onSubmit={onSubmit} />
  );
}
