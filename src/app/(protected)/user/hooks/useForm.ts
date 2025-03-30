import { useRouter } from "next/navigation";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, userSchemaCreate } from "../container/form/schema";
import { type IUser } from "../type";

export const useUserForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchemaCreate>>({
    defaultValues,
    resolver: zodResolver(userSchemaCreate),
  });
  const onSubmit = async (data: z.infer<typeof userSchemaCreate>) => {
    try {
      await apiClient.post<IUser>("/user", { data });
      showToast({ type: "success", title: "ສ້າງຜູ້ໃຊ້ງານລະບົບສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch {
      form.setError("root", { type: "manual", message: "ບໍ່ຊື່ຜູ້ໃຊ້ງາແລ້ວ" });
      showToast({
        type: "error",
        title: "ຂໍອະໄພລະບົບຂັດຂ້ອງ  ຫຼື ບໍ່ເບີໂທມີແລ້ວ",
      });
    }
  };
  return { form, onSubmit };
};
