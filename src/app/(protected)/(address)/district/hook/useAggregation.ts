import { apiClient } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { type IDistrictAggregation } from "../type";

export const useDistrictAggregation = () => {
  const [value, setValue] = useState<IDistrictAggregation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchAggregation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<IDistrictAggregation>("district-aggregation");
      setValue(result);
    } catch {
      setError("Failed to fetch user aggregation data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAggregation();
  }, []);
  return { result: value?.result, loading, error };
};
