"use client";

import { useUpdateDefaultValues } from "@/lib/update-default-values";
import FinanceForm from "../../container/form";
import { useFinanceForm } from "../../hook/useForm";
import { useOne } from "@/hooks/useOne";
import { IFolder } from "src/app/(protected)/(application)/folder/type";

export default function FinanceCreate({ params }: { params: { folderId: number[] } }) {
  const [folderId] = params.folderId;
  const newFolderId = Number(folderId);
  const { form, onSubmit } = useFinanceForm({ folderId: newFolderId });
  const { data } = useOne<IFolder>({ resource: "folder", id: newFolderId });
  const amount =  data?.result?.totalPrice ?? 0;
  useUpdateDefaultValues({ form, fieldName: "amount", value: amount.toString() ?? "", shouldUpdate: amount !== 0 });
  return <FinanceForm form={form} onSubmit={onSubmit} amount={amount.toString() ?? ""} />;
}
