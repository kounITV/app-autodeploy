import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { defaultValues, priceFormSchema } from "../container/form/schema";
import { type IPrice } from "../type";

export const usePriceForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof priceFormSchema>>({
    defaultValues,
    resolver: zodResolver(priceFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof priceFormSchema>) => {
    try {
      await apiClient.post<IPrice>("/price", { data });
      showToast({ type: "success", title: "ລົງທະບຽນບຸກຄົນໃໝ່ສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message || "An unexpected error occurred.";
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};
