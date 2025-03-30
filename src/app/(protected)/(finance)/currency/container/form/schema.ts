import { z } from "zod";

export const currencyFormSchema = z.object({
  name: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  code: z.string().min(1, {
    message: "ກະລຸນາໃສລະຫັດ",
  }),
  status: z.boolean(),
  symbol: z.string().min(1, {
    message: "ກະລຸນາເລືອກອາຍຸບັດ",
  }),

});

export const defaultValues = {
  name: "",
  currency: "",
  type: "",
  status: true,
  code: "",
  duration: "",
};
