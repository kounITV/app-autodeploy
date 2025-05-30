import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useApplicationStatus = () => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const onSubmit = async (ids: number[], status: string) => {
    setLoading(true);
    try {
      await apiClient.patch(`application/update-status`, { data: { ids, status } });
      showToast({
        type: "success",
        title: "ສໍາເລັດ",
      });
      queryClient.invalidateQueries({ queryKey: ["application-aggregation"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    } catch {
      showToast({
        type: "error",
        title: "ສໍາເລັດ",
      });
    } finally {
      setLoading(false);
    }
  };
  return { onSubmit, loading };
};
