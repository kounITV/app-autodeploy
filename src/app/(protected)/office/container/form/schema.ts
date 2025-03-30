import { z } from "zod";

export const officeFormSchema = z.object({
  name: z.string().min(2, {
    message: "ຊື່ຫ້ອງການຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  village: z.string().min(2, {
    message: "ຊື່ບ້ານຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  provinceId: z.number().positive({
    message: "ກະລຸນາເລືອກແຂວງ.",
  }),
  districtId: z.number().positive({
    message: "ກະລຸນາເລືອກເມືອງ.",
  }),
  status: z.boolean(),
});

export const defaultValues = {
  name: "",
  village: "",
  provinceId: 0,
  districtId: 0,
  status: true,
};

