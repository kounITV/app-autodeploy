"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import useOfficeCombobox from "src/app/(protected)/office/hook/useOfficeCombobox";

const formTitle = "ສ້າງຜູ້ໃຊ້ງານລະບົບ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບໃຫ້ຖ້ວນ";

const roleOptions = [
  { value: "ADMIN", label: "ແອັດມິນ" },
  { value: "FINANCE", label: "ທີມງານການເງິນ" },
  { value: "POLICE_OFFICER", label: "ທີມງານຕື່ມຟອມ" },
  { value: "POLICE_PRODUCTION", label: "ທີມງານຜະລິດ" },
  { value: "VERSIFICATION_OFFICER", label: "ທີມງານກວດຂໍ້ມູນບັດ" },
];

const UserForm: React.FC<any> = ({ form, onSubmit }) => {
  const { result: officeOptions } = useOfficeCombobox();
  return (
    <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="username" control={form.control} label="ຊື່ຜູ້ໃຊ້ງານລະບົບ" description="ຊື່ບັນຊີຜູ້ໃຊ້">
          <Form.Input.Input placeholder="Thavisouk " />
        </Form.Field>
        <Form.Field name="phone" control={form.control} label="ເບີໂທ" description="ເບີໂທນີ້ແມ່ນໃຊ້ເຂົ້າລະບົບ">
          <Form.Input.Input placeholder="59684710" />
        </Form.Field>
        <Form.Field name="firstName" control={form.control} label="ຊື່ແທ້" description="ຊື່ແທ້">
          <Form.Input.Input placeholder="Thavisouk " />
        </Form.Field>
        <Form.Field name="lastName" control={form.control} label="ນາມສະກຸນ" description="ນາມສະກຸນ">
          <Form.Input.Input placeholder="Manalavong" />
        </Form.Field>
        <Form.Field name="role" control={form.control} label="ສີດຜູ້ໃຊ້ງານລະບົບ" >
          <Form.Input.Select placeholder="ເລືອກສີດ" className="w-full" options={roleOptions} />
        </Form.Field>
        <Form.Field name="email" control={form.control} label="ອີເມລ" required={false}>
          <Form.Input.Input placeholder="Thavisoukmnlv@gmail.com" className="w-full" />
        </Form.Field>
        <Form.Field name="officeId" control={form.control} label="ຫ້ອງການທີ່ປະຈໍາການ" description="ຊື່ບັນຊີຜູ້ໃຊ້ແມ່ນຂຶ້ນກັບາສັງຫ້ອງການຢູ່ໃສ" required={false}>
          <Form.Input.Combobox options={officeOptions} placeholder="ເລືອກຫ້ອງການ" className="w-full" />
        </Form.Field>
        <Form.Field name="userOffice" control={form.control} label="ສິດການເຂົ້າເຖີງຂໍ້ມູນ" description="ສາມາດເຂົ້າເຖີງຂໍ້ມູນຕາມສາຂາ" required={false}>
          <Form.Input.MultiSelect options={officeOptions} placeholder="ເລືອກຫ້ອງການ" className="w-full" />
        </Form.Field>
        <div>
          <Form.Field name="password" control={form.control} label="ລະຫັດຜ່ານ">
            <Form.Input.Password />
          </Form.Field>
          <Form.Field name="isActive" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ" required={false}>
            <Form.Input.Switch />
          </Form.Field>
        </div>
 
      </div>
      {form.formState.errors.root && (
        <p className="text-red-600 text-sm">{form.formState.errors.root.message}</p>
      )}
    </Form>
  );
};

export default UserForm;

