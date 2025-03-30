export const buildFormData = ({ data, fieldName = "images" }: { data: Record<string, any>, fieldName?: string }) => {
  const formData = new FormData();
  if (Array.isArray(data[fieldName])) {
    data[fieldName].forEach((image: { file: File }) => {
      if (image.file) {
        formData.append(fieldName, image.file);
      }
    });
  }
  Object.entries(data).forEach(([key, value]) => {
    if (key !== fieldName) {
      if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    }
  });
  return formData;
};

export const appendArrayFiles = (
  formData: FormData,
  fieldName: string,
  files: Array<{ file: File }>
) => {
  files.forEach((item) => {
    if (item.file) {
      formData.append(fieldName, item.file);
    }
  });
};

export const appendObjectFields = ({
  formData,
  data,
  excludeKeys,
}: {
  formData: FormData;
  data: Record<string, any>;
  excludeKeys: string | string[];
}) => {
  const host = process.env.NEXT_PUBLIC_NEXTAUTH_URL || "";
  const exclusions = Array.isArray(excludeKeys) ? excludeKeys : [excludeKeys];

  Object.entries(data).forEach(([key, value]) => {
    if (exclusions.includes(key)) return;
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "string") {
      const result = value.replace(host, "");
      formData.append(key, result);
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });
};

// export const buildFormData = ({
//   data,
//   fieldName = "",
// }: {
//   data: Record<string, any>;
//   fieldName?: string;
// }) => {
//   const formData = new FormData();
//   if (Array.isArray(data[fieldName])) {
//     appendArrayFiles(formData, fieldName, data[fieldName]);
//   }
//   appendObjectFields({ formData, data, excludeKey: fieldName });
//   return formData;
// };