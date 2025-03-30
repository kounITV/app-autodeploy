import { appendObjectFields } from "@/components/containers/form/buildForm";
import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { defaultValues, profileFormSchema } from "../container/form/schema";
import { type IProfile } from "../type";

export const useProfileForm = ({ handleNext }: { handleNext: () => void }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof profileFormSchema>>({
    defaultValues,
    resolver: zodResolver(profileFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    try {
      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["image", "oldImage"] });
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      if (data.oldImage instanceof File) {
        formData.append("oldImage", data.oldImage);
      }
      await apiClient.post<IProfile>("/profile", {
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
      showToast({ type: "success", title: "ລົງທະບຽນບຸກຄົນໃໝ່ສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      form.reset();
      handleNext();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດລົງທະບຽນບຸກຄົນໃໝ່ໄດ້" });
    }
  };
  return { form, onSubmit };
};

