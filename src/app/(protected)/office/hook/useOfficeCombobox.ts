import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IOffice } from "../type";

interface IOfficeResponse {
  result: IOffice[];
  meta: MetaState;
}

const fetchOffice = async ({ paginate }: {
  paginate: boolean;
}): Promise<IOfficeResponse> => {
  const params: Record<string, unknown> = { paginate };
  const response = await apiClient.get<IOfficeResponse>("/office", {
    params,
  });
  return response;
};

const useOfficeCombobox = () => {
  const paginate = false;
  const query = useQuery<IOfficeResponse, Error>({
    queryKey: ["offices", paginate],
    queryFn: async () => await fetchOffice({ paginate }),
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

export default useOfficeCombobox;

function useComboboxMapping(folderData: IOffice[]): Array<{ label: string; value: number; }> {
  return folderData.map((item) => ({
    label: "label" in item ? item.label as string : `${item.name} (${item.district.districtLao})`,
    value: "value" in item ? item.value as number : item.id,
  }));
}
