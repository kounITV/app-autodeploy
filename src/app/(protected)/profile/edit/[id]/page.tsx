"use client";

import { Card } from "@/components/ui";
import ProfileForm from "../../container/form/form";
import { useProfileEditForm } from "../../hook/useEditForm";
import { SquareUserRound } from "lucide-react";
import { Form } from "@/components/containers/form";

export default function EditProfile({ params }: { params: { id: number } }) {
  const { form, onSubmit } = useProfileEditForm({ id: Number(params.id) });
  return (
    <Card>
      <Form formInstance={form} onSubmit={onSubmit} className="border-none shadow-none p-0 -mb-4" showButton={false}>
        <div className="flex flex-wrap gap-2">
          <Form.Field name="image" control={form.control} required={false}>
            <Form.Input.ImageWithBox
              label="3x4 cm"
              iconImage={<SquareUserRound className="w-10 h-10" />}
              accept="image/*"
              className="flex w-[3cm] h-[4cm] items-center justify-center rounded-lg border border-dashed bg-muted" />
          </Form.Field>
        </div>
      </Form>
      <ProfileForm form={form} onSubmit={onSubmit} action="edit"/>
    </Card>
  );
}
