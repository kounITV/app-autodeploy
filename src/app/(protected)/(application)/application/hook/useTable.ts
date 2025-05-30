import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { IApplication } from "../type";

interface IApplicationResponse {
  result: IApplication[];
  meta: MetaState;
}
const DEBOUNCE_DELAY = 500;

const fetchApplication = async ({ page, limit, search, folderId, printCountMin, officeId, officeIds, statusFilter, yearFilter, dateFilter }: {
  page: number;
  limit: number;
  search: string;
  folderId?: number;
  printCountMin?: number;
  officeId?: number;
  officeIds?: string;
  statusFilter: string;
  yearFilter?: string;
  dateFilter?: Date;
}): Promise<IApplicationResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (folderId) {
    params.folderId = folderId;
  }
  if (officeIds) {
    params.folderId = folderId;
  }
  if (printCountMin) {
    params.printCountMin = printCountMin;
  }
  if (officeId) {
    params.officeId = officeId;
  }
  if (yearFilter) {
    params.year = yearFilter;
  }
  if (dateFilter) {
    params.date = dateFilter;
  }
  params.status = statusFilter;
  const response = await apiClient.get<IApplicationResponse>("/application", {
    params,
  });
  return response;
};

const useApplicationList = ({ folderId, printCountMin, officeIds, officeId }: { folderId?: number, printCountMin?: number, officeIds?: string, officeId?: number }) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("FINISHED");
  const [yearFilter, setYearFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_DELAY);
  useEffect(() => {
    if (search !== "") {
      updateSearch("");
    }
  }, [page]);
  const query = useQuery<IApplicationResponse, Error>({
    queryKey: ["applications", "application-aggregation", "application", page, limit, debouncedSearch, folderId, printCountMin, officeId, officeIds, statusFilter, yearFilter, dateFilter],
    queryFn: async () => await fetchApplication({ page, limit, search: debouncedSearch, folderId, printCountMin, officeId, officeIds, statusFilter, yearFilter, dateFilter }),
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

export default useApplicationList;
