"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type priceFormSchema } from "./schema";

const formTitle = "ສ້າງລາຄາ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງລາຄາ";

interface PriceFormProps {
  form: UseFormReturn<z.infer<typeof priceFormSchema>>;
  onSubmit: (data: z.infer<typeof priceFormSchema>) => Promise<void>;
}

const PriceForm: React.FC<PriceFormProps> = ({ form, onSubmit }) => {
  return (
    <div className="">
      <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Form.Field name="name" control={form.control} label="ຊື່">
            <Form.Input.Input placeholder="ປ້ອນຊື່" />
          </Form.Field>
          <Form.Field name="price" control={form.control} label="ລາຄາ">
            <Form.Input.Input placeholder="ປ້ອນລາຄາ" type="number" />
          </Form.Field>
          <Form.Field name="type" control={form.control} label="ປະເພດເອກະສານ">
            <Form.Input.Select options={cardTypeOptions} className='w-full' />
          </Form.Field>
          <Form.Field name="duration" control={form.control} label="ອາຍຸບັດ">
            <Form.Input.Select options={expirationOptions} className='w-full' />
          </Form.Field>
          <div className="space-y-4">
            <Form.Field name="code" control={form.control} label="ລະຫັດລາຄາ">
              <Form.Input.Input placeholder="ລະຫັດລາຄາ" />
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

export default PriceForm;

const cardTypeOptions = [
  { value: "YELLOW", label: "ບັດຢັ້ງຢືນພັກເຊົາຊົ່ວຄາວ - Temporary Stay Card" },
  { value: "BLUE", label: "ບັດອະນຸຍາດພັກເຊົາຄົນຕ່າງປະເທດ - Stay Permit Card" },
];

const expirationOptions = [
  { value: "SIX_MONTHS", label: "6 ເດືອນ" },
  { value: "ONE_YEAR", label: "1 ປິ" },
];
