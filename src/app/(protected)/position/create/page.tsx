"use client";

import PositionForm from "../container/form/form";
import { usePositionForm } from "../hook/useForm";

export default function PositionCreate() {
  const { form, onSubmit } = usePositionForm();
  return (
    <PositionForm form={form} onSubmit={onSubmit} />
  );
}
