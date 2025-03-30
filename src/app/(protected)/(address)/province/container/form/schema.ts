import { z } from "zod";

export const provinceFormSchema = z.object({
  provinceLao: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  provinceEnglish: z.string().min(1, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  status: z.boolean(),
});

export const defaultValues = {
  provinceLao: "",
  provinceEnglish: "",
  status: true,
};
