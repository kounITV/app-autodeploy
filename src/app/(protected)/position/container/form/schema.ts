import { z } from "zod";

export const positionFormSchema = z.object({
  englishName: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  laoName: z.string().min(1, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  status: z.boolean(),
});

export const defaultValues = {
  englishName: "",
  laoName: "",
  status: true,
};
