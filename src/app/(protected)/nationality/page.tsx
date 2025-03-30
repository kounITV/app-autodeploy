"use client";

import { DataTable } from "@/components/containers/table/data-table";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { TitleLabel } from "@/components/containers/headerLabel";
import { CheckCircle, List } from "lucide-react";
import { columnsnationality } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { usenationalityAggregation } from "./hook/useAggregation";
import usenationalityTable from "./hook/useTable";

export default function nationalityList() {
  const { result, meta, updatePagination, updateSearch, filter } = usenationalityTable();
  const { result: aggregation } = usenationalityAggregation();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງປະເທດ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນປະເທດ!' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregation?.total ?? 0} title="ປະເທດທັງໝົດ" icon={<List />} label='ປະເທດ' />
        <AggregationCard value={aggregation?.TotalActive ?? 0} title="ປະເທດເປີດໃຊ້ງານ" icon={<CheckCircle color="green" />} label='ປະເທດ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsnationality} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
