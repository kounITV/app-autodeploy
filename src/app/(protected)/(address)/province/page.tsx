"use client";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { TitleLabel } from "@/components/containers/headerLabel";
import { DataTable } from "@/components/containers/table/data-table";
import { CheckCircle, List } from "lucide-react";
import { columnsProvince } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { useProvinceAggregation } from "./hook/useAggregation";
import useProvinceTable from "./hook/useTable";

export default function ProvinceList() {
  const { result, meta, updatePagination, updateSearch, filter, loading } = useProvinceTable();
  const { result: aggregation } = useProvinceAggregation();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງແຂວງ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນແຂວງ!' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregation?.total ?? 0} title="ແຂວງທັງໝົດ" icon={<List />} label='ແຂວງ' />
        <AggregationCard value={aggregation?.TotalActive ?? 0} title="ແຂວງເປີດໃຊ້ງານ" icon={<CheckCircle color="green" />} label='ແຂວງ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsProvince} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
      </div>
    </div>
  );
}
