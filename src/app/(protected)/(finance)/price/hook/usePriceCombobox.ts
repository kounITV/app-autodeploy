import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IPrice } from "../type";

interface IPriceResponse {
  result: IPrice[];
  meta: MetaState;
}

const fetchPrice = async ({ paginate, status }: {
  paginate: boolean;
  status: boolean
}): Promise<IPriceResponse> => {
  const params: Record<string, unknown> = { paginate, status };
  const response = await apiClient.get<IPriceResponse>("/price", {
    params,
  });
  return response;
};

const usePriceCombobox = ({ status }: { status: boolean }) => {
  const paginate = false;
  const query = useQuery<IPriceResponse, Error>({
    queryKey: ["prices", status],
    queryFn: async () => await fetchPrice({ paginate, status }),
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

export default usePriceCombobox;

function useComboboxMapping(folderData: IPrice[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: `${item.name}`,
    value: item.id,
  }));
}
