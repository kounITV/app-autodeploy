import { useEffect } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { defaultValues, villageFormSchema } from "../container/form/schema";
import { type IVillage } from "../type";
import { useOne } from "@/hooks/useOne";

export interface IVillageData {
  status: string;
  result: IVillage[];
}
export const useVillageEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading: loading } = useOne<IVillage>({ resource: "village", id });
  const village = data?.result ?? null;
  const form = useForm<z.infer<typeof villageFormSchema>>({
    resolver: zodResolver(villageFormSchema),
    defaultValues,
  });
  useFormReset({ village, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof villageFormSchema>) => {
    try {
      await apiClient.put<IVillage>(`/village/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູບ້ານສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["villages"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນບ້ານໄດ້" });
    }
  };
  return { form, onSubmit };
};

const useFormReset = ({
  village,
  loading,
  formReset,
}: {
  village: IVillage | null;
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof villageFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = village && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof villageFormSchema>> = {
      villageEnglish: village.villageEnglish,
      villageLao: village.villageLao,
      status: village.status,
      districtId: village.districtId,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [village, loading, formReset]);
};

