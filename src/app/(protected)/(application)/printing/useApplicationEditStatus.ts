import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { type IApplication } from "../application/type";

export interface IApplicationData {
  status: string;
  result: IApplication[];
}

export const useApplicationProgress = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const onSubmit = async () => {
    setLoading(true);
    try {
      await apiClient.patch(`/application/${id}/status`, { data: { status: "FINISHED" } });
      showToast({
        type: "success",
        title: "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ",
      });
      queryClient.invalidateQueries({ queryKey: ["application-aggregation"] });
      queryClient.invalidateQueries({ queryKey: ["application"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ" });
    } finally {
      setLoading(false);
    }
  };
  return { onSubmit, loading };
};