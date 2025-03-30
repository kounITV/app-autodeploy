
import { Input } from "@/components/ui";
interface DataTableToolbarProps {
    updateSearch: (search: string) => void;
    filter?: {
        statusFilter: string;
        setGenderFilter: (filter: string) => void;
    };
}

export function DataTableToolbar({ updateSearch }: DataTableToolbarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="ຄົ້ນຫາ..."
          className="h-8 w-[150px] lg:w-[250px]"
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}
