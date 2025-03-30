import React from "react";
import { type UseFormReturn } from "react-hook-form";

import { Form } from "@/components/containers/form";
import { WarningMessage } from "@/components/containers/warning-message";
import { type BlacklistFormCreateType } from "./schema";

interface BlacklistProfileCreateFormProps {
    form: UseFormReturn<BlacklistFormCreateType>;
    onSubmit: (data: BlacklistFormCreateType) => Promise<void>;
}

const BlacklistProfileCreateForm: React.FC<BlacklistProfileCreateFormProps> = ({ form, onSubmit }) => {
  return (
    <Form formInstance={form} onSubmit={onSubmit} className="border-none" >
      <Form.Field name="reason" control={form.control} label="ເຫດຜົນທີ່ຂື້ນບັນຊີດໍາ">
        <Form.Input.Textarea placeholder="ເຫດຜົນ..." className="w-full" />
      </Form.Field>
      <WarningMessage/>
    </Form>
  );
};

export default BlacklistProfileCreateForm;

