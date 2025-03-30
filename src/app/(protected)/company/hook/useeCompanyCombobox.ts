import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type ICompany } from "../type";

interface ICompanyResponse {
  result: ICompany[];
  meta: MetaState;
}

const fetchCompany = async ({ paginate }: {
  paginate: boolean;
}): Promise<ICompanyResponse> => {
  const params: Record<string, unknown> = { paginate };
  const response = await apiClient.get<ICompanyResponse>("/company", {
    params,
  });
  return response;
};

const useCompanyCombobox = () => {
  const paginate = false;
  const query = useQuery<ICompanyResponse, Error>({
    queryKey: ["companies"],
    queryFn: async () => await fetchCompany({ paginate }),
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

export default useCompanyCombobox;

function useComboboxMapping(folderData: ICompany[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item, index: number) => ({
    label: `${index + 1}. ຊື່ ${item.name}`,
    value: item.id,
  }));
}
