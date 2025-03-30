import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type ICurrency } from "../type";

interface ICurrencyResponse {
  result: ICurrency[];
  meta: MetaState;
}

const fetchCurrency = async ({ paginate, status }: {
  paginate: boolean;
  status: boolean
}): Promise<ICurrencyResponse> => {
  const params: Record<string, unknown> = { paginate, status };
  const response = await apiClient.get<ICurrencyResponse>("/currency", {
    params,
  });
  return response;
};

const useCurrencyCombobox = ({ status = true }: { status: boolean }) => {
  const paginate = false;
  const query = useQuery<ICurrencyResponse, Error>({
    queryKey: ["currency", status],
    queryFn: async () => await fetchCurrency({ paginate, status }),
    placeholderData: (previousData) => previousData,
  });
  const currencyData = query.data?.result || [];
  const result = useComboboxMapping(currencyData);
  return {
    result,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
};

function useComboboxMapping(currencyData: ICurrency[]): Array<{ label: string; value: string | number; }> {
  return currencyData.map((item) => ({
    label: [item.name, item.code, item.symbol ? `(${item.symbol})` : ""].filter(Boolean).join(" "),
    value: item.id,
  }));
}

export default useCurrencyCombobox;

