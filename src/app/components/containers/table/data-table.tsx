import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui";

import { cn } from "@/lib/utils";
import { DataTablePagination } from "./data-table-pagination";
interface DataTableProps<TData, TValue> {
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search?: string;
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  meta?: {
    currentPage: number;
    limit: number;
    totalCount: number;
  };
  className?: string
  updatePagination?: (pagination: { page: number; limit: number }) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  updatePagination,
  handleSearchChange,
  search,
  className
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: meta
        ? { pageIndex: meta.currentPage - 1, pageSize: meta.limit }
        : undefined,
    },
    manualPagination: !!meta,
    rowCount: meta?.totalCount,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      if (updatePagination && typeof updater === "function") {
        const currentPagination = table.getState().pagination;
        const newPagination = updater(currentPagination);
        updatePagination({
          page: newPagination.pageIndex + 1,
          limit: newPagination.pageSize,
        });
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      <div className={cn("rounded-md border", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="motion-preset-slide-down font-black"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )
              : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                  ບໍ່ມີຂໍ້ມູນ.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      {meta && (
        <DataTablePagination
          table={table}
          totalItems={meta.totalCount}
          paginationMeta={{
            isFirstPage: meta.currentPage === 1,
            isLastPage:
              meta.currentPage === Math.ceil(meta.totalCount / meta.limit),
            currentPage: meta.currentPage,
            pageCount: Math.ceil(meta.totalCount / meta.limit),
          }}
          onPageChange={(newPage) =>
            updatePagination?.({
              page: newPage,
              limit: meta.limit,
            })
          }
        />
      )}
    </div>
  );
}
