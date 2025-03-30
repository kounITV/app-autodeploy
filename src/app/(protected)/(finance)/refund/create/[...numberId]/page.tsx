"use client";

import { useList } from "@/hooks/useList";
import RefundForm from "../../container/form/form";
import { useRefundForm } from "../../hook/useForm";
import { IRefund } from "../../type";
import { useUpdateDefaultValues } from "@/lib/update-default-values";

export default function ApplicationCreate({ params }: { params: { numberId: number[] } }) {
  const numberId = params.numberId[0];
  const { result: galleries } = useList<IRefund>({
    resource: "/number-folder-aggregation",
    enabled: true,
    initialFilters: { numberId: Number(numberId)  },
  })
  const refundData = galleries?.[0]
  const { form, onSubmit } = useRefundForm();
  useUpdateDefaultValues({ form, fieldName: "numberId", value: refundData?.number?.id, shouldUpdate: true });
  useUpdateDefaultValues({ form, fieldName: "priceAmount", value: Number(refundData?.price?.price), shouldUpdate: true });
  useUpdateDefaultValues({ form, fieldName: "priceId", value: refundData?.price?.id, shouldUpdate: true });
  return <RefundForm form={form} onSubmit={onSubmit} refundData={refundData} />;
}
