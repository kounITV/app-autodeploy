import { z } from "zod";

const ONE_KB = 1024;
const MAX_FILE_SIZE = 10 * ONE_KB * ONE_KB;
const ACCEPTED_PDF_TYPES = ["application/pdf"];

const extractCompanyFileIds = (companyFile: Array<{ id?: number }>) => {
  const companyFileIds: number[] = [];
  for (const file of companyFile) {
    if (file?.id !== undefined) {
      companyFileIds.push(file.id);
    }
  }
  return companyFileIds;
};

export const companyFormSchema = z.object({
  name: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ.",
  }),
  businessRegisterBy: z.string().min(2, {
    message: "ອອດໂດຍ",
  }),
  businessCode: z.string().regex(/^[A-Z0-9]*$/, {
    message: "ເລກທະບຽນ",
  }).optional(),
  companyFile: z.array(
    z.object({
      file: z
        .union([
          z.instanceof(File).refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `Max file size is 10MB.`,
          ).refine(
            (file) => ACCEPTED_PDF_TYPES.includes(file.type),
            "Only .pdf formats are supported.",
          ),
          z.literal(""),
        ])
        .optional(),
      id: z.number().optional(),
      name: z.string().optional(),
    }),
  ).optional(),
}).transform((data) => {
  if (data.companyFile) {
    const companyFileIds = extractCompanyFileIds(data.companyFile)
    const newData = {
      ...data,
      companyFileIds,
    }
    return newData
  }
  return data;
});

export const companyDefaultValues = {
  name: "",
  businessRegisterBy: "ministry",
  businessCode: "",
  companyFile: [],
};
