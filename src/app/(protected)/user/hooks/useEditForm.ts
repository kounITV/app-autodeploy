import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, type UseFormReset } from "react-hook-form";
import { type z } from "zod";

import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import { defaultValues, userSchemaEdit } from "../container/form/schema";
import { type IUser } from "../type";
import { useOne } from "@/hooks/useOne";

export interface IUserData {
  role: string;
  result: IUser;
}
export const useUserEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useOne<IUser>({ resource: "user", id });
  const user = data?.result ?? null;
  const form = useForm<z.infer<typeof userSchemaEdit>>({
    resolver: zodResolver(userSchemaEdit),
    defaultValues,
  });
  useFormReset({ user, loading, formReset: form.reset });
  const onSubmit = async (data: z.infer<typeof userSchemaEdit>) => {
    try {
      await apiClient.put<IUser>(`/user/${id}`, { data });
      showToast({ type: "success", title: "ແກ້ໄຂຂໍ້ມູນຜູ້ໃຊ້ງານລະບົບ" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["users"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message;
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

const mapUserToFormValues = (user: IUser | null): Partial<z.infer<typeof userSchemaEdit>> => {
  if (!user) {
    return {};
  }
  return {
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    isActive: user.isActive,
    officeId: user.officeId ?? undefined,
    username: user.username,
    userOffice: user.userOffice.map((item) => item.officeId) ?? [],
  };
};

const useFormReset = ({
  user,
  loading,
  formReset,
}: {
  user: IUser | null;
  loading: boolean;
  formReset: UseFormReset<z.infer<typeof userSchemaEdit>>;
}) => {
  useEffect(() => {
    const formValues = mapUserToFormValues(user);
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [user, loading, formReset]);
};
