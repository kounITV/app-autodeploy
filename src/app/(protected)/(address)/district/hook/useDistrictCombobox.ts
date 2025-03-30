import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IDistrict } from "../type";

interface IDistrictResponse {
  result: IDistrict[];
  meta: MetaState;
}

const fetchDistrict = async ({ paginate, provinceId }: {
  paginate: boolean;
  provinceId?: number
}): Promise<IDistrictResponse> => {
  const params: Record<string, unknown> = { paginate, provinceId };
  const response = await apiClient.get<IDistrictResponse>("/district", {
    params,
  });
  return response;
};

const useeDistrictCombobox = ({ provinceId }: { provinceId?: number }) => {
  const paginate = false;
  const query = useQuery<IDistrictResponse, Error>({
    queryKey: ["districts", paginate, provinceId],
    queryFn: async () => await fetchDistrict({ paginate, provinceId }),
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

export default useeDistrictCombobox;

function useComboboxMapping(folderData: IDistrict[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: `${item.districtLao} (${item.districtEnglish})`,
    value: item.id,
  }));
}
