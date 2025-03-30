'use client';
import * as z from "zod"

import { Form } from "@/components/containers/form";
import React from "react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Button, Separator } from "@/components/ui";
import { PlusCircle } from "lucide-react";
import { formSchema } from "./schema";
import usePriceCombobox from "src/app/(protected)/(finance)/price/hook/usePriceCombobox";

const formTitle = "ສ້າງແຟ້ມເອກກະສານ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງແຟ້ມ";

interface FolderFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
  isEdit?: boolean;
}

export const FolderForm: React.FC<FolderFormProps> = ({ form, onSubmit }) => {
  const { result: priceOptions } = usePriceCombobox({ status: true });
  const { fields: variantFields, append: append, remove: remove } = useFieldArray({
    control: form.control,
    name: "folderPrice",
  });
  const { errors } = form.formState;
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">ຂໍ້ມູນພື້ນຖານ</h3>
        <Form.Field name="name" control={form.control} label="ຊື່ແຟ້ມ">
          <Form.Input.Input placeholder="ຊື່ແຟ້ມ" />
        </Form.Field>
      </div>
      <Separator />
      <div className="space-y-4">
        <h3 className="text-lg font-medium">ປະເພດບັດ</h3>
        {variantFields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-4">
            <h4 className="font-medium">ປະເພດບັດ {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Field name={`folderPrice.${index}.amount`} control={form.control} label="ຈໍານວນຟອມ">
                <Form.Input.Input placeholder="ຊື່ຕົວເລືອກ" />
              </Form.Field>
              <Form.Field name={`folderPrice.${index}.priceId`} control={form.control} label="ປະເພດບັດ" >
                <Form.Input.Combobox placeholder="ປະເພດບັດ" className="w-full" options={priceOptions} />
              </Form.Field>
            </div>
            <Button variant="destructive" onClick={() => remove(index)}>
                 ລົບ
            </Button>
          </div>
        ))}
        <Button type="button"
          onClick={() => append({ amount: 1, priceId: 0 })}>
          <PlusCircle className="w-4 h-4 mr-2" />
          ເພີ່ມປະເພດບັດ
        </Button>
      </div>
      {Object.keys(errors).length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-medium text-red-800 mb-2">ຂໍ້ຜິດພາດໃນຟອມ</h3>
          <ul className="list-disc pl-5 space-y-1 text-red-600">
            {errors.folderPrice?.root?.message && <li>{errors.folderPrice?.root?.message}</li>}
          </ul>
        </div>
      )}
    </Form>
  );
}

