/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IApplication } from "../application/type";

interface IApplicationResponse {
  result: IApplication[];
  meta: MetaState;
}

const fetchApplication = async ({ page, limit, search, folderStatus, genderFilter, yearFilter, dateFilter, status, includeFinished, officeIds }: {
  page: number;
  limit: number;
  search: string;
  folderStatus: string;
  genderFilter?: string;
  yearFilter?: string;
  dateFilter?: Date;
  status?: string;
  includeFinished?: boolean;
  officeIds?: string
}): Promise<IApplicationResponse> => {
  const params: Record<string, unknown> = { page, limit, search, folderStatus, includeFinished };
  if (genderFilter) {
    params.gender = genderFilter;
  }
  if (officeIds && officeIds.length > 0) {
    params.officeIds = officeIds;
  }
  if (status) {
    params.status = status;
  }
  if (yearFilter) {
    params.year = yearFilter;
  }
  if (dateFilter) {
    params.date = dateFilter;
  }
  const response = await apiClient.get<IApplicationResponse>("/application", {
    params,
  });
  return response;
};

const useApplicationTable = ({ folderStatus = "", status = "APPROVED", includeFinished = false, officeIds }: { folderStatus?: string, status?: string, includeFinished?: boolean, officeIds?: string }) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [debouncedSearch] = useDebounce(search, 500);
  const query = useQuery<IApplicationResponse, Error>({
    queryKey: ["applications", page, limit, debouncedSearch, folderStatus, genderFilter, yearFilter, dateFilter, status, includeFinished, officeIds],
    queryFn: async () => await fetchApplication({ page, limit, search: debouncedSearch, folderStatus, genderFilter, yearFilter, dateFilter, status, includeFinished, officeIds }),
    placeholderData: (previousData) => previousData,
    retry: (failureCount, error) => {
      if (error instanceof Error && "message" in error) {
        return failureCount < 3 && error.message.includes("429");
      }
      return false;
    },
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

export default useApplicationTable;