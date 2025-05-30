/* eslint-disable max-nested-callbacks */
import { Form } from "@/components/containers/form";
import { IFormDistrictProps, type IFormProps } from "@/lib/interface";
import { useUpdateDefaultValues } from "@/lib/update-default-values";

import React from "react";
import useeDistrictCombobox from "src/app/(protected)/(address)/district/hook/useDistrictCombobox";
import { usenationalitiesCombobox } from "src/app/(protected)/nationality/hook/usenationalitiesCombobox";
import useeProvinceCombobox from "src/app/(protected)/(address)/province/hook/useProvinceCombobox";
import useeVillageCombobox from "src/app/(protected)/(address)/village/hook/useDistrictCombobox";
import { handleEnterFocusNext } from "./field-focus";
import { CalendarDate } from "@internationalized/date"; 

const genderOptions = [
  { value: "MALE", label: "ຊາຍ" },
  { value: "FEMALE", label: "ຍິງ" },
];

const IdentifyOptions = [
  { value: "passport", label: "Passport" },
  { value: "nationalId", label: "ບັດປະຈຳຕົວ" },
  { value: "driverLicense", label: "ໃບຂັບຂີ່" },
];
export const PersonalInfoSection: React.FC<IFormProps & { 
  disabled?: boolean,
}> = ({ form, disabled }) => {
  const nationalityId = form.watch("nationalityId") ?? 0;
  const { result: countriesOptions } = usenationalitiesCombobox({ isNationality: true });
  const { result: ethnicityOptions } = usenationalitiesCombobox({ isNationality: true });
  useUpdateDefaultValues({ form, fieldName: "gender", value: "MALE", shouldUpdate: true });
  useUpdateDefaultValues({ form, fieldName: "nationalityId", value: 104, shouldUpdate: true });
  useUpdateDefaultValues({ form, fieldName: "ethnicityId", value: nationalityId, shouldUpdate: nationalityId !== 0 });
  return (
    <div className="space-y-4 -mt-5">
      <h3 className="text-lg font-medium">ຂໍ້ມູນສ່ວນຕົວ</h3>
      <div className="grid gap-4 sm:grid-cols-1">
        <div className="grid gap-4 sm:grid-cols-3">
          <Form.Field name="firstName" control={form.control} label="ຊື່ແທ້" >
            <Form.Input.Input placeholder="ປ້ອນຊື່" disabled={disabled} />
          </Form.Field>
          <Form.Field name="lastName" control={form.control} label="ນາມສະກຸນ" >
            <Form.Input.Input placeholder="ປ້ອນນາມສະກຸນ" disabled={disabled} />
          </Form.Field>
          <Form.Field name="dateOfBirth" control={form.control} label="ວັນເດືອນປີເກີດ">
            <Form.Input.DateTimePicker disabled={disabled} />
          </Form.Field>
          <Form.Field name="applicationNumber" control={form.control} label="ເລກທີໃບຄໍາຮ້ອງ" >
            <Form.Input.Input placeholder="ເລກທີໃບຄໍາຮ້ອງ" onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          <Form.Field name="phoneNumber" control={form.control} label="ເບີໂທລະສັບ">
            <Form.Input.Input placeholder="ປ້ອນເບີໂທ" onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          <Form.Field name="gender" control={form.control} label="ເພດ">
            <Form.Input.Select options={genderOptions} className='w-full' onKeyDown={handleEnterFocusNext} defaultValue="MALE"/>
          </Form.Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Form.Field name="nationalityId" control={form.control} label="ສັນຊາດ" >
            <Form.Input.Combobox placeholder="ເລືອກສັນຊາດ" className="w-full" options={countriesOptions} onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          <Form.Field name="ethnicityId" control={form.control} label="ເລືອກ​ເຊື້ອຊາດ" >
            <Form.Input.Combobox placeholder="ເລືອກ​ເຊື້ອຊາດ" className="w-full" defaultValue={nationalityId} options={ethnicityOptions}onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
        </div>
      </div>
    </div>
  );
};

