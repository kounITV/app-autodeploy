import { useRouter } from "next/navigation";
import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, villageFormSchema } from "../container/form/schema";
import { type IVillage } from "../type";

export const useVillageForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof villageFormSchema>>({
    defaultValues,
    resolver: zodResolver(villageFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof villageFormSchema>) => {
    try {
      await apiClient.post<IVillage>("/village", { data });
      showToast({ type: "success", title: "ສ້າງບ້ານສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["villages"] });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດສ້າງບ້ານສໍາເລັດໄດ້" });
    }
  };
  return { form, onSubmit };
};
export const useVillageFormDialog = (onOpenChange: (open: boolean) => void) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof villageFormSchema>>({
    defaultValues,
    resolver: zodResolver(villageFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof villageFormSchema>) => {
    try {
      await apiClient.post<IVillage>("/village", { data });
      showToast({ type: "success", title: "ສ້າງບ້ານສໍາເລັດ" });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["villages"] });
      onOpenChange(false);
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດສ້າງບ້ານສໍາເລັດໄດ້" });
    }
  };
  return { form, onSubmit };
};
