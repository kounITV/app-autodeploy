import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/containers";
import { Form } from "@/components/containers/form";
import { type checkBlacklistFormSchema } from "./schema";
interface BlacklistProfileFormProps {
  form: UseFormReturn<z.infer<typeof checkBlacklistFormSchema>>;
  onSubmit: (data: z.infer<typeof checkBlacklistFormSchema>) => Promise<void>;
}

const BlacklistProfileForm: React.FC<BlacklistProfileFormProps> = ({ form, onSubmit }) => {
  const { errors } = form.formState;
  return (
    <Form formInstance={form} onSubmit={onSubmit} className="border-none shadow-none p-0" showButton={false}>
      {Object.keys(errors).length > 0 && (
        <div className=" p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-medium text-red-800 mb-2">ຂໍ້ຜິດພາດໃນຟອມ</h3>
          <ul className="list-disc pl-5 space-y-1 text-red-600">
            {Object.entries(errors).map(([key, error]) => (
              <li key={key}>{error?.message || key}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Form.Field name="firstName" control={form.control} label="ຊື່ແທ້">
            <Form.Input.Input placeholder="ປ້ອນຊື່" />
          </Form.Field>
          <Form.Field name="lastName" control={form.control} label="ນາມສະກຸນ">
            <Form.Input.Input placeholder="ປ້ອນນາມສະກຸນ" />
          </Form.Field>
          <Form.Field name="dateOfBirth" control={form.control} label="ວັນເດືອນປີເກີດ">
            <Form.Input.DateTimePicker />
          </Form.Field>
        </div>
      </div>
      <Button
        loading={form?.formState.isSubmitting}
        disabled={form?.formState.isSubmitting}
      >ໄປຕໍ່</Button>
    </Form>
  );
};

export default BlacklistProfileForm;

