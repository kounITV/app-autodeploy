"use client";

import { DataTable } from "@/components/containers/table/data-table";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { TitleLabel } from "@/components/containers/headerLabel";
import { CheckCircle, List } from "lucide-react";
import { columnsVillage } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { useVillageAggregation } from "./hook/useAggregation";
import useVillageTable from "./hook/useTable";
import { CreateButton } from "@/components/containers/create-button";

export default function VillageList() {
  const { result, meta, updatePagination, updateSearch, filter } = useVillageTable();
  const { result: aggregation } = useVillageAggregation();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງຈັດການບ້ານ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນຈັດການບ້ານ!' />
        <CreateButton resouce="village" title='ສ້າງບ້ານ' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregation?.total ?? 0} title="ບ້ານທັງໝົດ" icon={<List />} label='ບ້ານ' />
        <AggregationCard value={aggregation?.TotalActive ?? 0} title="ບ້ານເປີດໃຊ້ງານ" icon={<CheckCircle color="green" />} label='ບ້ານ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsVillage} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
