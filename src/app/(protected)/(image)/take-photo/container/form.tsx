"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { useWebcamForm } from "../useForm";

export const UploadForm: React.FC<any> = ({ image }) => {
  const { form, onSubmit, handleImageUpload } = useWebcamForm();
  React.useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);
  return (
    <Form formInstance={form} onSubmit={onSubmit}>
      <Form.Field name="name" control={form.control} label="ຊື່ຮູບພາບ">
        <Form.Input.Input placeholder="ປ້ອນຊື່" />
      </Form.Field>
    </Form>
  );
};
