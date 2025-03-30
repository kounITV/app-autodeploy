"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { GalleryFormSchemaType } from "../hook/useForm";
import { SquareUserRound } from "lucide-react";

const formTitle = "ສ້າງຮູບພາບ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງຮູບພາບ";

interface GalleryFormProps {
  form: UseFormReturn<GalleryFormSchemaType>;
  onSubmit: (data: GalleryFormSchemaType) => Promise<void>;
}

const GalleryForm: React.FC<GalleryFormProps> = ({ form, onSubmit }) => {
  return (
    <div className=" w-fit">
      <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
        <Form.Field name="image" control={form.control} label="ຮູບພາບ" description="ຮູບພາບປະກອບຕິດບັດ" required={false}>
          <Form.Input.Image
            label="3x4 cm"
            iconImage={<SquareUserRound className="w-32 h-32" />}
            accept="image/*"
            className="flex w-[10cm] h-[10cm] items-center justify-center rounded-lg border border-dashed bg-muted" />
        </Form.Field>
        <Form.Field name="name" control={form.control} label="ຊື່">
          <Form.Input.Input placeholder="ປ້ອນຊື່" type="text" />
        </Form.Field>
      </Form>
    </div>
  );
};

export default GalleryForm;
