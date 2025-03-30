import { apiClient, ApiError } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface UseOneOptions {
  resource: string;
  config?: any;
  params?: Record<string, any>;
  queryKey?: string;
  id: number;
  staleTime?: number;
  retry?: number;
  refetchInterval?: number;
}

export interface ApiResponseSuccess<T> {
  status: "ok";
  message: "success";
  result: T;
}

export interface ApiResponseError {
  status: "error";
  message: string;
  result: null;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

export const useOne = <T>({ resource, id, config, params, queryKey, staleTime, retry, refetchInterval }: UseOneOptions) => {
  const resourceWithId = `${resource}/${id}`;
  const queryClient = useQueryClient();
  const [localData, setLocalData] = useState<ApiResponse<T> | null>(null);

  const fetchData = async (): Promise<ApiResponse<T>> => {
    const response = await apiClient.get<ApiResponse<T>>(resourceWithId, { ...config, params });
    return response;
  };
  const currentQueryKey = [resourceWithId, params, queryKey];
  const { data, isLoading, isError, error } = useQuery<ApiResponse<T>, ApiError>({
    queryKey: currentQueryKey,
    queryFn: fetchData,
    staleTime: staleTime,
    retry: retry,
    refetchInterval: refetchInterval,
    enabled: id != null && id !== 0,
  });
  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data, isError, error]);
  const invalidateQueries = (keys: string[]) => {
    queryClient.invalidateQueries({ queryKey: keys });
  };
  return {
    data: localData,
    isLoading,
    isError,
    error,
    invalidateQueries,
  };
};