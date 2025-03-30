import { validateImageSchema } from "@/lib/validation";
import { z } from "zod";

export const financeSchema = z.object({
  folderId: z.number().min(1, {
    message: "ລະຫັດໂຟນເຕີຕ້ອງມີຄ່າຫລາຍກວ່າ 0.",
  }),
  amount: z.string().min(1, {
    message: "amount is required",
  }),
  exchangeRateId: z.number().optional(),
  receiptNumber: z.string().optional(),
  receiptImage: validateImageSchema({
    required: false,
    message: "ກະລຸນາເລືອກຮູບພາບທີ່ຖືກຕ້ອງ.",
  }).or(z.string().optional()),
  paymentMethod: z.enum(["CASH", "MONEY_TRANSFER"], {
    errorMap: () => ({ message: "ວິທີຈ່າຍເງິນທີ່ເລືອກບໍ່ຖືກຕ້ອງ." }),
  }),
  rateBase: z.string().optional(),
  ratePolice: z.string().optional(),
});
export const formDefaultValues: z.infer<typeof financeSchema> = {
  folderId: 0,
  amount: "",
  receiptImage: undefined,
  paymentMethod: "CASH",
  receiptNumber: "",
  exchangeRateId: undefined,
  rateBase: undefined,
  ratePolice: undefined,
};
