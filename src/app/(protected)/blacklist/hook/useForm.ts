import showToast from "@/components/containers/show-toast";
import { apiClient, type ApiResponse } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { blacklistDefaultValues, blacklistFormCreateSchema, type BlacklistFormCreateType, checkBlacklistFormSchema, defaultValues } from "../container/form/schema";

export const useBlacklistProfileForm = ({ handleNext }: { handleNext: () => void }) => {
  const form = useForm<z.infer<typeof checkBlacklistFormSchema>>({
    defaultValues,
    resolver: zodResolver(checkBlacklistFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof checkBlacklistFormSchema>) => {
    try {
      const { identityNumber, identityType } = data;
      const response = await apiClient.get<ApiResponse<string>>("/backlist-check", { params: data });
      if (response.status === "exists" || response.status === "blacklisted") {
        form.setError("root", { type: "manual", message: response.message });
      }
      const checkResponse: any = await apiClient.post("/profile-check-existence", {
        data: { identityNumber, identityType },
      });
      if (checkResponse?.data?.identityExists) {
        return;
      }
      if (response.status === "ok") {
        handleNext();
      }
    } catch(error: any) {
      showToast({ type: "error", title: "ລະບົບຂັດຂ້ອງ" });
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
    }
  };
  return { form, onSubmit };
};

export const useBlacklistProfileCreateForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<BlacklistFormCreateType>({
    defaultValues: blacklistDefaultValues,
    resolver: zodResolver(blacklistFormCreateSchema),
  });
  const onSubmit = async (data: BlacklistFormCreateType) => {
    try {
      await apiClient.post("/backlist", { data });
      showToast({ type: "success", title: "ຂື້ນບັນຊີດໍາບຸກຄົນນິ້ສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message || "An unexpected error occurred.";
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};
