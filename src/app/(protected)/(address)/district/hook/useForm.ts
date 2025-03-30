import { useRouter } from "next/navigation";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, districtFormSchema } from "../container/form/schema";
import { type IDistrict } from "../type";

export const useDistrictForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof districtFormSchema>>({
    defaultValues,
    resolver: zodResolver(districtFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof districtFormSchema>) => {
    try {
      await apiClient.post<IDistrict>("/district", { data });
      showToast({ type: "success", title: "ລົງທະບຽນບຸກຄົນໃໝ່ສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["districts"] });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດລົງທະບຽນບຸກຄົນໃໝ່ໄດ້" });
    }
  };
  return { form, onSubmit };
};
