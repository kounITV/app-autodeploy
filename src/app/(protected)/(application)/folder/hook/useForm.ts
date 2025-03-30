import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";

import { formDefaultValues, formSchema, rejectFormDefaultValues, rejectFormSchema, RejectFormSchemaType } from "../container/schema";
import { type IFolder } from "../type";
import { useState } from "react";

export const useFolderForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await apiClient.post<IFolder>("/folder", { data });
      showToast({ type: "success", title: "ສ້າງແຟ້ມເອກກະສານສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      form.reset();
      router.back();
    } catch(error) {
      const axiosError = error as { data: { message: string } };
      if (axiosError?.data?.message === "Office not found") {
        form.setError("root", { type: "manual", message: "ທ່ານບໍ່ໄດ້ ບັນຈຸຢູ່ສາຂາໃດ" })
      }
      showToast({ type: "error", title: "ບໍ່ສາມາດສ້າງແຟ້ມເອກກະສານ" });
    }
  };
  return { form, onSubmit };
};

export const useFolderRejectForm = ({ folderId, setDialogOpen }: { setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>, folderId: number}) => {
  const queryClient = useQueryClient();
  const form = useForm<RejectFormSchemaType>({
    defaultValues: rejectFormDefaultValues,
    resolver: zodResolver(rejectFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RejectFormSchemaType) => {
    try {
      setIsLoading(true);
      await apiClient.post<IFolder>("/folder-reject", { data });
      await apiClient.patch(`/folder/${folderId}/progress`, { data: { status: "REJECTED" } });
      showToast({ type: "success", title: "ສົ່ງແຟ້ມກັບຄືນສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: ["folder-aggregation"] });
      form.reset();
      setDialogOpen(false);
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດສົ່ງແຟ້ມກັບຄືນສໍາເລັດ" });
    } finally {
      setIsLoading(false);
    }
  };
  return { form, onSubmit, isLoading };
};

