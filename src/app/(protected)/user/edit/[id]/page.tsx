"use client";

import UserForm from "../../container/form/form";
import { useUserEditForm } from "../../hooks/useEditForm";

export default function UserEdit({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useUserEditForm({ id: Number(params.id) });
  return (
    <UserForm form={form} onSubmit={onSubmit} />
  );
}
