"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { continentOptions } from "../../options";
import { type nationalityFormSchema } from "./schema";

const formTitle = "ສ້າງປະເທດ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງປະເທດ";

interface NationalityFormProps {
  form: UseFormReturn<z.infer<typeof nationalityFormSchema>>;
  onSubmit: (data: z.infer<typeof nationalityFormSchema>) => Promise<void>;
}

const NationalityForm: React.FC<NationalityFormProps> = ({ form, onSubmit }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="name" control={form.control} label="ຊື່ປະເທດພາສາລາວ">
          <Form.Input.Input placeholder="ຊື່ປະເທດພາສາລາວ" />
        </Form.Field>
        <Form.Field name="nationality" control={form.control} label="ຊື່ປະເທດພາສາອັງກິດ">
          <Form.Input.Input placeholder="ຊື່ປະເທດພາສາອັງກິດ" />
        </Form.Field>
        <Form.Field name="code" control={form.control} label="​ເຊື້ອຊາດ">
          <Form.Input.Input placeholder="​ເຊື້ອຊາດ" />
        </Form.Field>
        <Form.Field name="continent" control={form.control} label="ທະວີບ">
          <Form.Input.Combobox placeholder="ທະວີບ" options={continentOptions} />
        </Form.Field>
        <Form.Field name="status" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ">
          <Form.Input.Switch />
        </Form.Field>
      </div>
    </Form>
  );
};

export default NationalityForm;
