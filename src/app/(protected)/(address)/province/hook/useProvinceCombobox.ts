import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IProvince } from "../type";

interface IProvinceResponse {
  result: IProvince[];
  meta: MetaState;
}

const fetchProvince = async ({ paginate }: {
  paginate: boolean;
}): Promise<IProvinceResponse> => {
  const params: Record<string, unknown> = { paginate };
  const response = await apiClient.get<IProvinceResponse>("/province", {
    params,
  });
  return response;
};

const useeProvinceCombobox = () => {
  const paginate = false;
  const query = useQuery<IProvinceResponse, Error>({
    queryKey: ["provinces", paginate],
    queryFn: async () => await fetchProvince({ paginate }),
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

export default useeProvinceCombobox;

function useComboboxMapping(folderData: IProvince[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: `${item.provinceLao} (${item.provinceEnglish})`,
    value: item.id,
  }));
}
