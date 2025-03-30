import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { defaultValues, refundFormSchema } from "../container/form/schema";
import { type IRefund } from "../type";
import { buildFormData } from "@/components/containers/form/buildForm";

export const useRefundForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof refundFormSchema>>({
    defaultValues,
    resolver: zodResolver(refundFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof refundFormSchema>) => {
    try {
      const formData = buildFormData({ data, fieldName: "refundImage" });
      await apiClient.post<IRefund>("/refund", {
        data: formData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });

      showToast({ type: "success", title: "ສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["number-folder-aggregation"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message || "An unexpected error occurred.";
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};
