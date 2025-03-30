import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IPosition } from "../type";

interface IPositionResponse {
  result: IPosition[];
  meta: MetaState;
}

const fetchPosition = async ({ paginate }: {
  paginate: boolean;
}): Promise<IPositionResponse> => {
  const params: Record<string, unknown> = { paginate };
  const response = await apiClient.get<IPositionResponse>("/position", {
    params,
  });
  return response;
};

const usePositionCombobox = () => {
  const paginate = false;
  const query = useQuery<IPositionResponse, Error>({
    queryKey: ["positions"],
    queryFn: async () => await fetchPosition({ paginate }),
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

export default usePositionCombobox;

function useComboboxMapping(folderData: IPosition[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item, index: number) => ({
    label: `${index + 1}. ຊື່ ${item.laoName}/${item.englishName}`,
    value: item.id,
  }));
}
