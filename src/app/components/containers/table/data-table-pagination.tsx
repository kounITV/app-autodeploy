import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui";

interface DataTablePaginationProps {
  table: Table<any>;
  totalItems: number;
  paginationMeta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    pageCount: number;
  };
  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  table,
  totalItems,
  paginationMeta,
  onPageChange,
}: DataTablePaginationProps) {
  const { isFirstPage, isLastPage, currentPage, pageCount } = paginationMeta;
  return (
    <div className="flex items-center justify-between space-y-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {/* {table.getFilteredSelectedRowModel().rows.length} ໃນ {totalItems} ແຖວ */}
      </div>
      <div className="flex items-center space-x-2">
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => { table.setPageSize(Number(value)); }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder="Rows" />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={String(pageSize)}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => { onPageChange(1); }}
            disabled={isFirstPage}
            className="transition-all duration-300 ease-in-out opacity-75 hover:opacity-100"
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { onPageChange(currentPage - 1); }}
            disabled={isFirstPage}
            className="transition-all duration-300 ease-in-out opacity-75 hover:opacity-100"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { onPageChange(currentPage + 1); }}
            disabled={isLastPage}
            className="transition-all duration-300 ease-in-out opacity-75 hover:opacity-100"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { onPageChange(pageCount); }}
            disabled={isLastPage}
            className="transition-all duration-300 ease-in-out opacity-75 hover:opacity-100"
          >
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
