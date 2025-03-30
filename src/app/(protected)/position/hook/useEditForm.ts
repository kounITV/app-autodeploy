import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { defaultValues, positionFormSchema } from "../container/form/schema";
import { type IPosition } from "../type";

export interface IPositionData {
  status: string;
  result: IPosition[];
}
export const usePositionEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { position, loading } = useOnePosition({ id });
  const form = useForm<z.infer<typeof positionFormSchema>>({
    resolver: zodResolver(positionFormSchema),
    defaultValues,
  });
  useFormReset({ position, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof positionFormSchema>) => {
    try {
      await apiClient.put<IPosition>(`/position/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຕຳແໜ່ງສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນຕຳແໜ່ງໄດ້" });
    }
  };
  return { form, onSubmit };
};

const useOnePosition = ({ id }: { id: number }) => {
  const [position, setPosition] = useState<IPosition | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchPosition = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<IPositionData>(`position/${id}`, { signal });
        setPosition(response?.result?.[0] ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setPosition(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosition();
    return () => {
      controller.abort();
    };
  }, [id]);
  return { position, loading };
};

const useFormReset = ({
  position,
  loading,
  formReset,
}: {
  position: IPosition | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof positionFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = position && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof positionFormSchema>> = {
      englishName: position.englishName,
      laoName: position.laoName,
      status: position.status,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [position, loading, formReset]);
};
