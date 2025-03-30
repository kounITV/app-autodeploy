"use client";

import UserForm from "../container/form/form";
import { useUserForm } from "../hooks/useForm";

export default function UserCreate() {
  const { form, onSubmit } = useUserForm();
  return (
    <UserForm form={form} onSubmit={onSubmit} />
  );
}
