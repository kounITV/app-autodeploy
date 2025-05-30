"use client";

import { DataTable } from "@/components/containers/table/data-table";

import { TitleLabel } from "@/components/containers/headerLabel";
import { columnsRefund, columnsRefundReport } from "./container/table/columns";
import useRefundTable from "./hook/useTable";
import useTable from "@/hooks/useTable";
import { IRefundReport } from "./type";
import { getUserRole } from "@/lib/getSession";

export default function RefundPage() {
  const role = getUserRole();
  let refundComponent;
  switch (role) {
    case "SUPER_ADMIN":
      refundComponent = <RefundReport />;
      break;
    case "FINANCE":
      refundComponent = <RefundRequest />;
      break;
    default:
      refundComponent = null;
      break;
  }
  return (
    <>
      {refundComponent}
    </>
  );
}

function RefundRequest() {
  const { result, meta, loading } = useRefundTable();
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຂໍຄືນເງິນ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນຂໍຄືນເງິນ 10 ລາຍການຫຼ້າສຸດ!' />
      </div>
      <div className="space-y-4">
        <DataTable columns={columnsRefund} data={result} meta={meta} loading={loading}/>
      </div>
    </div>
  );
}
function RefundReport() {
  const { result: resultReport, meta: metaReport, updatePagination, loading } = useTable<IRefundReport>({ resource: "/refund" });
  return (
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ລາຍງານທີອະນຸມັດແລ້ວ' subtitle='ນີ້ແມ່ນລາຍງານທິອະນຸມັດແລ້ວ 10 ລາຍການຫຼ້າສຸດ!' />
      </div>
      <div className="space-y-4">
        <DataTable columns={columnsRefundReport} data={resultReport} meta={metaReport} updatePagination={updatePagination} loading={loading} />
      </div>
    </div>
  );
}
