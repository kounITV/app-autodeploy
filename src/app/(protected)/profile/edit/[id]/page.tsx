"use client";

import { Card } from "@/components/ui";
import ProfileForm from "../../container/form/form";
import { useProfileEditForm } from "../../hook/useEditForm";

export default function EditProfile({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useProfileEditForm({ id: Number(params.id) });
  return (
    <Card>
      <ProfileForm form={form} onSubmit={onSubmit} action="edit" />
    </Card>
  );
}
