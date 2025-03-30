"use client";

import { CreateButton } from "@/components/containers/create-button";
import { DataTable } from "@/components/containers/table/data-table";

import { TitleLabel } from "@/components/containers/headerLabel";
import { columnsCurrency } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import useCurrencyTable from "./hook/useTable";

export default function CurrencyList() {
  const { result, meta, updatePagination, updateSearch, filter } = useCurrencyTable();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງສະກຸນເງິນ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນສະກຸນເງິນ!' />
        <CreateButton resouce="currency" title='ສ້າງສະກຸນເງິນ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsCurrency} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
