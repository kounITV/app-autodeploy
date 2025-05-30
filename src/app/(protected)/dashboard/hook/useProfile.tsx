/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

const useProfile = ({ id }: { id: number }) => {
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { result } = await apiClient.get<{ result: any[] }>(`/application/${id}`);
      setResult(result?.[0] || null);
    } catch {
      setError("Failed to fetch profile");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [id]);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    result,
    loading,
    error,
  };
};

const useProfileList = () => {
  const { data: session } = useSession();
  const officeId = session?.user?.officeId || 0;
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const { result } = await apiClient.get<{ result: any[] }>(`/profile?officeId=${officeId}`);
      setResult(result || null);
    } catch {
      setError("Failed to fetch profile");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    result,
    loading,
    error,
  };
};

export { useProfile, useProfileList };
