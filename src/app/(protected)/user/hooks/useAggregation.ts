
import { apiClient } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
interface ApiResponseMeta {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number | null;
  totalCount: number | null;
}

interface AggregationUser {
  id: number;
  name: string;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  meta: ApiResponseMeta;
  result: T[];
}

interface UseAggregationUserProps {
  filterKey: string;
  filterValue: string;
}

export const useAggregationUser = ({ filterKey, filterValue }: UseAggregationUserProps) => {
  const [value, setValue] = useState<AggregationUser[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAggregationUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.get<ApiResponse<AggregationUser>>("/user-aggregation", {
        params: { [filterKey]: filterValue },
      });
      setValue(data.result);
    } catch {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [filterKey, filterValue]);
  useEffect(() => {
    fetchAggregationUser();
  }, [fetchAggregationUser]);

  return { value, loading, error };
};
