import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm, UseFormReset } from "react-hook-form";
import type * as z from "zod";

import { defaultValues, exchangeRateFormSchema } from "../container/form/schema";
import { type IExchangeRate } from "../type";
import { useOne } from "@/hooks/useOne";
import { useEffect } from "react";

export const useExchangeRateCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof exchangeRateFormSchema>>({
    defaultValues,
    resolver: zodResolver(exchangeRateFormSchema),
  });
  const onSubmit = async (data: z.infer<typeof exchangeRateFormSchema>) => {
    try {
      await apiClient.post<IExchangeRate>("/exchange_rate", { data });
      showToast({ type: "success", title: "ສ້າງອັດ​ຕາ​ແລກ​ປ່ຽນໃໝ່ສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["exchange_rate"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message || "ເກິດຂໍ້ຜິດພາດ";
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

export const useExchangeRateEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useOne<IExchangeRate>({ resource: "exchange_rate", id });
  const exchangeRate = data?.result ?? null;
  const form = useForm<z.infer<typeof exchangeRateFormSchema>>({
    resolver: zodResolver(exchangeRateFormSchema),
    defaultValues,
  });
  useFormReset({ exchangeRate, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof exchangeRateFormSchema>) => {
    try {
      await apiClient.put<IExchangeRate>(`/exchange_rate/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນອັດ​ຕາ​ແລກ​ປ່ຽນສໍາເລັດ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["exchange_rate"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message;
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

const useFormReset = ({
  exchangeRate,
  loading,
  formReset,
}: {
  exchangeRate: IExchangeRate | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof exchangeRateFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = exchangeRate && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof exchangeRateFormSchema>> = {
      baseCurrencyId: exchangeRate.baseCurrencyId,
      targetCurrencyId: exchangeRate.targetCurrencyId,
      rateBase: exchangeRate.rateBase as any,
      ratePolice: exchangeRate.ratePolice as any,
      startDate: exchangeRate.startDate,
      endDate: exchangeRate.endDate,
      status: exchangeRate.status,
      name: exchangeRate.name,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [exchangeRate, loading, formReset]);
};
