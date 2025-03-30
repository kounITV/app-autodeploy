import { Form } from "@/components/containers/form";
import { type IFormProps } from "@/lib/interface";
import { useUpdateDefaultValues } from "@/lib/update-default-values";

import React from "react";
import useeDistrictCombobox from "src/app/(protected)/(address)/district/hook/useDistrictCombobox";
import { usenationalitiesCombobox } from "src/app/(protected)/nationality/hook/usenationalitiesCombobox";
import useeProvinceCombobox from "src/app/(protected)/(address)/province/hook/useProvinceCombobox";
import useeVillageCombobox from "src/app/(protected)/(address)/village/hook/useDistrictCombobox";

const genderOptions = [
  { value: "MALE", label: "ຊາຍ" },
  { value: "FEMALE", label: "ຍິງ" },
];

const IdentifyOptions = [
  { value: "passport", label: "Passport" },
  { value: "nationalId", label: "ບັດປະຈຳຕົວ" },
  { value: "driverLicense", label: "ໃບຂັບຂີ່" },
];
export const PersonalInfoSection: React.FC<IFormProps & { disabled?: boolean }> = ({ form, disabled }) => {
  const nationalityId = form.watch("nationalityId") ?? 0;
  const { result: countriesOptions } = usenationalitiesCombobox({ isNationality: true });
  const { result: ethnicityOptions } = usenationalitiesCombobox({ isNationality: true });
  useUpdateDefaultValues({ form, fieldName: "ethnicityId", value: nationalityId, shouldUpdate: nationalityId !== 0 });
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ຂໍ້ມູນສ່ວນຕົວ</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="firstName" control={form.control} label="ຊື່ແທ້" >
          <Form.Input.Input placeholder="ປ້ອນຊື່" disabled={disabled} />
        </Form.Field>
        <Form.Field name="lastName" control={form.control} label="ນາມສະກຸນ" >
          <Form.Input.Input placeholder="ປ້ອນນາມສະກຸນ" disabled={disabled} />
        </Form.Field>
        <Form.Field name="dateOfBirth" control={form.control} label="ວັນເດືອນປີເກີດ">
          <Form.Input.DateTimePicker disabled={disabled} />
        </Form.Field>
        <Form.Field name="applicationNumber" control={form.control} label="ເລກທີຟອມ" >
          <Form.Input.Input placeholder="" />
        </Form.Field>
        <Form.Field name="phoneNumber" control={form.control} label="ເບີໂທລະສັບ">
          <Form.Input.Input placeholder="ປ້ອນເບີໂທ" />
        </Form.Field>
        <Form.Field name="gender" control={form.control} label="ເພດ">
          <Form.Input.Select options={genderOptions} className='w-full' />
        </Form.Field>
        <Form.Field name="nationalityId" control={form.control} label="ສັນຊາດ" >
          <Form.Input.Combobox placeholder="ເລືອກສັນຊາດ" className="w-full" options={countriesOptions} />
        </Form.Field>
        <Form.Field name="ethnicityId" control={form.control} label="ເລືອກ​ເຊື້ອຊາດ" >
          <Form.Input.Combobox placeholder="ເລືອກ​ເຊື້ອຊາດ" className="w-full" defaultValue={nationalityId} options={ethnicityOptions} />
        </Form.Field>
      </div>
    </div>
  );
};

export const IdentitySection: React.FC<IFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ຂໍ້ມູນເອກະສານຢັ້ງຢືນ</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="identityType" control={form.control} label="ປະເພດເອກະສານ">
          <Form.Input.Select options={IdentifyOptions} className='w-full' />
        </Form.Field>
        <Form.Field name="identityNumber" control={form.control} label="ເລກເອກະສານ">
          <Form.Input.Input placeholder="ປ້ອນເລກເອກະສານ" />
        </Form.Field>
        <Form.Field name="identityIssueDate" control={form.control} label="ວັນອອກເອກະສານ">
          <Form.Input.DateTimePicker />
        </Form.Field>
        <Form.Field name="identityExpiryDate" control={form.control} label="ວັນຫມົດອາຍຸ">
          <Form.Input.DateTimePicker />
        </Form.Field>
      </div>
    </div>
  );
};
export const CurrentAddressSection: React.FC<IFormProps> = ({ form }) => {
  const initializeProvinceId = form.watch("currentProvince") ?? 0;
  const initializeDistrictId = form.watch("currentDistrict") ?? 0;
  const { result: provinceOptions } = useeProvinceCombobox();
  const { result: districtOptions } = useeDistrictCombobox({ provinceId: initializeProvinceId });
  const { result: villageOptions } = useeVillageCombobox({ districtId: initializeDistrictId });
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ທີ່ຢູ່ປັດຈຸບັນ</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <Form.Field name="currentProvince" control={form.control} label="ແຂວງ">
          <Form.Input.Combobox placeholder="ເລືອກແຂວງ" className="w-full" options={provinceOptions} />
        </Form.Field>
        <Form.Field name="currentDistrict" control={form.control} label="ເມືອງ" >
          <Form.Input.Combobox placeholder="ເລືອກເມືອງ" className="w-full" options={districtOptions} />
        </Form.Field>
        <Form.Field name="currentVillageId" control={form.control} label="ບ້ານ">
          <Form.Input.Combobox placeholder="ເລືອກບ້ານ" className="w-full" options={villageOptions} />
        </Form.Field>
      </div>
    </div>
  );
};
export const OverseasAddressSection: React.FC<IFormProps> = ({ form }) => {
  const { result: ethnicityOptions } = usenationalitiesCombobox({ isNationality: true });
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ທີ່ຢູ່ຕ່າງປະເທດ</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="overseasCountryId" control={form.control} label="ປະເທດ">
          <Form.Input.Combobox placeholder="ປະເທດ" className="w-full" options={ethnicityOptions} />
        </Form.Field>
        <Form.Field name="overseasProvince" control={form.control} label="ແຂວງ">
          <Form.Input.Input placeholder="ປ້ອນເມືອງ" />
        </Form.Field>
      </div>
    </div>
  );
};

