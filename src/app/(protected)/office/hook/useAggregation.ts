import { apiClient } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";
import { type IOfficeAggregation } from "../type";

export const useOfficeAggregation = () => {
  const [value, setValue] = useState<IOfficeAggregation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchAggregation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<IOfficeAggregation>("office-aggregation");
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
