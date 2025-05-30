/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { IProfile } from "../../profile/type";

interface IProfileResponse {
  result: IProfile[];
  meta: MetaState;
}

const fetchProfile = async ({ page, limit, search, barcode }: {
  page: number;
  limit: number;
  search: string;
  barcode?: string;
}): Promise<IProfileResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (barcode) {
    params.barcode = barcode;
  }
  const response = await apiClient.get<IProfileResponse>("/profile-barcode", {
    params,
  });
  return response;
};

const useProfileBarcode = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [barcode, setBarcodeFilter] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);
  const query = useQuery<IProfileResponse, Error>({
    queryKey: ["applications", page, limit, debouncedSearch, barcode],
    queryFn: async () => {
      setIsLoading(true);
      try {
        const response = await fetchProfile({
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

export default useProfileBarcode;