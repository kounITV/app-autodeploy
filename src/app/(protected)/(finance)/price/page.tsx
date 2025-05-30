"use client";

import { CreateButton } from "@/components/containers/create-button";
import { DataTable } from "@/components/containers/table/data-table";

import { TitleLabel } from "@/components/containers/headerLabel";
import { columnsPrice } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import usePriceTable from "./hook/useTable";

export default function PriceList() {
  const { result, meta, updatePagination, updateSearch, filter, loading } = usePriceTable();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງລາຄາ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນລາຄາ!' />
        <CreateButton resouce="price" title='ສ້າງລາຄາ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsPrice} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
      </div>
    </div>
  );
}
