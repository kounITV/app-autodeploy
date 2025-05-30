"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type villageFormSchema } from "./schema";
import useeDistrictCombobox from "src/app/(protected)/(address)/district/hook/useDistrictCombobox";
import { cn } from "@/lib/utils";

const formTitle = "ເພິ່ມ ຫຼື ແກ້ໄຂບ້ານ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງຈັດການບ້ານ";

interface DistrictFormProps {
  form: UseFormReturn<z.infer<typeof villageFormSchema>>;
  onSubmit: (data: z.infer<typeof villageFormSchema>) => Promise<void>;
  className?: string;
}

const DistrictForm: React.FC<DistrictFormProps> = ({ form, onSubmit, className }) => {
  const { result: districtOptions } = useeDistrictCombobox({});
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className={cn("grid gap-4 md:grid-cols-2", className)}>
        <Form.Field name="villageLao" control={form.control} label="ຊື່ບ້ານພາສາລາວ">
          <Form.Input.Input placeholder="ຊື່ບ້ານພາສາລາວ" />
        </Form.Field>
        <Form.Field name="villageEnglish" control={form.control} label="ຊື່ບ້ານຊື່ພາສາອັງກິດ">
          <Form.Input.Input placeholder="ຊື່ບ້ານຊື່ພາສາອັງກິດ" />
        </Form.Field>
        <div className="space-y-2">
          <Form.Field name="districtId" control={form.control} label="ເມືອງ">
            <Form.Input.Combobox options={districtOptions} />
          </Form.Field>
          <Form.Field name="status" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ">
            <Form.Input.Switch />
          </Form.Field>
        </div>
      </div>
    </Form>
  );
};

export default DistrictForm;
