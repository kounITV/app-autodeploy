/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IProfile } from "../type";
import { usePaginationStore, useSearchStore } from "./pagination-search";

interface IProfileResponse {
  result: IProfile[];
  meta: MetaState;
}

const fetchProfile = async ({ page, limit, search, excludeApplications, genderFilter, officeId, officeIds }: {
  page: number;
  limit: number;
  officeId?: number;
  search: string;
  excludeApplications: boolean;
  genderFilter?: string;
  officeIds?: string;
}): Promise<IProfileResponse> => {
  const params: Record<string, unknown> = { page, limit, search, excludeApplications, officeId };
  if (genderFilter) {
    params.gender = genderFilter;
  }
  if (officeIds) {
    params.officeIds = officeIds;
  }
  const response = await apiClient.get<IProfileResponse>("/profile", {
    params,
  });
  return response;
};

const useProfileTable = ({ excludeApplications = false, officeIds }: { excludeApplications?: boolean, officeIds?: string }) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const query = useQuery<IProfileResponse, Error>({
    queryKey: ["profiles", page, limit, debouncedSearch, excludeApplications, genderFilter, officeIds],
    queryFn: async () => await fetchProfile({ page, limit, search: debouncedSearch, excludeApplications, genderFilter, officeIds }),
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

export default useProfileTable;
