import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { defaultValues, provinceFormSchema } from "../container/form/schema";
import { type IProvince } from "../type";

export interface IProvinceData {
  status: string;
  result: IProvince[];
}
export const useProvinceEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { province, loading } = useOneProvince({ id });
  const form = useForm<z.infer<typeof provinceFormSchema>>({
    resolver: zodResolver(provinceFormSchema),
    defaultValues,
  });
  useFormReset({ province, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof provinceFormSchema>) => {
    try {
      await apiClient.put<IProvince>(`/province/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນເມືອງສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["provinces"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນເມືອງໄດ້" });
    }
  };
  return { form, onSubmit };
};

const useOneProvince = ({ id }: { id: number }) => {
  const [province, setProvince] = useState<IProvince | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchProvince = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<IProvinceData>(`province/${id}`, { signal });
        setProvince(response?.result?.[0] ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setProvince(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProvince();
    return () => {
      controller.abort();
    };
  }, [id]);
  return { province, loading };
};

const useFormReset = ({
  province,
  loading,
  formReset,
}: {
  province: IProvince | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof provinceFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = province && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof provinceFormSchema>> = {
      provinceEnglish: province.provinceEnglish,
      provinceLao: province.provinceLao,
      status: province.status,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [province, loading, formReset]);
};
