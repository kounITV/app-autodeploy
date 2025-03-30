"use client";

import { CreateButton } from "@/components/containers/create-button";
import { DataTable } from "@/components/containers/table/data-table";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { TitleLabel } from "@/components/containers/headerLabel";
import { CheckCircle, List } from "lucide-react";
import { columnsPosition } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { usePositionAggregation } from "./hook/useAggregation";
import useProfileTable from "./hook/useTable";

export default function PositionList() {
  const { result, meta, updatePagination, updateSearch, filter } = useProfileTable({});
  const { result: aggregation } = usePositionAggregation();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງຕຳແໜ່ງ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນຕຳແໜ່ງ!' />
        <CreateButton resouce="position" title='ສ້າງຕຳແໜ່ງ' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregation?.total ?? 0} title="ຕຳແໜ່ງທັງໝົດ" icon={<List />} label='ຕຳແໜ່ງ' />
        <AggregationCard value={aggregation?.TotalActive ?? 0} title="ຕຳແໜ່ງເປີດໃຊ້ງານ" icon={<CheckCircle color="green" />} label='ຕຳແໜ່ງ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsPosition} data={result} meta={meta} updatePagination={updatePagination} />
      </div>
    </div>
  );
}
