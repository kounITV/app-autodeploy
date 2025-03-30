import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(1, "ກະລຸນາປ້ອນຊື່"),
    folderPrice: z
      .array(
        z.object({
          amount: z
            .union([z.string(), z.number()])
            .transform((val) => (typeof val === "string" ? val.trim() : val.toString()))
            .refine((val) => !/^0[0-9]+$/.test(val), { message: "ຕົວເລກບໍ່ສາມາດຂຶ້ນຕົ້ນດ້ວຍ 0." })
            .transform((val) => parseFloat(val))
            .refine((val) => val > 0, { message: "ຈໍານວນຟອມຕ້ອງມີຢ່າງໜ້ອຍ 1 ຟອມ." })
            .refine((val) => val.toString().length <= 5, { message: "ຄວາມຍາວບໍ່ເກີດ 5 ຫຼັກ" }),
          priceId: z.number().min(1, "ກະລຸນາເລືອກປະເພດ"),
        }),
      )
      .min(1, "ຕ້ອງມີຢ່າງໜ້ອຍໜຶ່ງແຖວ")
      .refine(
        (folderPrice) => {
          const priceIds = [];
          for (const row of folderPrice) {
            priceIds.push(row.priceId);
          }
          return new Set(priceIds).size === priceIds.length;
        },
        { message: "ປະເພດປະເພດບັດຕ້ອງບໍ່ຊໍ້າກັນ" },
      ),
  });

export const rejectFormSchema = z
  .object({
    comment: z.string().min(1, "ກະລຸນາປ້ອນຊື່"),
    folderId: z.number().min(1, "ກະລຸນາເລືອກປະເພດ"),
    status: z.string().min(1, "ກະລຸນາເລືອກປະເພດ"),
  });

export const formDefaultValues = {
  name: "",
  folderPrice: [{ amount: 1, priceId: 0 }],
};

export const  rejectFormDefaultValues = {
  comment: "",
  folderId: 0,
  status: "REJECTED",
};

export type RejectFormSchemaType = z.infer<typeof rejectFormSchema>;