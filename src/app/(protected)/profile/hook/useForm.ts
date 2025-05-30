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
      const { identityNumber, identityType, applicationNumber } = data;
      const checkResponse: any = await apiClient.post("/profile-check-existence", {
        data: { identityNumber, identityType, applicationNumber },
      });
      if (checkResponse?.data?.identityExists) {
        return;
      }
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
      form.setValue("applicationNumber", data.applicationNumber);
      form.setValue("phoneNumber", data.phoneNumber);
      form.setValue("overseasProvince", data.overseasProvince);
      handleNext();
    } catch(error: any) {
      showToast({ type: "error", title: "ບໍ່ສາມາດລົງທະບຽນບຸກຄົນໃໝ່ໄດ້" });
      if (error.data.identityNumber || error.data.identityType ) {
        form.setError("identityNumber", {
          type: "manual",
          message: `${error.data.identityNumber}`,
        });
        form.setError("identityType", {
          type: "manual",
          message: `${error.data.identityType}`,
        });
      }
      if (error.data.applicationNumber) {
        form.setError("applicationNumber", {
          type: "manual",
          message: `${error.data.applicationNumber}`,
        });
      }
    }
  };
  return { form, onSubmit };
};

