import { z } from "zod";

export const villageFormSchema = z.object({
  villageLao: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  villageEnglish: z.string().min(1, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  districtId: z.number().min(1, {
    message: "ກະລຸນາເລືອກເມືອງ",
  }),
  status: z.boolean(),
});

export const defaultValues = {
  villageLao: "",
  villageEnglish: "",
  status: true,
  districtId: 0,
};
