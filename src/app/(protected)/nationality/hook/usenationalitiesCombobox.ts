import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type INationality } from "../type";

interface InationalityResponse {
  result: INationality[];
  meta: MetaState;
}

const fetchnationality = async ({ paginate, nationalityId }: {
  paginate: boolean;
  nationalityId?: number;
}): Promise<InationalityResponse> => {
  const params: Record<string, unknown> = { paginate };
  if (nationalityId) {
    params.nationalityId = nationalityId;
  }
  const response = await apiClient.get<InationalityResponse>("/nationality", {
    params,
  });
  return response;
};

export const usenationalitiesCombobox = ({ nationalityId, isNationality }: { nationalityId?: number; isNationality?: boolean }) => {
  const paginate = false;
  const query = useQuery<InationalityResponse, Error>({
    queryKey: ["countries", paginate, nationalityId],
    queryFn: async () => await fetchnationality({ paginate, nationalityId }),
    placeholderData: (previousData) => previousData,
  });
  const folderData = query.data?.result || [];
  const result = useComboboxMapping(folderData, isNationality);
  return {
    result,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
};

function useComboboxMapping(folderData: INationality[], isNationality?: boolean): Array<{ label: string; value: string | number; }> {
  return folderData.map((item) => ({
    label: isNationality ? `${item.name} (${item.nationality}) - ${item.code}` : `${item.code}`,
    value: item.id,
  }));
}
