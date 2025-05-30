/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { usePaginationStore, useSearchStore } from "../profile/hook/pagination-search";
import { type IBlacklist } from "./type";

interface IBlacklistResponse {
  result: IBlacklist[];
  meta: MetaState;
}

const fetchBlacklist = async ({ page, limit, search, deletedAt, genderFilter }: {
  page: number;
  limit: number;
  search: string;
  deletedAt: boolean;
  genderFilter?: string;
}): Promise<IBlacklistResponse> => {
  const params: Record<string, unknown> = { page, limit, search, deletedAt };
  if (genderFilter) {
    params.gender = genderFilter;
  }
  const response = await apiClient.get<IBlacklistResponse>("/backlist", {
    params,
  });
  return response;
};

const useBlacklistTable = ({ deletedAt = false }: { deletedAt?: boolean }) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [debouncedSearch] = useDebounce(search, 500);

  const query = useQuery<IBlacklistResponse, Error>({
    queryKey: ["backlist", page, limit, debouncedSearch, deletedAt, genderFilter],
    queryFn: async () => await fetchBlacklist({ page, limit, search: debouncedSearch, deletedAt, genderFilter }),
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
      genderFilter,
      setGenderFilter,
      yearFilter,
      setYearFilter,
      dateFilter,
      setDateFilter,
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

export default useBlacklistTable;
