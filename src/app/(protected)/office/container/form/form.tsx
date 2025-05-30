"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import useeDistrictCombobox from "src/app/(protected)/(address)/district/hook/useDistrictCombobox";
import useeProvinceCombobox from "src/app/(protected)/(address)/province/hook/useProvinceCombobox";
import { type z } from "zod";
import { type officeFormSchema } from "./schema";
import { handleEnterFocusNext } from "src/app/(protected)/profile/container/form/field-focus";

const formTitle = "ສ້າງຫ້ອງການ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນທິຕັ້ງຂອງຫ້ອງການ";

interface OfficeFormProps {
  form: UseFormReturn<z.infer<typeof officeFormSchema>>;
  onSubmit: (data: z.infer<typeof officeFormSchema>) => Promise<void>;
}

const OfficeForm: React.FC<OfficeFormProps> = ({ form, onSubmit }) => {
  const initializeProvinceId = form.watch("provinceId") ?? 0;
  const { result: provinceOptions } = useeProvinceCombobox();
  const { result: districtOptions } = useeDistrictCombobox({ provinceId: initializeProvinceId });
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="name" control={form.control} label="ຊື່ຫ້ອງການ">
          <Form.Input.Input placeholder="ປ້ອນຊື່ຫ້ອງການ" onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="village" control={form.control} label="ບ້ານ">
          <Form.Input.Input placeholder="ປ້ອນຊື່ບ້ານ" onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="provinceId" control={form.control} label="ແຂວງ">
          <Form.Input.Combobox placeholder="ເລືອກແຂວງ" className="w-full" options={provinceOptions} onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="districtId" control={form.control} label="ເມືອງ" >
          <Form.Input.Combobox placeholder="ເລືອກເມືອງ" className="w-full" options={districtOptions} onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="status" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ">
          <Form.Input.Switch />
        </Form.Field>
      </div>
    </Form>
  );
};

export default OfficeForm;
