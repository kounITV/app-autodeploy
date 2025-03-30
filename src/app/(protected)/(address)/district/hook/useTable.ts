/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IDistrict } from "../type";

interface IDistrictResponse {
  result: IDistrict[];
  meta: MetaState;
}

const fetchDistrict = async ({ page, limit, search, statusFilter, provinceId }: {
  page: number;
  limit: number;
  search: string;
  provinceId: number
  statusFilter?: string;
}): Promise<IDistrictResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (provinceId > 0) {
    params.provinceId = provinceId;
  }
  if (statusFilter) {
    params.status = statusFilter;
  }
  const response = await apiClient.get<IDistrictResponse>("/district", {
    params,
  });
  return response;
};

const useDistrictTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [provinceId, setProvinceId] = useState<number>(0);

  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IDistrictResponse, Error>({
    queryKey: ["districts", page, limit, debouncedSearch, statusFilter, provinceId],
    queryFn: async () => await fetchDistrict({ page, limit, search: debouncedSearch, statusFilter, provinceId }),
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

export default useDistrictTable;
