import { toast } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CustomToastProps {
    title?: string;
    description?: React.ReactNode;
    className?: string;
    type?: "success" | "error" | "default";
    timeout?: number;
}

const showToast = ({
  title = "Notification",
  description,
  className,
  type = "default",
  timeout = 1,
}: CustomToastProps) => {
  const typeVariants = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    default: "bg-blue-500 text-white",
  };

  setTimeout(() => {
    toast({
      id: `toast-${Date.now()}`,
      title,
      // description:
      //     typeof description === "string"
      //         ? description
      //         : description ? JSON.stringify(description) : undefined,
      className: cn(
        typeVariants[type],
        "text-white top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        className,
      ),
      variant: type === "error" ? "destructive" : "default",
    });
  }, timeout);
};

export default showToast;
