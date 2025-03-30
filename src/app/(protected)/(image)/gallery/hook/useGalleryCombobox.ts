import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { IGallery } from "../type";

interface IGalleryRateResponse {
  result: IGallery[];
  meta: MetaState;
}

const fetchExchangeRate = async ({ paginate, status }: {
  paginate: boolean;
  status: boolean
}): Promise<IGalleryRateResponse> => {
  const params: Record<string, unknown> = { paginate, status };
  const response = await apiClient.get<IGalleryRateResponse>("/gallery", {
    params,
  });
  return response;
};

const useGalleryCombobox = ({ status }: { status: boolean }) => {
  const paginate = false;
  const query = useQuery<IGalleryRateResponse, Error>({
    queryKey: ["gallery", status],
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

export default useGalleryCombobox;

function useComboboxMapping(folderData: IGallery[]): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });
}
