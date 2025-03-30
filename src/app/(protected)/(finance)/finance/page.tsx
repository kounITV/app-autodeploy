"use client";

import { DataTable } from "@/components/containers/table/data-table";

import { TitleLabel } from "@/components/containers/headerLabel";
import { columnsFinance } from "./container/columns";
import useFinanceTable from "./hook/useTable";

export default function FinanceList() {
  const { result, meta, updatePagination } = useFinanceTable();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງການເງິນ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນການເງິນ!' />
      </div>
      <div className="space-y-4">
        <DataTable columns={columnsFinance} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
