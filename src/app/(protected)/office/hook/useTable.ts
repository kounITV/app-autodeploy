import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IOffice } from "../type";

interface IOfficeResponse {
  result: IOffice[];
  meta: MetaState;
}

const fetchOffice = async ({ page, limit, search, statusFilter, provinceId }: {
  page: number;
  limit: number;
  search: string;
  provinceId: number
  statusFilter?: string;
}): Promise<IOfficeResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (statusFilter) {
    params.status = statusFilter;
  }
  if (provinceId > 0) {
    params.provinceId = provinceId;
  }
  const response = await apiClient.get<IOfficeResponse>("/office", {
    params,
  });
  return response;
};

const useOfficeTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [provinceId, setProvinceId] = useState<number>(0);
  // eslint-disable-next-line no-magic-numbers
  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IOfficeResponse, Error>({
    queryKey: ["offices", page, limit, debouncedSearch, statusFilter, provinceId],
    queryFn: async () => await fetchOffice({ page, limit, search: debouncedSearch, statusFilter, provinceId }),
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
      provinceId,
      setProvinceId,
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

export default useOfficeTable;