export const IdentitySection: React.FC<IFormProps> = ({ form }) => {
  useUpdateDefaultValues({ form, fieldName: "identityType", value: "nationalId", shouldUpdate: true });
  const currentDay = new Date();
  const isoString = currentDay.toISOString();
  const year = currentDay.getUTCFullYear();
  const month = currentDay.getUTCMonth() + 1;
  const day = currentDay.getUTCDate(); 
  // eslint-disable-next-line no-magic-numbers
  const expireDate = new CalendarDate(year, month, day);
  useUpdateDefaultValues({ form, fieldName: "identityExpiryDate", value: isoString, shouldUpdate: true });
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ຂໍ້ມູນເອກະສານຢັ້ງຢືນ</h3>
      <div className="grid gap-4 sm:grid-cols-4">
        <Form.Field name="identityType" control={form.control} label="ປະເພດເອກະສານ" >
          <Form.Input.Select options={IdentifyOptions} className='w-full' onKeyDown={handleEnterFocusNext} defaultValue="nationalId"/>
        </Form.Field>
        <Form.Field name="identityNumber" control={form.control} label="ເລກທີເອກະສານ">
          <Form.Input.Input placeholder="ປ້ອນເລກເອກະສານ" onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="identityIssueDate" control={form.control} label="ວັນອອກເອກະສານ">
          <Form.Input.DateTimePicker onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="identityExpiryDate" control={form.control} label="ວັນຫມົດອາຍຸ">
          <Form.Input.DateTimePicker onKeyDown={handleEnterFocusNext} defaultValue={expireDate}/>
        </Form.Field>
      </div>
    </div>
  );
};
export const CurrentAddressSection: React.FC<IFormDistrictProps> = ({ form, setIsAddingVillage }) => {
  const initializeProvinceId = form.watch("currentProvince") ?? 0;
  const initializeDistrictId = form.watch("currentDistrict") ?? 0;
  const { result: provinceOptions } = useeProvinceCombobox();
  const { result: districtOptions } = useeDistrictCombobox({ provinceId: initializeProvinceId });
  const { result: villageOptions } = useeVillageCombobox({ districtId: initializeDistrictId });
  useUpdateDefaultValues({ form, fieldName: "currentVillageId", value: 4, shouldUpdate: true });
  useUpdateDefaultValues({ form, fieldName: "currentProvince", value: 5, shouldUpdate: true });
  useUpdateDefaultValues({ form, fieldName: "currentDistrict", value: 149, shouldUpdate: true });
  const extendedVillageOptions = [
    { label: '+ ເພີ່ມບ້ານ', value: 'add' },
    ...villageOptions,
  ];
  const handleVillageChange = (value: string | number) => {
    if (value === 'add') {
      setIsAddingVillage(true);
      form.setValue('currentVillageId', '');
    } else {
      setIsAddingVillage(false);
      form.setValue('currentVillageId', value);
    }
  };
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ທີ່ຢູ່ປັດຈຸບັນ</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <Form.Field name="currentProvince" control={form.control} label="ແຂວງ">
          <Form.Input.Combobox placeholder="ເລືອກແຂວງ" className="w-full" options={provinceOptions} onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="currentDistrict" control={form.control} label="ເມືອງ" >
          <Form.Input.Combobox placeholder="ເລືອກເມືອງ" className="w-full" options={districtOptions} onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="currentVillageId" control={form.control} label="ບ້ານ">
          {/* <Form.Input.Combobox placeholder="ເລືອກບ້ານ" className="w-full" options={villageOptions} onKeyDown={handleEnterFocusNext}/> */}
          <Form.Input.Combobox placeholder="ເລືອກບ້ານ" className="w-full" options={extendedVillageOptions} onChange={handleVillageChange} onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
      </div>
    </div>
  );
};
export const OverseasAddressSection: React.FC<IFormProps> = ({ form }) => {
  const { result: ethnicityOptions } = usenationalitiesCombobox({ isNationality: true });
  useUpdateDefaultValues({ form, fieldName: "overseasCountryId", value: 104, shouldUpdate: true });
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ທີ່ຢູ່ຕ່າງປະເທດ</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="overseasCountryId" control={form.control} label="ປະເທດ">
          <Form.Input.Combobox placeholder="ປະເທດ" className="w-full" options={ethnicityOptions} onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
        <Form.Field name="overseasProvince" control={form.control} label="ແຂວງ">
          <Form.Input.Input placeholder="ປ້ອນແຂວງ" onKeyDown={handleEnterFocusNext}/>
        </Form.Field>
      </div>
    </div>
  );
};
export const ProfileDocuments: React.FC<IFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ອັບໂຫຼດເອກະສານ</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="profileFile" control={form.control} label="ເອກກະສານ" required={false}>
          <Form.Input.File name="profileFile" control={form.control} maxFiles={10}/>
        </Form.Field>
      </div>
    </div>
  );
};