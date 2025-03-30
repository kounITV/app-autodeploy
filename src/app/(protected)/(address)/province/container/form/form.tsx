"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type provinceFormSchema } from "./schema";

const formTitle = "ແກ້ໄຂແຂວງ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງແຂວງ";

interface ProvinceFormProps {
  form: UseFormReturn<z.infer<typeof provinceFormSchema>>;
  onSubmit: (data: z.infer<typeof provinceFormSchema>) => Promise<void>;
}

const ProvinceForm: React.FC<ProvinceFormProps> = ({ form, onSubmit }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="provinceLao" control={form.control} label="ຊື່ແຂວງພາສາລາວ">
          <Form.Input.Input placeholder="	ຊື່ແຂວງພາສາລາວ" />
        </Form.Field>
        <Form.Field name="provinceEnglish" control={form.control} label="ຊື່ແຂວງຊື່ພາສາອັງກິດ">
          <Form.Input.Input placeholder="ຊື່ແຂວງຊື່ພາສາອັງກິດ" />
        </Form.Field>
        <Form.Field name="status" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ">
          <Form.Input.Switch />
        </Form.Field>
      </div>
    </Form>
  );
};

export default ProvinceForm;
