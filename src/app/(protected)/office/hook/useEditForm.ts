import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { defaultValues, officeFormSchema } from "../container/form/schema";
import { type IOffice } from "../type";

export interface IOfficeData {
  status: string;
  result: IOffice[];
}
export const useOfficeEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { office, loading } = useOneOffice({ id });
  const form = useForm<z.infer<typeof officeFormSchema>>({
    resolver: zodResolver(officeFormSchema),
    defaultValues,
  });
  useFormReset({ office, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof officeFormSchema>) => {
    try {
      await apiClient.put<IOffice>(`/office/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຫ້ອງການສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["offices"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນຫ້ອງການໄດ້" });
    }
  };
  return { form, onSubmit };
};

const useOneOffice = ({ id }: { id: number }) => {
  const [office, setOffice] = useState<IOffice | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchOffice = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<IOfficeData>(`office/${id}`, { signal });
        setOffice(response?.result?.[0] ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setOffice(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOffice();
    return () => {
      controller.abort();
    };
  }, [id]);
  return { office, loading };
};

const useFormReset = ({
  office,
  loading,
  formReset,
}: {
  office: IOffice | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof officeFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = office && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof officeFormSchema>> = {
      name: office.name,
      provinceId: office.provinceId,
      districtId: office.districtId,
      village: office.village,
      status: office.status,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [office, loading, formReset]);
};
