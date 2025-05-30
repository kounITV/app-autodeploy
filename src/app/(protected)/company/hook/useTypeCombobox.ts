import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { ICompany } from "../type";

interface IBussinessTypeResponse {
  result: ICompany[];
  meta: MetaState;
}

const fetchVillage = async ({ paginate, districtId }: {
  paginate: boolean;
  districtId?: number
}): Promise<IBussinessTypeResponse> => {
  const params: Record<string, unknown> = { paginate, districtId };
  const response = await apiClient.get<IBussinessTypeResponse>("/businesstype", {
    params,
  });
  return response;
};

const useBussinessTypeCombobox = () => {
  const paginate = false;
  const query = useQuery<IBussinessTypeResponse, Error>({
    queryKey: ["companies", paginate],
    queryFn: async () => await fetchVillage({ paginate }),
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

export default useBussinessTypeCombobox;

function useComboboxMapping(folderData: ICompany[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: `${item.businessType}`,
    value: item.businessType,
  }));
}
