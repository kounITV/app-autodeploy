import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";

import { appendObjectFields } from "@/components/containers/form/buildForm";
import { useUpdateDefaultValues } from "@/lib/update-default-values";
import { financeSchema, formDefaultValues } from "../container/schema";
import { type IFinance } from "../type";

export const useFinanceForm = ({ folderId }: { folderId: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof financeSchema>>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(financeSchema),
  });
  const onSubmit = async (data: z.infer<typeof financeSchema>) => {
    try {
      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["receiptImage"] });
      if (data.receiptImage instanceof File) {
        formData.append("receiptImage", data.receiptImage);
      }
      await apiClient.post<IFinance>("/finance", { data: formData, config: { headers: { "Content-Type": "multipart/form-data" } } });
      showToast({ type: "success", title: "ຮັບເງິນສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["finances"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["folder-aggregation"] });
      await apiClient.patch(`/folder/${folderId}/progress`, { data: { status: "PENDING" } });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດຮັບເງິນໄດ້" });
    }
  };
  useUpdateDefaultValues({ form, fieldName: "folderId", value: folderId, shouldUpdate: true });
  return { form, onSubmit };
};

