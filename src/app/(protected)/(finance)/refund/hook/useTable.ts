import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";

const DEBOUNCE_DELAY = 300;
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useDebounce } from "use-debounce";
import { IRefund } from "../type";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

interface IRefundResponse {
  result: IRefund[];
  meta: MetaState;
}

const fetchProfile = async ({ page, limit, search,  officeId }: {
  page: number;
  limit: number;
  officeId?: number;
  search: string;
}): Promise<IRefundResponse> => {
  const params: Record<string, unknown> = { page, limit, search,  officeId };
  const response = await apiClient.get<IRefundResponse>("/number-folder-aggregation", {
    params,
  });
  return response;
};

const useRefundTable = () => {
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_DELAY);
  const query = useQuery<IRefundResponse, Error>({
    queryKey: ["number-folder-aggregation", page, limit, debouncedSearch,  officeId],
    queryFn: async () => await fetchProfile({ page, limit, search: debouncedSearch,  officeId }),
    placeholderData: (previousData) => previousData,
  });
  return {
    result: query.data?.result || [],
    meta: {
      ...query.data?.meta,
      currentPage: page,
      limit,
      totalCount: query.data?.meta?.totalCount || 0,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    updatePagination,
    updateSearch: (newSearch: string) => {
      updateSearch(newSearch);
      resetPage();
    },
    refetch: query.refetch,
  };
};

export default useRefundTable;
