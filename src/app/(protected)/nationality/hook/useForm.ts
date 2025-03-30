import { useRouter } from "next/navigation";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, nationalityFormSchema } from "../container/form/schema";
import { type INationality } from "../type";

export const usenationalityForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof nationalityFormSchema>>({
    defaultValues,
    resolver: zodResolver(nationalityFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof nationalityFormSchema>) => {
    try {
      await apiClient.post<INationality>("/nationality", { data });
      showToast({ type: "success", title: "ລົງທະບຽນບຸກຄົນໃໝ່ສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["nationalitys"] });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດລົງທະບຽນບຸກຄົນໃໝ່ໄດ້" });
    }
  };
  return { form, onSubmit };
};
