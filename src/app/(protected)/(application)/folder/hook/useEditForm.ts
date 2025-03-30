import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { formDefaultValues, formSchema } from "../container/schema";
import { type IFolder } from "../type";
import { useOne } from "@/hooks/useOne";

export interface IFolderData {
  status: string;
  result: IFolder;
}
export const useFolderEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading: loading } = useOne<IFolder>({ resource: "folder", id });
  const folder = data?.result ?? null;
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: formDefaultValues,
    resolver: zodResolver(formSchema),
  });
  useFormReset({ folder, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const resourceWithId = `${"folder"}/${id}`;
      await apiClient.put<IFolder>(resourceWithId, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນແຟ້ມເອກກະສານສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      queryClient.invalidateQueries({ queryKey: [resourceWithId] });
      router.back();
    } catch {
      showToast({ type: "error", title: "ແກ້ໄຂຂໍ້ມູນແຟ້ມເອກກະສານ" });
    }
  };
  return { form, onSubmit };
};

export const useOneFolder = ({ id }: { id: number }) => {
  const [folder, setFolder] = useState<IFolder | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchFolder = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get<IFolderData>(`folder/${id}`, { signal });
        setFolder(response?.result ?? null);
      } catch (error) {
        if (error instanceof DOMException && error.name !== "AbortError") {
          setFolder(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFolder();
    return () => {
      controller.abort();
    };
  }, [id]);
  return { folder, loading };
};

const resetFormValues = (
  folder: IFolder | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof formSchema>>,
) => {
  if (!folder || loading) {
    return
  }
  const formValues = {
    name: folder.name,
    folderPrice: folder.folderPrice?.map((price) => ({
      amount: price.amount,
      priceId: price.priceId,
    })) ?? [],
  };

  formReset(formValues, { keepErrors: false });
};

const useFormReset = ({
  folder,
  loading,
  formReset,
}: {
  folder: IFolder | null;
  loading: boolean;
  formReset: UseFormReset<z.infer<typeof formSchema>>;
}) => {
  useEffect(() => {
    resetFormValues(folder, loading, formReset);
  }, [folder, loading, formReset]);
};