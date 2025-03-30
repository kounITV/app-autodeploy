import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { NumberDetail } from "../type";

interface INumberResponse {
  result: NumberDetail[];
  meta: MetaState;
}

const fetchNumber = async ({ folderId, paginate, isAvailable = true }: {
  folderId?: number;
  paginate: boolean;
  isAvailable?: boolean;
}): Promise<INumberResponse> => {
  const params: Record<string, unknown> = { folderId, paginate, isAvailable };
  const response = await apiClient.get<INumberResponse>("/number", {
    params,
  });
  return response;
};

const useeNumberCombobox = ({ folderId, isAvailable = true }: { folderId?: number, isAvailable?: boolean }) => {
  const paginate = false;
  const query = useQuery<INumberResponse, Error>({
    queryKey: ["numbers", folderId, isAvailable],
    queryFn: async () => await fetchNumber({ folderId, paginate, isAvailable }),
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

export default useeNumberCombobox;

function useComboboxMapping(folderData: NumberDetail[]): Array<{ label: string; value: string | number, duration: string }> {
  return folderData.map((item) => ({
    label: item.number,
    value: item.id,
    duration: item.duration,
  }));
}
