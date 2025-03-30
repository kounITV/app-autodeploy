/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type INationality } from "../type";

interface InationalityResponse {
  result: INationality[];
  meta: MetaState;
}

const fetchnationality = async ({ page, limit, search, continent, statusFilter }: {
  page: number;
  limit: number;
  search: string;
  continent: string;
  statusFilter?: string;
}): Promise<InationalityResponse> => {
  const params: Record<string, unknown> = { page, limit, search, continent };
  if (statusFilter) {
    params.status = statusFilter;
  }
  const response = await apiClient.get<InationalityResponse>("/nationality", {
    params,
  });
  return response;
};

const usenationalityTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [continent, setContinent] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const query = useQuery<InationalityResponse, Error>({
    queryKey: ["countries", page, limit, debouncedSearch, continent, statusFilter],
    queryFn: async () => await fetchnationality({ page, limit, search: debouncedSearch, continent, statusFilter }),
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
      continent,
      setContinent,
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

export default usenationalityTable;
