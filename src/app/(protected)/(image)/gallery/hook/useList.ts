import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { IGallery } from "../type";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";
import { useState } from "react";

interface IGalleryResponse {
  result: IGallery[];
  meta: MetaState;
}

const fetchGallery = async ({ page, limit, search,  officeId, officeIds, dateFilter }: {
  page: number;
  limit: number;
  officeId?: number;
  search: string;
  officeIds?: string;
  dateFilter?: Date
}): Promise<IGalleryResponse> => {
  const params: Record<string, unknown> = { page, limit, search, officeId };
  if (dateFilter) {
    params.createdAt = dateFilter;
  }
  if (officeIds) {
    params.officeIds = officeIds;
  }
  const response = await apiClient.get<IGalleryResponse>("/gallery", {
    params,
  });
  return response;
};
const DEBOUNCE_DELAY = 500;

const useGalleryList = ({ officeIds }: { officeIds?: string }) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
  const [debouncedSearch] = useDebounce(search, DEBOUNCE_DELAY);
  const query = useQuery<IGalleryResponse, Error>({
    queryKey: ["gallery", page, limit, debouncedSearch,  officeIds, dateFilter],
    queryFn: async () => await fetchGallery({ page, limit, search: debouncedSearch,  officeIds, dateFilter }),
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

export default useGalleryList;
