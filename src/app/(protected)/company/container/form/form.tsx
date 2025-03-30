"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type companyFormSchema } from "./schema";
import { Separator } from "@/components/ui";

const formTitle = "ສ້າງຫົວໜ່ວຍທຸລະກິດ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງຫົວໜ່ວຍທຸລະກິດ";

interface CompanyFormProps {
  form: UseFormReturn<z.infer<typeof companyFormSchema>>;
  onSubmit: (data: z.infer<typeof companyFormSchema>) => Promise<void>;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ form, onSubmit }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <h3 className="text-lg font-medium">ຂໍ້ມູນຫົວໜ່ວຍທຸລະກິດ</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="name" control={form.control} label="ຊື່ຫົວໜ່ວຍທຸລະກິດ">
          <Form.Input.Input placeholder="ປ້ອນຊື່" />
        </Form.Field>
        <Form.Field name="businessCode" control={form.control} label="ເລກທະບຽນ" required={false}>
          <Form.Input.Input placeholder="000001" />
        </Form.Field>
        <Form.Field name="businessRegisterBy" control={form.control} label="ອອດໂດຍ" required={false}>
          <Form.Input.Combobox options={businessRegisterByOptions} className='w-full' disabled={true} />
        </Form.Field>
      </div>
      <Separator/>
      <h3 className="text-lg font-medium">ຂໍ້ມູນເອກກະສານ</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="companyFile" control={form.control} label="ເອກກະສານ" required={false}>
          <Form.Input.File name="companyFile" control={form.control} maxFiles={10}/>
        </Form.Field>
      </div>
    </Form>
  );
};

export default CompanyForm;

const businessRegisterByOptions = [
  { value: "government", label: "ລັດຖະບານ" },
  { value: "ministry", label: "ພະແນກ" },
  { value: "province", label: "ແຂວງ" },
  { value: "district", label: "ເມືອງ" },
];
