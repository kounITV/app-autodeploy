import { useEffect } from "react";

import { appendObjectFields } from "@/components/containers/form/buildForm";
import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";
import { defaultValues, profileFormSchema } from "../container/form/schema";
import { type IProfile } from "../type";
import { useQueryClient } from "@tanstack/react-query";
import { useOne } from "@/hooks/useOne";

export interface IProfileData {
  status: string;
  result: IProfile[];
}
export const useProfileEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const { data, isLoading: loading } = useOne<IProfile>({ resource: "profile", id });
  const profile = data?.result ?? null;
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });
  const queryClient = useQueryClient();
  useFormReset({ profile, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    try {
      const resourceWithId = `profile/${id}`;
      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["image", "oldImage"] });
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      if (data.image === String(data.image)) {
        formData.append("image", data.image);
      }
      if (data.oldImage instanceof File) {
        formData.append("oldImage", data.oldImage);
      }
      if (data.oldImage === String(data.oldImage)) {
        formData.append("oldImage", data.oldImage);
      }
      await apiClient.put<IProfile>(resourceWithId, {
        data: formData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນບຸກຄົນສໍາເລັດ" });
      router.back();
    } catch {
      showToast({ type: "error", title: "ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນບຸກຄົນໄດ້" });
    }
  };
  return { form, onSubmit };
};
const useFormReset = ({
  profile,
  loading,
  formReset,
}: {
  profile: IProfile | null,
  loading: boolean,
  formReset: UseFormReset<z.infer<typeof profileFormSchema>>
}) => {
  useEffect(() => {
    const shouldResetForm = profile && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<z.infer<typeof profileFormSchema>> = {
      image: profile.image,
      oldImage: profile.oldImage,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber,
      dateOfBirth: profile.dateOfBirth ? new Date(profile.dateOfBirth) : undefined,
      gender: profile.gender,
      nationalityId: profile.nationalityId,
      ethnicityId: profile.ethnicityId,
      identityType: profile.identityType,
      identityIssueDate: profile.identityIssueDate ? new Date(profile.identityIssueDate) : undefined,
      identityNumber: profile.identityNumber,
      identityExpiryDate: profile.identityExpiryDate ? new Date(profile.identityExpiryDate) : undefined,
      currentProvince: profile.currentProvince,
      currentDistrict: profile.currentDistrict,
      currentVillageId: profile.currentVillageId ?? 0,
      overseasProvince: profile.overseasProvince,
      overseasCountryId: profile.overseasCountryId ?? 0,
      applicationNumber: profile.applicationNumber,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [profile, loading, formReset]);
};
