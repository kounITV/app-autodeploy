/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { type IExchangeRate } from "../type";

interface IExchangeRateResponse {
  result: IExchangeRate[];
  meta: MetaState;
}

const fetchExchangeRate = async ({ page, limit, search }: {
  page: number;
  limit: number;
  search: string;
}): Promise<IExchangeRateResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  const response = await apiClient.get<IExchangeRateResponse>("/exchange_rate", {
    params,
  });
  return response;
};

const useExchangeRateTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IExchangeRateResponse, Error>({
    queryKey: ["exchange_rate", page, limit, debouncedSearch],
    queryFn: async () => await fetchExchangeRate({ page, limit, search: debouncedSearch }),
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

export default useExchangeRateTable;
