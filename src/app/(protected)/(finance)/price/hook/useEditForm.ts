import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { defaultValues, priceFormSchema } from "../container/form/schema";
import { type IPrice } from "../type";

export interface IPriceData {
  status: string;
  result: IPrice[];
}
export const usePriceEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { price, loading } = useOnePrice({ id });
  const form = useForm<z.infer<typeof priceFormSchema>>({
    resolver: zodResolver(priceFormSchema),
    defaultValues,
  });
  useFormReset({ price, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof priceFormSchema>) => {
    try {
      await apiClient.put<IPrice>(`/price/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຕຳແໜ່ງສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["prices"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message;
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

const useOnePrice = ({ id }: { id: number }) => {
  const [price, setPrice] = useState<IPrice | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchPrice = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<IPriceData>(`price/${id}`, { signal });
        setPrice(response?.result?.[0] ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setPrice(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPrice();
    return () => {
      controller.abort();
    };
  }, [id]);
  return { price, loading };
};

const useFormReset = ({
  price,
  loading,
  formReset,
}: {
  price: IPrice | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof priceFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = price && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof priceFormSchema>> = {
      status: price.status,
      name: price.name,
      price: price.price,
      type: price.type,
      code: price.code,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [price, loading, formReset]);
};
