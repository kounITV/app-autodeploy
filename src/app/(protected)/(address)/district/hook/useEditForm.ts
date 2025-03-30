import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { defaultValues, districtFormSchema } from "../container/form/schema";
import { type IDistrict } from "../type";

export interface IDistrictData {
  status: string;
  result: IDistrict[];
}
export const useDistrictEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { district, loading } = useOneDistrict({ id });
  const form = useForm<z.infer<typeof districtFormSchema>>({
    resolver: zodResolver(districtFormSchema),
    defaultValues,
  });
  useFormReset({ district, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof districtFormSchema>) => {
    try {
      await apiClient.put<IDistrict>(`/district/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູເມືອງສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["districts"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູເມືອງໄດ້" });
    }
  };
  return { form, onSubmit };
};

const useOneDistrict = ({ id }: { id: number }) => {
  const [district, setDistrict] = useState<IDistrict | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchDistrict = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<IDistrictData>(`district/${id}`, { signal });
        setDistrict(response?.result?.[0] ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setDistrict(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDistrict();
    return () => {
      controller.abort();
    };
  }, [id]);
  return { district, loading };
};

const useFormReset = ({
  district,
  loading,
  formReset,
}: {
  district: IDistrict | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof districtFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = district && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof districtFormSchema>> = {
      districtEnglish: district.districtEnglish,
      districtLao: district.districtLao,
      status: district.status,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [district, loading, formReset]);
};
