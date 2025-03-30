"use client";

import { DataTable } from "@/components/containers/table/data-table";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { TitleLabel } from "@/components/containers/headerLabel";
import { CheckCircle, List } from "lucide-react";
import { columnsDistrict } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { useDistrictAggregation } from "./hook/useAggregation";
import useDistrictTable from "./hook/useTable";

export default function DistrictList() {
  const { result, meta, updatePagination, updateSearch, filter } = useDistrictTable();
  const { result: aggregation } = useDistrictAggregation();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງຈັດການເມືອງ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນຈັດການເມືອງ!' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregation?.total ?? 0} title="ເມືອງທັງໝົດ" icon={<List />} label='ເມືອງ' />
        <AggregationCard value={aggregation?.TotalActive ?? 0} title="ເມືອງເປີດໃຊ້ງານ" icon={<CheckCircle color="green" />} label='ເມືອງ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsDistrict} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
