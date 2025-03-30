/* eslint-disable no-magic-numbers */
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

export const refundFormSchema = z.object({
  numberId: z.number().min(1, {
    message: "number id is required",
  }),
  priceAmount: z.number().min(1, {
    message: "number id is required",
  }),
  priceId: z.number().min(1, {
    message: "priceId id is required",
  }),
  profileId: z.number().min(1, {
    message: "ກະລຸນາເລືອກຂໍ້ມູນຜູ້ຂໍຄຶນເງິນ",
  }),
  comment: z.string().min(1, {
    message: "ກະລຸນາເລືອກຂໍ້ມູນຜູ້ຂໍຄຶນເງິນ",
  }),
  refundImage: z.array(z.object({
    file: z.instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Only .jpg, .jpeg, .png and .gif formats are supported."),
    preview: z.string(),
  })).min(1, "ຕ້ອງມີຮູບພາບຫນຶ່ງ").max(5, "Maximum 5 images allowed"),
});

export const defaultValues = {
  numberId: 0,
  priceAmount: 0,
  priceId: 0,
  profileId: 0,
  comment: "",
  refundImage: [],
};

