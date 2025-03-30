import { apiClient } from "@/lib/axios";
import { useCallback, useState } from "react";

export const useDeleteUser = () => {
  const [value, setValue] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const updateUser = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.put(`/user/delete/${id}`, {
        data: undefined,
      });
      setValue(true);
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    } finally {
      setLoading(false);
    }
  }, []);

  return { value, loading, error, updateUser };
};
