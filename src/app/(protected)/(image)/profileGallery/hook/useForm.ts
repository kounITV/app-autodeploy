import showToast from '@/components/containers/show-toast';
import { apiClient } from '@/lib/axios';
import { useEffect } from 'react';
import { useForm, UseFormReset } from 'react-hook-form';
import { useOne } from '@/hooks/useOne';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IProfileGallery } from '../type';

const galleryFormSchema = z.object({
  profileId: z.number().min(1, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  galleryId: z.number().min(1, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
});

const defaultValues = {
  profileId: 0,
  galleryId: 0,
};

export type FormProfileGallerySchemaType = z.infer<typeof galleryFormSchema>;

export const useProfileGalleryCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<FormProfileGallerySchemaType>({
    defaultValues,
    resolver: zodResolver(galleryFormSchema),
  });
  const onSubmit = async (data: FormProfileGallerySchemaType) => {
    try {
      await apiClient.post<IProfileGallery>("/profile_gallery", { data: data });
      showToast({ type: "success", title: "Creating successful" });
      queryClient.invalidateQueries({ queryKey: ["profile_gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "Creating failed" });
    }
  };
  return { form, onSubmit };
};

export const useProfileGalleryEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useOne<IProfileGallery>({ resource: "profile_gallery", id });
  const gallery = data?.result ?? null;
  const form = useForm<FormProfileGallerySchemaType>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues,
  });
  useFormReset({ gallery, loading, formReset: form.reset });
  const onSubmit = async (data: FormProfileGallerySchemaType) => {
    try {
      const resourceWithId = `profile_gallery/${id}`;
      await apiClient.put<IProfileGallery>(resourceWithId, { data: data });
      showToast({ type: "success", title: "Editing successful" });
      form.reset();
      router.back();
      queryClient.invalidateQueries({ queryKey: ["profile_gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message;
      showToast({ type: "error", title: message });
    }
  };
  return { form, onSubmit };
};

const useFormReset = ({
  gallery,
  loading,
  formReset,
}: {
  gallery: IProfileGallery | null,
  loading: boolean,
  formReset: UseFormReset<FormProfileGallerySchemaType>
}) => {
  useEffect(() => {
    const shouldResetForm = gallery && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<FormProfileGallerySchemaType> = {
      profileId: gallery.profileId,
      galleryId: gallery.galleryId,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [gallery, loading, formReset]);
};
