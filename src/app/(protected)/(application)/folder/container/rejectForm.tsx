import React from "react";

import { Form } from "@/components/containers/form";
import { useFolderRejectForm } from "../hook/useForm";
import { useUpdateDefaultValues } from "@/lib/update-default-values";

interface RejectCreateFormCreateFormProps {
    folderId: number
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const RejectCreateForm: React.FC<RejectCreateFormCreateFormProps> = ({ folderId, setDialogOpen }) => {
  const { form, onSubmit } = useFolderRejectForm({ folderId, setDialogOpen });
  useUpdateDefaultValues({ form, fieldName: "folderId", value: folderId, shouldUpdate: folderId });
  return (
    <Form formInstance={form} onSubmit={onSubmit} className="border-none" >
      <Form.Field name="comment" control={form.control} label="ເຫດຜົນທີ່ສົ່ງແຟ້ມເອກກະສານກັບ">
        <Form.Input.Textarea placeholder="ເຫດຜົນ..." className="w-full" />
      </Form.Field>
    </Form>

  );
};

export default RejectCreateForm;

