import { z } from "zod";

export const applicationSchema = z.object({
  numberId: z.number().positive({
    message: "ກະລຸນາເລືອກເລກທິ",
  }),
  profileId: z.number().positive({
    message: "ກະລຸນາເລືອກບຸກຄົນ",
  }),
  folderId: z.number().positive({
    message: "ກະລຸນາເລືອກແຟ້ມເອກກະສານ",
  }),
  positionId: z.number().positive({
    message: "ກະລຸນາເລືອກຕຳແໜ່ງ",
  }),
  companyId: z.number({
    message: "ກະລຸນາເລືອກຫົວໜ່ວຍທຸລະກິດ",
  }).optional(),
  villageId: z.number({
    message: "ກະລຸນາເລືອກບ້ານ",
  }).optional(),
  type: z.string().min(1, {
    message: "ກະລຸນາເລືອກປະເພດ",
  }),
  dependBy: z.string().min(1, {
    message: "ກະລຸນາເລືອກຂື້ນກັບ",
  }),
  expirationTerm: z.string(),
  issueDate: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ວັນທີອອກ",
    }),
  expirationDate: z
    .union([z.date(), z.string()])
    .refine((value) => value !== null && value !== "", {
      message: "ວັນໝົດອາຍຸ",
    }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
});

export const applicationDefaultValues = {
  profileId: 0,
  folderId: 0,
  positionId: 0,
  companyId: 0,
  type: "NEW",
  status: "DEFAULT",
  numberId: 0,
};
