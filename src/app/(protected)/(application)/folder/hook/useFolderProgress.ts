import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { ProcessStatus, type IFolder } from "../type";

export interface IFolderData {
  status: string;
  result: IFolder[];
}

export const useFolderProgress = ({ id, status }: { id: number, status: ProcessStatus }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const onSubmit = async () => {
    setLoading(true);
    try {
      await apiClient.patch(`/folder/${id}/progress`, { data: { status: status } });
      showToast({
        type: "success",
        title: "ແກ້ໄຂຂໍ້ມູນສໍາເລັດ",
      });
      queryClient.invalidateQueries({ queryKey: ["folder-aggregation"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    } catch {
      showToast({
        type: "error",
        title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ",
      });
    } finally {
      setLoading(false);
    }
  };
  return { onSubmit, loading };
};
