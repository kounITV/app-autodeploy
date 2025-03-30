import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IUser } from "../type";

interface IUserResponse {
  result: IUser[];
  meta: MetaState;
}
const DEBOUNCE_DELAY = 500;

const fetchUser = async ({ page, limit, search, excludeDelete, genderFilter }: {
  page: number;
  limit: number;
  search: string;
  excludeDelete: boolean;
  genderFilter?: string;
}): Promise<IUserResponse> => {
  const params: Record<string, unknown> = { page, limit, search, delete: excludeDelete };
  if (genderFilter) {
    params.gender = genderFilter;
  }
  const response = await apiClient.get<IUserResponse>("/user", {
    params,
  });
  return response;
};

const useUserTable = () => {
  const excludeDelete = false;
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_DELAY);
  const query = useQuery<IUserResponse, Error>({
    queryKey: ["users", page, limit, debouncedSearch, excludeDelete, genderFilter],
    queryFn: async () => await fetchUser({ page, limit, search: debouncedSearch, excludeDelete, genderFilter }),
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

export default useUserTable;
