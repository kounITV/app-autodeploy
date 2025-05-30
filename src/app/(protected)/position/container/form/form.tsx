"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type positionFormSchema } from "./schema";
import { handleEnterFocusNext } from "src/app/(protected)/profile/container/form/field-focus";

const formTitle = "ສ້າງຕຳແໜ່ງ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງຕຳແໜ່ງ";

interface PositionFormProps {
  form: UseFormReturn<z.infer<typeof positionFormSchema>>;
  onSubmit: (data: z.infer<typeof positionFormSchema>) => Promise<void>;
}

const PositionForm: React.FC<PositionFormProps> = ({ form, onSubmit }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="englishName" control={form.control} label="ຊື່ພາສາອັງກິດ">
          <Form.Input.Input placeholder="ປ້ອນຊື່" onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="laoName" control={form.control} label="ຊື່ພາສາລາວ">
          <Form.Input.Input placeholder="ປ້ອນຊື່" onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="status" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ">
          <Form.Input.Switch />
        </Form.Field>
      </div>
    </Form>
  );
};

export default PositionForm;
