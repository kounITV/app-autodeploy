import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { defaultValues, nationalityFormSchema } from "../container/form/schema";
import { type INationality } from "../type";

export interface InationalityData {
  status: string;
  result: INationality[];
}
export const usenationalityEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { nationality, loading } = useOnenationality({ id });
  const form = useForm<z.infer<typeof nationalityFormSchema>>({
    resolver: zodResolver(nationalityFormSchema),
    defaultValues,
  });
  useFormReset({ nationality, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof nationalityFormSchema>) => {
    try {
      await apiClient.put<INationality>(`/nationality/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນປະເທດສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["countries"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນປະເທດໄດ້" });
    }
  };
  return { form, onSubmit };
};

const useOnenationality = ({ id }: { id: number }) => {
  const [nationality, setnationality] = useState<INationality | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchnationality = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<InationalityData>(`nationality/${id}`, { signal });
        setnationality(response?.result?.[0] ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setnationality(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchnationality();
    return () => {
      controller.abort();
    };
  }, [id]);
  return { nationality, loading };
};

const useFormReset = ({
  nationality,
  loading,
  formReset,
}: {
  nationality: INationality | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof nationalityFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = nationality && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof nationalityFormSchema>> = {
      nationality: nationality.nationality,
      name: nationality.name,
      status: nationality.status,
      code: nationality.code,
      continent: nationality.continent,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [nationality, loading, formReset]);
};
