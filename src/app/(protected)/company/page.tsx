"use client";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { DataTable } from "@/components/containers/table/data-table";

import { CreateButton } from "@/components/containers/create-button";
import { TitleLabel } from "@/components/containers/headerLabel";
import { Building2 } from "lucide-react";
import { columnsCompany } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { useCompanyAggregation } from "./hook/useAggregation";
import useCompanyTable from "./hook/useTable";

export default function CompanyList() {
  const { result, meta, updatePagination, updateSearch, filter, loading } = useCompanyTable();
  const { result: aggregation } = useCompanyAggregation();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງຫົວໜ່ວຍທຸລະກິດ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນຫົວໜ່ວຍທຸລະກິດ 10-50 ລາຍການຫຼ້າສຸດ!' />
        <CreateButton resouce="company" title='ສ້າງຫົວໜ່ວຍທຸລະກິດ' />
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-3'>
        <AggregationCard value={aggregation?.total ?? 0} title="ຫົວໜ່ວຍທຸລະກິດທັງໝົດ" icon={<Building2 />} label='ຫົວໜ່ວຍທຸລະກິດ' />
      </div>
      <div className="space-y-4">
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
        <DataTable columns={columnsCompany} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
      </div>
    </div>
  );
}
