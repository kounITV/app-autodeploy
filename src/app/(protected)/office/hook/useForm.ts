import { useRouter } from "next/navigation";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, officeFormSchema } from "../container/form/schema";
import { type IOffice } from "../type";

export const useOfficeForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof officeFormSchema>>({
    defaultValues,
    resolver: zodResolver(officeFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof officeFormSchema>) => {
    try {
      await apiClient.post<IOffice>("/office", { data });
      showToast({ type: "success", title: "ສ້າງຫ້ອງການສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດສ້າງຫ້ອງການ" });
    }
  };
  return { form, onSubmit };
};
