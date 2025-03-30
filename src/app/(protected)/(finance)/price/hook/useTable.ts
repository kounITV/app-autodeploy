/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IPrice } from "../type";

interface IPriceResponse {
  result: IPrice[];
  meta: MetaState;
}

const fetchPrice = async ({ page, limit, search, statusFilter }: {
  page: number;
  limit: number;
  search: string;
  statusFilter?: string;
}): Promise<IPriceResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (statusFilter) {
    params.status = statusFilter;
  }
  const response = await apiClient.get<IPriceResponse>("/price", {
    params,
  });
  return response;
};

const usePriceTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setGenderFilter] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IPriceResponse, Error>({
    queryKey: ["prices", page, limit, debouncedSearch, statusFilter],
    queryFn: async () => await fetchPrice({ page, limit, search: debouncedSearch, statusFilter }),
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
      setGenderFilter,
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

export default usePriceTable;
