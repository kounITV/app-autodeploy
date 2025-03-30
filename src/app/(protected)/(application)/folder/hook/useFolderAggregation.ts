import { apiClient } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { type ProcessStatus } from "../type";

interface IFolderResponse {
    result: {
        total: number
    }
    status: string;
    meta: string
}

const fetchFolder = async ({ status, officeId }: { status: ProcessStatus; officeId?: number }): Promise<IFolderResponse> => {
  const params: Record<string, unknown> = { status, officeId };
  const response = await apiClient.get<IFolderResponse>("/folder-aggregation", {
    params,
  });
  return response;
};

const useFolderAggregation = ({ status }: { status: ProcessStatus; }) => {
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const query = useQuery<IFolderResponse, Error>({
    queryKey: ["folder-aggregation", status, officeId],
    queryFn: async () => await fetchFolder({ status, officeId }),
    placeholderData: (previousData) => previousData,
  });
  const folderData = query.data?.result ?? { total: 0 };
  return {
    result: folderData,
  };
};

export default useFolderAggregation;

