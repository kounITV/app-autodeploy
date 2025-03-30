import { apiClient } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { type IAggregationChartProfile } from "../type";

interface IAggregation {
  result: {
    total: number;
    male: number;
    female: number;
    newProfilesCount: number;
  };
}
const getOneWeekDateRange = (): { start: string; end: string } => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - dayOfWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  return {
    start: formatDate(startDate),
    end: formatDate(endDate),
  };
};

export const useAggregationUser = () => {
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const [value, setValue] = useState<IAggregation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" });
  useEffect(() => {
    const { start, end } = getOneWeekDateRange();
    setDateRange({ start, end });
  }, []);
  const fetchAggregationUser = useCallback(async () => {
    if (!dateRange.start || !dateRange.end) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<IAggregation>("/profile-aggregation", {
        params: { start: dateRange.start, end: dateRange.end, officeId },
      });
      setValue(result);
    } catch {
      setError("Failed to fetch user aggregation data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [dateRange]);
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      fetchAggregationUser();
    }
  }, [dateRange, fetchAggregationUser]);
  return { ...value?.result, loading, error };
};

export const useAggregationChartProfile = () => {
  const { data: session } = useSession();
  const officeId = session?.user?.officeId;
  const [value, setValue] = useState<IAggregationChartProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchAggregationChartProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<IAggregationChartProfile>("/profile-chart?officeId=" + officeId);
      setValue(result);
    } catch {
      setError("Failed to fetch user aggregation data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAggregationChartProfile();
  }, []);
  return { result: value?.result, loading, error };
};
