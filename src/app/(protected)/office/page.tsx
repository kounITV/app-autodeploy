"use client";

import { DataTable } from "@/components/containers/table/data-table";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { CreateButton } from "@/components/containers/create-button";
import { TitleLabel } from "@/components/containers/headerLabel";
import { CheckCircle, List } from "lucide-react";
import { columnsOffice } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { useOfficeAggregation } from "./hook/useAggregation";
import useOfficeTable from "./hook/useTable";

export default function OfficeList() {
  const { result, meta, updatePagination, updateSearch, filter, loading } = useOfficeTable();
  const { result: aggregation } = useOfficeAggregation();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງຫ້ອງການ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນຫ້ອງການ!' />
        <CreateButton resouce="office" title='ສ້າງຫ້ອງການ' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregation?.total ?? 0} title="ຫ້ອງການທັງໝົດ" icon={<List />} label='ຫ້ອງການ' />
        <AggregationCard value={aggregation?.TotalActive ?? 0} title="ຫ້ອງການເປີດໃຊ້ງານ" icon={<CheckCircle color="green" />} label='ຫ້ອງການ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsOffice} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
      </div>
    </div>
  );
}
