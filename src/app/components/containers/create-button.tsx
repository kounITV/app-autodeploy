import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui";

export function CreateButton({ resouce, title = "Add New" }: { resouce?: string, title?: string }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const handleCreate = () => {
    router.push(`/${resouce || pathname}/create`);
  };
  return (
    <Button variant="outline" className="flex items-center gap-2 px-4 py-2" onClick={handleCreate}>
      <Plus size={18} strokeWidth={2} />
      <span>{title}</span>
    </Button>
  );
}
