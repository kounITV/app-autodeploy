import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IVillage } from "../type";

interface IVillageResponse {
  result: IVillage[];
  meta: MetaState;
}

const fetchVillage = async ({ paginate, districtId }: {
  paginate: boolean;
  districtId?: number
}): Promise<IVillageResponse> => {
  const params: Record<string, unknown> = { paginate, districtId };
  const response = await apiClient.get<IVillageResponse>("/village", {
    params,
  });
  return response;
};

const useVillageCombobox = ({ districtId }: { districtId?: number }) => {
  const paginate = false;
  const query = useQuery<IVillageResponse, Error>({
    queryKey: ["villages", paginate, districtId],
    queryFn: async () => await fetchVillage({ paginate, districtId }),
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

export default useVillageCombobox;

function useComboboxMapping(folderData: IVillage[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: `${item.villageLao} (${item.villageEnglish})`,
    value: item.id,
  }));
}
