/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { apiClient, ApiError } from "@/lib/axios";

interface MetaState {
  totalCount: number;
}

interface ListResponse<T> {
  result: T[];
  meta: MetaState;
}

interface UseListOptions<T> {
  resource: string;
  initialPage?: number;
  initialLimit?: number;
  initialSearch?: string;
  initialFilters?: Record<string, any>;
  config?: any;
  staleTime?: number;
  retry?: number;
  refetchInterval?: number;
  queryKey?: string;
  enabled?: boolean;
}

const DEBOUNCE_DELAY = 500;

export const useList = <T>({
  resource,
  initialPage = 1,
  initialLimit = 10,
  initialSearch = "",
  initialFilters = {},
  config = {},
  staleTime,
  retry = 0,
  refetchInterval,
  queryKey,
  enabled = true,
}: UseListOptions<T>) => {

  const [page, setPage] = useState(initialPage);
  const [enabledQuery, setEnabled] = useState(enabled);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_DELAY);
  useEffect(() => {
    setEnabled(enabled);
  }, [enabled]);
  const fetchData = async (): Promise<ListResponse<T>> => {
    const params = {
      page,
      limit,
      search: debouncedSearch,
      ...filters,
    };
    const response = await apiClient.get<ListResponse<T>>(resource, {
      ...config,
      params,
    });
    return response;
  };

  const queryKeyValue = [
    resource,
    page,
    limit,
    debouncedSearch,
    JSON.stringify(filters),
    queryKey,
  ].filter(Boolean);

  const query = useQuery<ListResponse<T>, ApiError>({
    queryKey: queryKeyValue,
    queryFn: fetchData,
    staleTime,
    retry,
    refetchInterval,
    placeholderData: (previousData) => previousData,
    enabled: enabledQuery,
  });

  const updatePagination = ({ page: newPage, limit: newLimit }: { page?: number; limit?: number }) => {
    if (newPage !== undefined) {
      setPage(newPage);
    }
    if (newLimit !== undefined) {
      setLimit(newLimit);
      setPage(1);
    }
  };

  const updateSearch = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  return {
    result: query.data?.result || [],
    meta: {
      ...query.data?.meta,
      currentPage: page,
      limit,
      totalCount: query.data?.meta?.totalCount || 0,
    },
    filter: {
      ...filters,
      setFilters,
    },
    setEnabled,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    updatePagination,
    updateSearch,
    refetch: query.refetch,
  };
};

