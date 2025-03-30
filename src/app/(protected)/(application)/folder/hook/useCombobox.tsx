import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { type IFolder, type ProcessStatus } from "../type";

interface IFolderResponse {
    result: IFolder[];
    meta: MetaState;
}

const fetchFolder = async ({ paginate, status, officeId }: {
    paginate: boolean;
    status?: ProcessStatus;
    officeId?: number;
}): Promise<IFolderResponse> => {
  const params: Record<string, unknown> = { paginate, status };
  if (paginate) {
    params.paginate = paginate;
  }
  if (officeId) {
    params.officeId = officeId;
  }
  if (status) {
    params.status = status;
  }
  const response = await apiClient.get<IFolderResponse>("/folder", {
    params,
  });
  return response;
};

const useFolderCombobox = ({ status, officeId }: { status?: ProcessStatus, officeId?: number }) => {
  const paginate = false;
  const query = useQuery<IFolderResponse, Error>({
    queryKey: ["folders", paginate, status, officeId],
    queryFn: async () => await fetchFolder({ paginate, status, officeId }),
    placeholderData: (previousData) => previousData,
  });
  const folderData = query.data?.result || [];
  const result = useComboboxMapping<IFolder>(folderData);
  return {
    result,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
  };
};

export default useFolderCombobox;

function useComboboxMapping<T extends { id: string | number; name: string; no?: string, code: string }>(
  folderData: T[],
): Array<{ label: string; value: string | number; }> {
  return folderData.map((item, index: number) => ({
    label: `${index + 1}. ແຟ້ມ ${item.code} - ຊື້ແຟ້ມ ${item.name}`,
    value: item.id,
  }));
}
