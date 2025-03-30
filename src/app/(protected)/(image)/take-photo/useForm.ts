import { appendObjectFields } from "@/components/containers/form/buildForm";
import showToast from "@/components/containers/show-toast";
import { apiClient } from "@/lib/axios";
import { validateImageSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useWebcamForm = () => {
  const queryClient = useQueryClient();
  const form = useForm<WebcamFormSchemaType>({
    defaultValues,
    resolver: zodResolver(priceFormSchema),
  });

  const onSubmit = async (data: WebcamFormSchemaType) => {
    try {
      const formData = new FormData();
      appendObjectFields({ formData, data, excludeKeys: ["image"] });
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      await apiClient.post("/gallery", {
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
      showToast({ type: "success", title: "Creating successful" });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    } catch (error) {
      const axiosError = error as { data: { message: string } };
      const message = axiosError?.data?.message || "An unexpected error occurred.";
      showToast({ type: "error", title: message });
    }
  };

  const handleBase64ToFile = (base64String: string, filename: string) => {
    const byteString = atob(base64String.split(",")[1]);
    const mimeType = base64String.match(/data:(.*?);base64/)?.[1] || "image/png";
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: mimeType });
    return new File([blob], filename, { type: mimeType });
  };
  const handleImageUpload = (base64String: string) => {
    const file = handleBase64ToFile(base64String, "uploaded-image.png");
    form.setValue("image", file);
  };

  return { form, onSubmit, handleImageUpload };
};

export const priceFormSchema = z.object({
  name: z.string().min(2, {
    message: "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ..",
  }),
  image: validateImageSchema({
    required: true,
    message: "ກະລຸນາເລືອກຮູບພາບ",
  }).or(z.string()),
});

export type WebcamFormSchemaType = z.infer<typeof priceFormSchema>;

export const defaultValues = {
  name: "",
  image: undefined,
};
