/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { companyDefaultValues, companyFormSchema } from "../container/form/schema";
import { type ICompany } from "../type";
import { buildFormData } from "@/components/containers/form/buildForm";

export const useCompanyForm = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const form = useForm<z.infer<typeof companyFormSchema>>({
    defaultValues: companyDefaultValues,
    resolver: zodResolver(companyFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof companyFormSchema>) => {
    try {
      const FormData = buildFormData({ data, fieldName: "companyFile" });
      await apiClient.post<ICompany>("/company", {
        data: FormData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      showToast({ type: "success", title: "ສ້າງຫົວໜ່ວຍທຸລະກິດສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["companies"] });

      form.reset();
      router.back();
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message || "An unexpected error occurred.";
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};
