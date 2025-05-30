import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { companyDefaultValues, companyFormSchema } from "../container/form/schema";
import { type ICompany } from "../type";
import { useOne } from "@/hooks/useOne";
import { buildFormData } from "@/components/containers/form/buildForm";

export interface ICompanyData {
  status: string;
  result: ICompany[];
}
export const useCompanyEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useOne<ICompany>({ resource: "company", id });
  const company = data?.result ?? null;
  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: companyDefaultValues,
  });
  const [removedFileIds, setRemovedFileIds] = useState<number[]>([]);
  useFormReset({ company, loading, formReset: form.reset, removedFileIds });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof companyFormSchema>) => {
    try {
      const FormData = buildFormData({ data, fieldName: "companyFile" });
      const resources = `/company/${id}`
      await apiClient.put<ICompany>(resources, {
        data: FormData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຫົວໜ່ວຍທຸລະກິດສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      queryClient.invalidateQueries({ queryKey: [resources] });
      form.reset();
      router.back();
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message;
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit, setRemovedFileIds };
};

const createFormValues = (
  company: ICompany,
  removedFileIds: number[] = [],
): Partial<z.infer<typeof companyFormSchema>> => {
  return {
    name: company.name,
    businessCode: company.businessCode,
    businessType: company.businessType,
    businessRegisterBy: company.businessRegisterBy,
    companyFile: Array.isArray(company.companyFile)
      ? company.companyFile
        .filter((file: any) => !removedFileIds.includes(file.id))
        .map((file: any) => {
          if (file.file && typeof file.file === "string") {
            return {
              ...file,
              file: "",
              preview: file.file,
              name: file.name ?? "",
            };
          }
          if (file.file instanceof Blob) {
            const newFile = new File([file.file], file.name || "document.pdf");
            return {
              ...file,
              file: newFile,
              preview: URL.createObjectURL(newFile),
              name: file.name ?? "",
            };
          }
          return {
            ...file,
            file: "",
            preview: "",
            name: file.name ?? "",
          };
        })
      : [],
  };
};

const useFormReset = ({
  company,
  loading,
  formReset,
  removedFileIds,
}: {
  company: ICompany | null;
  loading: boolean;
  formReset: UseFormReset<z.infer<typeof companyFormSchema>>;
  removedFileIds: number[];
}) => {
  useEffect(() => {
    const shouldResetForm = company && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues = createFormValues(company, removedFileIds);
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [company, loading, formReset, removedFileIds]);
};
