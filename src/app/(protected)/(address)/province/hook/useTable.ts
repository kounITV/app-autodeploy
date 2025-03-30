/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IProvince } from "../type";

interface IProvinceResponse {
  result: IProvince[];
  meta: MetaState;
}

const fetchProvince = async ({ page, limit, search, statusFilter }: {
  page: number;
  limit: number;
  search: string;
  statusFilter?: string;
}): Promise<IProvinceResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (statusFilter) {
    params.status = statusFilter;
  }
  const response = await apiClient.get<IProvinceResponse>("/province", {
    params,
  });
  return response;
};

const useProvinceTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IProvinceResponse, Error>({
    queryKey: ["province", page, limit, debouncedSearch, statusFilter],
    queryFn: async () => await fetchProvince({ page, limit, search: debouncedSearch, statusFilter }),
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

export default useProvinceTable;
