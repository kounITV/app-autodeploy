import { useRouter } from "next/navigation";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, provinceFormSchema } from "../container/form/schema";
import { type IProvince } from "../type";

export const useProvinceForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof provinceFormSchema>>({
    defaultValues,
    resolver: zodResolver(provinceFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof provinceFormSchema>) => {
    try {
      await apiClient.post<IProvince>("/province", { data });
      showToast({ type: "success", title: "ລົງທະບຽນບຸກຄົນໃໝ່ສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["provinces"] });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດລົງທະບຽນບຸກຄົນໃໝ່ໄດ້" });
    }
  };
  return { form, onSubmit };
};
