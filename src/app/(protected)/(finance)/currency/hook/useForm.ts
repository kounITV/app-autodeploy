import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReset } from "react-hook-form";
import type * as z from "zod";

import { defaultValues, currencyFormSchema } from "../container/form/schema";
import { type ICurrency } from "../type";
import { useOne } from "@/hooks/useOne";
import { useEffect } from "react";

export const useCurrencyCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof currencyFormSchema>>({
    defaultValues,
    resolver: zodResolver(currencyFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof currencyFormSchema>) => {
    try {
      await apiClient.post<ICurrency>("/currency", { data });
      showToast({ type: "success", title: "ສ້າງສະກຸນເງິນໃໝ່ສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["currency"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message || "ເກິດຂໍ້ຜິດພາດ";
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

export const useCurrencyEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useOne<ICurrency>({ resource: "currency", id });
  const currency = data?.result ?? null;
  const form = useForm<z.infer<typeof currencyFormSchema>>({
    resolver: zodResolver(currencyFormSchema),
    defaultValues,
  });
  useFormReset({ currency, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof currencyFormSchema>) => {
    try {
      await apiClient.put<ICurrency>(`/currency/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຕຳແໜ່ງສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["currency"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message;
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

const useFormReset = ({
  currency,
  loading,
  formReset,
}: {
  currency: ICurrency | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof currencyFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = currency && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof currencyFormSchema>> = {
      status: currency.status,
      name: currency.name,
      symbol: currency.symbol,
      code: currency.code,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [currency, loading, formReset]);
};
