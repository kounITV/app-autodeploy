import * as z from "zod";

interface IValidateImageSchemaProps {
  required: boolean
  message?: string
}

interface IValidateDateRangeDateProps {
  required: boolean
  message?: string
}
const acceptedImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
];

const maxFileSize = 10000000;

const validateDateRangeDate = (dates: string[]): boolean => {
  return dates.length === 2 && dates.every((date) => date.trim() !== "");
};

const validateFile = (file: File | null | undefined): boolean => {
  if (!file) {
    return true;
  }
  return file.size <= maxFileSize && acceptedImageTypes.includes(file.type);
};

export const validateImageSchema = ({ required = true, message = "Image is required." }: IValidateImageSchemaProps) => {
  const schema = (z.any() as z.ZodType<File>)
    .refine((file) => validateFile(file), {
      message: "ຂະໜາດຮູບບໍ່ເກີນ 10MB ແລະ ປະເພດຮູບບໍ່ເກີດ .jpg, .jpeg, .png",
    });
  if (required) {
    return schema.refine((file) => file != null, {
      message,
    });
  }
  return schema.optional().nullable();
};

export const validateDateRangeDateSchema = ({
  required = true,
  message = "Please select a valid date range",
}: IValidateDateRangeDateProps) => {
  const schema = z.array(z.string()).refine(validateDateRangeDate, {
    message,
  });
  if (required) {
    return schema.refine((dates) => dates != null && dates.length > 0, {
      message,
    });
  }

  return schema.optional().nullable();
};
