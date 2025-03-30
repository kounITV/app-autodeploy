import { validateImageSchema } from "@/lib/validation";
import { z } from "zod";

export const profileFormSchema = z.object({
  image: validateImageSchema({
    required: false,
    message: "ກະລຸນາເລືອກຮູບພາບ",
  }).or(z.string()),
  oldImage: validateImageSchema({
    required: false,
    message: "ກະລຸນາເລືອກຮູບພາບ",
  }).or(z.string()),
  identityIssueDate: z.date().or(z.string()).refine((value) => { return value != null && value !== ""; }, { message: "ກະລຸນາເລືອກບັດປະຈຳຕົວລົງວັນ" }),
  firstName: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ຂອງທ່ານ" }),
  lastName: z.string().min(1, { message: "ກະລຸນາໃສ່ນາມສະກຸນຂອງທ່ານ" }),
  phoneNumber: z
    .string()
    .min(1, { message: "ກະລຸນາໃສ່ເບີໂທຂອງທ່ານ" })
    .regex(/^\d{8,}$/, { message: "ເບີໂທທີ່ປ້ອນບໍ່ຖືກຕ້ອງ" }),
  dateOfBirth: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ວັນເດືອນປີເກີດ",
    }),
  gender: z.string().min(1, { message: "ກະລຸນາໃສ່ເພດທ່ານ" }),
  nationalityId: z.number().min(1, { message: "ກະລຸນາໃສ່ປະເພດທ່ານ" }),
  ethnicityId: z.number().min(1, { message: "ກະລຸນາໃສ່ປະເພດທ່ານ" }),
  identityType: z.string().min(1, { message: "ກະລຸນາໃສ່ປະເພດອອກເອກະສານ" }),
  identityNumber: z.string().min(1, { message: "ກະລຸນາໃສ່ໝາຍເລກບັດປະຈຳຕົວ" }),
  identityExpiryDate: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ກະລຸນາໃສ່ວັນເດືອນປີເກີດໃນຮູບແບບ",
    }),
  currentProvince: z.number().min(1, { message: "ກະລຸນາໃສ່ແຂວງປັດຈຸບັນ" }),
  currentDistrict: z.number().min(1, { message: "ກະລຸນາໃສ່ເມືອງປັດຈຸບັນ" }),
  currentVillageId: z.number().min(1, { message: "ກະລຸນາເລືອກບ້ານ" }),
  overseasCountryId: z.number().min(1, { message: "ກະລຸນາໃສ່ປະເທດ" }),
  overseasProvince: z.string().min(1, { message: "ກະລຸນາໃສ່ແຂວງປັດຈຸບັນ" }),
  applicationNumber: z.string().min(1, { message: "ກະລຸນາໃສ່ເອກທິຟອມ" }),
})
export const defaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  nationalityId: 1,
  ethnicityId: 1,
  identityType: "",
  identityIssueDate: "",
  identityNumber: "",
  identityExpiryDate: "",
  currentProvince: 0,
  currentDistrict: 0,
  currentVillageId: 0,
  overseasCountryId: 1,
  overseasDistrict: "",
  applicationNumber: "",
};
