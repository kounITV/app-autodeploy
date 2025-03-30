import { useEffect } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { applicationDefaultValues, applicationSchema } from "../container/form/schema";
import { IApplication } from "../type";
import { useOne } from "@/hooks/useOne";

export interface IApplicationData {
  status: string;
  result: IApplication[];
}
export const useApplicationEditForm = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading: loading } = useOne<IApplication>({ resource: "application", id });
  const application = data?.result ?? null;
  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: applicationDefaultValues,
  });
  useFormReset({ application, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    try {
      await apiClient.put<IApplication>(`/application/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນ" });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["folder"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນ" });
    }
  };
  return { form, onSubmit };
};

const useFormReset = ({
  application,
  loading,
  formReset,
}: {
  application: IApplication | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof applicationSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = application && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof applicationSchema>> = {
      profileId: application.profileId,
      folderId: application.folderId,
      positionId: application.positionId,
      companyId: application.companyId ?? 0,
      type: application.type,
      expirationTerm: application.expirationTerm,
      issueDate: application.issueDate,
      expirationDate: application.expirationDate,
      status: application.status,
      numberId: application.numberId,
      dependBy: application.dependBy,
      villageId: application.villageId ?? 0,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [application, loading, formReset]);
};

