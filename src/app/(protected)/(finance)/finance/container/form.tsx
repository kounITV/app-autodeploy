"use client"

import { Form } from "@/components/containers/form"
import type React from "react"
import type { UseFormReturn } from "react-hook-form"
import type { z } from "zod"
import type { financeSchema } from "./schema"
import useExchangeRateCombobox from "../../exchange/hook/useExchangeRateCombobox"
import type { IExchangeRate } from "../../exchange/type"
import { useOne } from "@/hooks/useOne"
import ExchangeRateDisplay from "./exchange-rate-card"
import { useUpdateDefaultValues } from "@/lib/update-default-values"

const formTitle = "ສ້າງຢືນຢັນວ່າໄດ້ຮັບເງິນ"
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຢືນຢັນວ່າການໄດ້ຮັບເງິນ"

interface FinanceFormProps {
  form: UseFormReturn<z.infer<typeof financeSchema>>
  onSubmit: (data: z.infer<typeof financeSchema>) => Promise<void>
  isEdit?: boolean
  amount: string
}

const FinanceForm: React.FC<FinanceFormProps> = ({ form, onSubmit, amount }) => {
  const { result: exchangeRateCombobox } = useExchangeRateCombobox({ status: true })
  const exchangeRate = form.watch("exchangeRateId")
  const { data } = useOne<IExchangeRate>({ resource: "exchange_rate", id: exchangeRate ?? 0 })
  const { rateBase, createdAt, ratePolice } = data?.result || {}
  const baseCurrency = data?.result?.baseCurrency || null
  const targetCurrency = data?.result?.targetCurrency || null
  const conversion = rateBase ? rateBase * Number.parseFloat(amount) : 0
  useUpdateDefaultValues({ form, fieldName: "rateBase", value: rateBase, shouldUpdate: rateBase !== 0 });
  useUpdateDefaultValues({ form, fieldName: "ratePolice", value: ratePolice, shouldUpdate: ratePolice !== 0 });
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle}>
            <div className="flex items-center justify-between rounded-lg bg-muted p-4">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">ຈຳນວນເງິນ</div>
                <div className="text-lg font-semibold">
                  {amount} $
                </div>
              </div>
            </div>
            <Form.Field name="exchangeRateId" control={form.control} label="ຈ່າຍດ້ວຍເງິນສະກຸນອື່ນ">
              <Form.Input.Combobox options={exchangeRateCombobox} />
            </Form.Field>
            <Form.Field name="receiptNumber" control={form.control} label="ເລກບິນຮັບເງິນ" required={false}>
              <Form.Input.Input placeholder="00001" />
            </Form.Field>
            <Form.Field name="receiptImage" control={form.control} label="ຮູບໃບຮັບເງິນ" required={false}>
              <Form.Input.ImageWithDrag
                placeholder="ຮູບໃບຮັບເງິນ"
                className="flex w-full h-auto items-center justify-center rounded-lg border border-dashed bg-muted"
              />
            </Form.Field>
          </Form>
        </div>
        {exchangeRate && (
          <div>
            <ExchangeRateDisplay
              rate={rateBase}
              createdAt={createdAt}
              baseCurrency={baseCurrency}
              targetCurrency={targetCurrency}
              amount={amount}
              conversion={conversion}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default FinanceForm

