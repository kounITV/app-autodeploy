"use client";

import { CreateButton } from "@/components/containers/create-button";
import { DataTable } from "@/components/containers/table/data-table";

import { TitleLabel } from "@/components/containers/headerLabel";
import { columnsExchangeRate } from "./container/table/columns";
import useExchangeRateTable from "./hook/useTable";

export default function ExchangeRateList() {
  const { result, meta, updatePagination } = useExchangeRateTable();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງອັດ​ຕາ​ແລກ​ປ່ຽນ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນອັດ​ຕາ​ແລກ​ປ່ຽນ!' />
        <CreateButton resouce="exchange" title='ສ້າງອັດ​ຕາ​ແລກ​ປ່ຽນ' />
      </div>
      <div className="space-y-4">
        <DataTable columns={columnsExchangeRate} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
