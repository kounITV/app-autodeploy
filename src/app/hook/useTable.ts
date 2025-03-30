import { apiClient } from "@/lib/axios";
import { MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";

interface FetchDataParams {
    page: number;
    limit: number;
    search: string;
    deletedAt: boolean;
    statusFilter?: string;
    additionalFilters?: Record<string, unknown>;
    resource: string;
}

interface Response<T> {
    result: T[];
    meta: MetaState;
}

const fetchData = async <T>({ resource, page, limit, search, deletedAt, statusFilter, additionalFilters }: FetchDataParams & { resource: string }): Promise<Response<T>> => {
  const params: Record<string, unknown> = { page, limit, search, deletedAt, ...additionalFilters };
  if (statusFilter) {
    params.status = statusFilter;
  }
  const response = await apiClient.get<Response<T>>(resource, { params });
  return response;
};
const DEBOUNCE_DELAY = 500;

const useTable = <T>({ resource, deletedAt = false, additionalFilters = {} }: { resource: string; deletedAt?: boolean; additionalFilters?: Record<string, unknown> }) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_DELAY);

  const query = useQuery<Response<T>, Error>({
    queryKey: [resource, page, limit, debouncedSearch, deletedAt, statusFilter, additionalFilters],
    queryFn: () => fetchData<T>({
      resource,
      page,
      limit,
      search: debouncedSearch,
      deletedAt,
      statusFilter,
      additionalFilters,
    }),
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
    filter: {
      statusFilter,
      setStatusFilter,
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

export default useTable;