/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IPosition } from "../type";

interface IPositionResponse {
  result: IPosition[];
  meta: MetaState;
}

const fetchPosition = async ({ page, limit, search, deletedAt, statusFilter }: {
  page: number;
  limit: number;
  search: string;
  deletedAt: boolean;
  statusFilter?: string;
}): Promise<IPositionResponse> => {
  const params: Record<string, unknown> = { page, limit, search, deletedAt };
  if (statusFilter) {
    params.status = statusFilter;
  }
  const response = await apiClient.get<IPositionResponse>("/position", {
    params,
  });
  return response;
};

const usePositionTable = ({ deletedAt = false }: { deletedAt?: boolean }) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IPositionResponse, Error>({
    queryKey: ["positions", page, limit, debouncedSearch, deletedAt, statusFilter],
    queryFn: async () => await fetchPosition({ page, limit, search: debouncedSearch, deletedAt, statusFilter }),
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

export default usePositionTable;
