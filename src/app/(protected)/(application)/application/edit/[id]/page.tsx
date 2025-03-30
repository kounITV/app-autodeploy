"use client";

import ApplicationFormEdit from "../../container/form/formEdit";
import { useApplicationEditForm } from "../../hook/useEditForm";

export default function ApplicationEdit({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useApplicationEditForm({ id: Number(params.id) });
  const profileId = form.watch("profileId");
  const NewProfileId = Number(profileId);
  return <ApplicationFormEdit form={form} onSubmit={onSubmit} profileId={NewProfileId} />;
}
