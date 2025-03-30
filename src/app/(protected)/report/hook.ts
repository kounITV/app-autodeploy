import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { INumberAggregation } from "./type";

interface INumberAggregationResponse {
  result: INumberAggregation;
  meta: MetaState;
}

const fetchGallery = async ({ officeId, createdAt, selectedOfficeId }: {
  officeId?: number;
  createdAt?: Date
  selectedOfficeId?: string
}): Promise<INumberAggregationResponse> => {
  const date = new Date();
  const params: Record<string, unknown> = { officeId, createdAt: date };
  if (createdAt) {
    params.createdAt = createdAt;
  }
  if (selectedOfficeId) {
    params.officeIds = selectedOfficeId;
  }
  const response = await apiClient.get<INumberAggregationResponse>("/number-aggregation", {
    params,
  });
  return response;
};

const useNumberAggregation = () => {
  const [createdAt, setCreatedAtFilter] = useState<Date | undefined>(undefined)
  const [selectedOfficeId, setSelectedOfficeId] = useState<string[]| undefined>([]);
  const query = useQuery<INumberAggregationResponse, Error>({
    queryKey: ["number-aggregation", createdAt, selectedOfficeId],
    queryFn: async () => await fetchGallery({ createdAt, selectedOfficeId: selectedOfficeId?.join() }),
    placeholderData: (previousData) => previousData,
  });
  return {
    result: query.data?.result ?? {
      summary: {
        name: "",
        sum: [],
      },
      data: [],
    },
    filter: {
      createdAt,
      setCreatedAtFilter,
      selectedOfficeId,
      setSelectedOfficeId,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: query.refetch,
  };
};

export default useNumberAggregation;
