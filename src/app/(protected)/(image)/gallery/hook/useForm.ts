import { appendObjectFields } from "@/components/containers/form/buildForm";
import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { IGallery } from "../type";
import { useForm, UseFormReset } from "react-hook-form";
import { z } from "zod";
import { validateImageSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useOne } from "@/hooks/useOne";
import { useEffect } from "react";

const galleryFormSchema = z.object({
  name: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  image: validateImageSchema({
    required: true,
    message: "ກະລຸນາເລືອກຮູບພາບ",
  }).or(z.string()),
});

const defaultValues = {
  name: "",
  image: undefined,
};

export type GalleryFormSchemaType = z.infer<typeof galleryFormSchema>;

export const useGalleryCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<GalleryFormSchemaType>({
    defaultValues,
    resolver: zodResolver(galleryFormSchema),
  });
  const onSubmit = async (data: GalleryFormSchemaType) => {
    try {
      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["image"] });
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      await apiClient.post<IGallery>("/gallery", {
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
      showToast({ type: "success", title: "Creating successful" });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      form.reset();
      router.back();
    } catch {
      showToast({ type: "error", title: "Creating failed" });
    }
  };
  return { form, onSubmit };
};

export const useGalleryEditForm = ({ id }: { id: number }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useOne<IGallery>({ resource: "gallery", id });
  const gallery = data?.result ?? null;
  const form = useForm<GalleryFormSchemaType>({
    resolver: zodResolver(galleryFormSchema),
    defaultValues,
  });
  useFormReset({ gallery, loading, formReset: form.reset });
  const onSubmit = async (data: GalleryFormSchemaType) => {
    try {
      const resourceWithId = `gallery/${id}`;
      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["image"] });
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      if (data.image === String(data.image)) {
        formData.append("image", data.image);
      }
      await apiClient.put<IGallery>(resourceWithId, {
        data: formData,
        config: {
          headers: { "Content-Type": "multipart/form-data" },
        },
      });
      showToast({ type: "success", title: "Editing successful" });
      form.reset();
      router.back();
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
  gallery: IGallery | null,
  loading: boolean,
  formReset: UseFormReset<GalleryFormSchemaType>
}) => {
  useEffect(() => {
    const shouldResetForm = gallery && !loading;
    if (!shouldResetForm) {
      return;
    }
    const formValues: Partial<GalleryFormSchemaType> = {
      name: gallery.name,
      image: gallery.image,
    };
    formReset(formValues, {
      keepDefaultValues: true,
      keepErrors: false,
    });
  }, [gallery, loading, formReset]);
};

