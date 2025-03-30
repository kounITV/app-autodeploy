"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type districtFormSchema } from "./schema";

const formTitle = "ແກ້ໄຂຈັດການເມືອງ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງຈັດການເມືອງ";

interface DistrictFormProps {
  form: UseFormReturn<z.infer<typeof districtFormSchema>>;
  onSubmit: (data: z.infer<typeof districtFormSchema>) => Promise<void>;
}

const DistrictForm: React.FC<DistrictFormProps> = ({ form, onSubmit }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="districtLao" control={form.control} label="ຊື່ເມືອງພາສາລາວ">
          <Form.Input.Input placeholder="ຊື່ເມືອງພາສາລາວ" />
        </Form.Field>
        <Form.Field name="districtEnglish" control={form.control} label="ຊື່ເມືອງຊື່ພາສາອັງກິດ">
          <Form.Input.Input placeholder="ຊື່ເມືອງຊື່ພາສາອັງກິດ" />
        </Form.Field>
        <Form.Field name="status" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ">
          <Form.Input.Switch />
        </Form.Field>
      </div>
    </Form>
  );
};

export default DistrictForm;
