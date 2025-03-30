import { z } from "zod";

export const priceFormSchema = z.object({
  name: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  price: z.string().min(1, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  type: z.string().min(2, {
    message: "ເລືອກປະເພດ",
  }),
  code: z.string().min(1, {
    message: "ກະລຸນາໃສລະຫັດ",
  }),
  status: z.boolean(),
  duration: z.string().min(1, {
    message: "ກະລຸນາເລືອກອາຍຸບັດ",
  }),

});

export const defaultValues = {
  name: "",
  price: "",
  type: "",
  status: true,
  code: "",
  duration: "",
};
