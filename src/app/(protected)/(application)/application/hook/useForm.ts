import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import { applicationSchema } from "../container/form/schema";

export const useApplicationForm = ({ profileId, type ="NEW" }: { profileId: number, type: string }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof applicationSchema>>({
    defaultValues: {
      profileId: 0,
      folderId: 0,
      positionId: 0,
      companyId: 0,
      type,
      expirationTerm: "",
      issueDate: "",
      expirationDate: "",
      status: "DEFAULT",
    },
    resolver: zodResolver(applicationSchema),
  });
  const onSubmit = async (data: z.infer<typeof applicationSchema>) => {
    try {
      await apiClient.post("/application", { data });
      showToast({ type: "success", title: "ອອກບັດໃຫມ່ສໍາເລັດ" });
      queryClient.invalidateQueries({ queryKey: ["numbers"] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });

      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດອອກບັດໃຫມ່" });
    }
  };
  useUpdateDefaultValues({ form, fieldName: "profileId", value: profileId, shouldUpdate: true });
  return { form, onSubmit };
};

const useUpdateDefaultValues = ({ form, fieldName, value, shouldUpdate }: any) => {
  const valueRef = useRef(value);
  useEffect(() => {
    if (shouldUpdate) {
      form.setValue(fieldName, value);
      valueRef.current = value;
    }
  }, [value, fieldName, form.setValue, shouldUpdate]);
};
