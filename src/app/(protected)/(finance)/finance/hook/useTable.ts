/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useDebounce } from "use-debounce";
import { type IFinance } from "../type";

interface IFinanceResponse {
  result: IFinance[];
  meta: MetaState;
}

const fetchFinance = async ({ page, limit, search, officeId }: {
  page: number;
  limit: number;
  search: string;
  officeId?: number;

}): Promise<IFinanceResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (officeId) {
    params.officeId = officeId;
  }
  const response = await apiClient.get<IFinanceResponse>("/finance", {
    params,
  });
  return response;
};

const useFinanceTable = () => {
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [debouncedSearch] = useDebounce(search, 500);
  const query = useQuery<IFinanceResponse, Error>({
    queryKey: ["finances", page, limit, debouncedSearch, officeId],
    queryFn: async () => await fetchFinance({ page, limit, search: debouncedSearch, officeId }),
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

export default useFinanceTable;
