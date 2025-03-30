/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/axios";
import { useCallback, useEffect, useState } from "react";

const useApplicationFolder = ({ id }: { id: number }) => {
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchApplicationFolder = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { result } = await apiClient.get<{ result: any[] }>("/application", {
        params: { folderId: id },
      });
      setResult(result || null);
    } catch {
      setError("Failed to fetch applicationFolder");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchApplicationFolder();
  }, [fetchApplicationFolder]);
  return { result, loading, error };
};

export default useApplicationFolder;

