"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type currencyFormSchema } from "./schema";

const formTitle = "ສ້າງສະກຸນເງິນ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງສະກຸນເງິນ";

interface CurrencyFormProps {
  form: UseFormReturn<z.infer<typeof currencyFormSchema>>;
  onSubmit: (data: z.infer<typeof currencyFormSchema>) => Promise<void>;
}

const CurrencyForm: React.FC<CurrencyFormProps> = ({ form, onSubmit }) => {
  return (
    <div className="">
      <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Form.Field name="name" control={form.control} label="ຊື່">
            <Form.Input.Input placeholder="US Dollar" />
          </Form.Field>
          <Form.Field name="code" control={form.control} label="ລະຫັດ">
            <Form.Input.Input placeholder="USD" />
          </Form.Field>
          <div className="space-y-4">
            <Form.Field name="symbol" control={form.control} label="ສັນຍາລັກ">
              <Form.Input.Input placeholder="$"  />
            </Form.Field>
            <Form.Field name="status" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ">
              <Form.Input.Switch />
            </Form.Field>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CurrencyForm;
