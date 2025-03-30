/* eslint-disable no-magic-numbers */
import { z } from "zod";

const MAX_REASON_LENGTH = 500;

export const checkBlacklistFormSchema = z.object({
  firstName: z.string().min(1, { message: "ກະລຸນາໃສ່ຊື່ຂອງທ່ານ" }),
  lastName: z.string().min(1, { message: "ກະລຸນາໃສ່ນາມສະກຸນຂອງທ່ານ" }),
  dateOfBirth: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ກະລຸນາໃສ່ວັນເດືອນປີເກີດ",
    }),
});

export const blacklistFormCreateSchema = z.object({
  reason: z
    .string()
    .min(1, { message: "ເຫດຜົນຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວອັກສອນ" })
    .max(MAX_REASON_LENGTH, { message: "ເຫດຜົນຕ້ອງບໍ່ເກີນ 500 ຕົວອັກສອນ" }),
  profileId: z.number(),
});

export const defaultValues = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
};

export const blacklistDefaultValues = {
  reason: "",
  profileId: 0,
};

export type BlacklistFormCreateType = z.infer<typeof blacklistFormCreateSchema>;