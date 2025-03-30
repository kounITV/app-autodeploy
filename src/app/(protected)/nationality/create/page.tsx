"use client";

import NationalityForm from "../container/form/form";
import { usenationalityForm } from "../hook/useForm";

export default function nationalityCreate() {
  const { form, onSubmit } = usenationalityForm();
  return (
    <NationalityForm form={form} onSubmit={onSubmit} />
  );
}
