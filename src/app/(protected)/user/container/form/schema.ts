import { z } from "zod";

export const userBaseSchema = z.object({
  username: z.string()
    .min(2, { message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ." }),
  firstName: z.string()
    .min(2, { message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ." }),
  email: z.string()
    .email({ message: "ອີເມລບໍ່ຖືກຕ້ອງ." })
    .optional(),
  phone: z.string()
    .length(8, { message: "ເບີໂທຕ້ອງມີ 8 ຕົວເລກ." }),
  lastName: z.string()
    .min(2, { message: "ນາມສະກຸນຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ." }),
  role: z.string()
    .nonempty({ message: "ບົດບາດຕ້ອງບໍ່ວ່າງ." }),
  officeId: z.number({ message: "Office ID ຕ້ອງເປັນຈຳນວນບວກ." })
    .optional(),
  isActive: z.boolean(),
  userOffice: z.array(
    z.number().optional(),
  ),
});

export const userSchemaEdit = userBaseSchema.extend({
  password: z.string().optional(),
}).transform((data) => {
  if (!data.password) {
    delete data.password;
  }
  return data;
});
export const userSchemaCreate = userBaseSchema.extend({
  password: z.string()
    .min(8, { message: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ." })
    .refine((value) => /[0-9]/.test(value), {
      message: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວເລກ.",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວອັກສອນຂຽນນ້ອຍ.",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 1 ຕົວອັກສອນຂຽນໃຫຍ່.",
    }),
});

export const defaultValues = {
  role: "",
  firstName: "",
  lastName: "",
  email: undefined,
  phone: "",
  password: "",
  officeId: undefined,
  isActive: true,
  username: "",
  userOffice: [],
};
