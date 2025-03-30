import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IExchangeRate } from "../type";

interface IExchangeRateResponse {
  result: IExchangeRate[];
  meta: MetaState;
}

const fetchExchangeRate = async ({ paginate, status }: {
  paginate: boolean;
  status: boolean
}): Promise<IExchangeRateResponse> => {
  const params: Record<string, unknown> = { paginate, status };
  const response = await apiClient.get<IExchangeRateResponse>("/exchange_rate", {
    params,
  });
  return response;
};

const useExchangeRateCombobox = ({ status }: { status: boolean }) => {
  const paginate = false;
  const query = useQuery<IExchangeRateResponse, Error>({
    queryKey: ["exchange_rate", status],
    queryFn: async () => await fetchExchangeRate({ paginate, status }),
    placeholderData: (previousData) => previousData,
  });
  const folderData = query.data?.result || [];
  const result = useComboboxMapping(folderData);
  return {
    result,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
};

export default useExchangeRateCombobox;
function useComboboxMapping(folderData: IExchangeRate[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => {
    const { baseCurrency, targetCurrency, rate } = item;
    return {
      label: `${baseCurrency.name} (${baseCurrency.code}) → ${targetCurrency.name} (${targetCurrency.code}) @ ${rate}`,
      value: item.id,
    };
  });
}
