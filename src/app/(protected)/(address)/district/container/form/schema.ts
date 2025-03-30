import { z } from "zod";

export const districtFormSchema = z.object({
  districtLao: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  districtEnglish: z.string().min(1, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  status: z.boolean(),
});

export const defaultValues = {
  districtLao: "",
  districtEnglish: "",
  code: "",
  status: true,
};
