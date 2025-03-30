/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { IApplication } from "../application/type";

interface IApplicationResponse {
  result: IApplication[];
  meta: MetaState;
}

const fetchApplication = async ({ page, limit, search, barcode  }: {
  page: number;
  limit: number;
  search: string;
  barcode?: number;
}): Promise<IApplicationResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (barcode) {
    params.barcode = barcode;
  }
  const response = await apiClient.get<IApplicationResponse>("/application", {
    params,
  });
  return response;
};

const fetchApplicationProfile = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [barcode, setBarcodeFilter] = useState<number>();
  const isEnable = barcode !== undefined && String(barcode).length >= 6;
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);
  const query = useQuery<IApplicationResponse, Error>({
    queryKey: ["application", page, limit, debouncedSearch, barcode],
    enabled: isEnable,
    queryFn: async () => {
      setIsLoading(true);
      try {
        const response = await fetchApplication({
          page,
          limit,
          search: debouncedSearch,
          barcode,
        });
        return response;
      } finally {
        setIsLoading(false);
      }
    },
    placeholderData: (previousData) => previousData,
  });

  const customRefetch = async () => {
    setIsLoading(true);
    try {
      await query.refetch();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result: query.data?.result || [],
    meta: {
      ...query.data?.meta,
      currentPage: page,
      limit,
      totalCount: query.data?.meta?.totalCount || 0,
    },
    filter: {
      barcode,
      setBarcodeFilter,
    },
    loading: isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    updatePagination,
    updateSearch: (newSearch: string) => {
      updateSearch(newSearch);
      resetPage();
    },
    refetch: customRefetch,
  };
};

export default fetchApplicationProfile;
