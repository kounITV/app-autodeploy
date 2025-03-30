import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {
  Button,
} from "../../ui";
import { cn } from "@/lib/utils";
interface CardPaginationProps {
  meta: any;
  updatePagination: (newPagination: { page: number }) => void;
  className?: string;
}

export function CardPagination({ meta, updatePagination, className }: CardPaginationProps) {
  const { isFirstPage, isLastPage, currentPage, pageCount } = meta;

  return (
    <div className={cn("flex items-center justify-between space-y-2", className)}>
      <div className="flex-1 text-sm text-muted-foreground"></div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => { updatePagination({ page: 1 }); }}
            disabled={isFirstPage}
            className="transition-all duration-300 ease-in-out opacity-75 hover:opacity-100"
          >
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { updatePagination({ page: currentPage - 1 }); }}
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
            onClick={() => { updatePagination({ page: currentPage + 1 }); }}
            disabled={isLastPage}
            className="transition-all duration-300 ease-in-out opacity-75 hover:opacity-100"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => { updatePagination({ page: pageCount }); }}
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
