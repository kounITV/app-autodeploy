"use client";

import { Form } from "@/components/containers/form";
import React from "react";
import { type UseFormReturn } from "react-hook-form";
import { ExchangeRateType } from "./schema";
import useCurrencyCombobox from "../../../currency/hook/useCurrencyCombobox";

const formTitle = "ສ້າງອັດ​ຕາ​ແລກ​ປ່ຽນ";
const formSubtitle = "ກະລຸນາປ້ອນຂໍ້ມູນຂອງອັດ​ຕາ​ແລກ​ປ່ຽນທີ່ຖືກຕ້ອງ";

interface ExchangeRateFormProps {
  form: UseFormReturn<ExchangeRateType>;
  onSubmit: (data: ExchangeRateType) => Promise<void>;
}
interface ExchangeRateFormProps {
  form: UseFormReturn<ExchangeRateType>
  onSubmit: (data: ExchangeRateType) => Promise<void>
}

const ExchangeRateForm: React.FC<ExchangeRateFormProps> = ({ form, onSubmit }) => {
  const { result: currencyCombobox } = useCurrencyCombobox({ status: true })

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <Form formInstance={form} onSubmit={onSubmit} title={formTitle} subtitle={formSubtitle} className="w-full">
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
          <div className="col-span-1 sm:col-span-2">
            <Form.Field name="name" control={form.control} label="Exchange Name" description="Enter the exchange name">
              <Form.Input.Input className="w-full" placeholder="Enter exchange name" />
            </Form.Field>
          </div>

          <Form.Field
            name="baseCurrencyId"
            control={form.control}
            label="Base Currency"
            description="Select the base currency for this exchange rate."
          >
            <Form.Input.Combobox className="w-full" placeholder="Select base currency" options={currencyCombobox} />
          </Form.Field>

          <Form.Field
            name="targetCurrencyId"
            control={form.control}
            label="Target Currency"
            description="Select the target currency you want to exchange to."
          >
            <Form.Input.Combobox className="w-full" placeholder="Select target currency" options={currencyCombobox} />
          </Form.Field>

          <Form.Field
            name="rateBase"
            control={form.control}
            label="Exchange LIT"
            description="Enter the exchange LIT value (e.g., 110.00)."
          >
            <Form.Input.Input placeholder="Enter exchange rate (e.g., 110.00)" />
          </Form.Field>

          <Form.Field
            name="ratePolice"
            control={form.control}
            label="Exchange ratePolice"
            description="Enter the exchange ratePolice value (e.g., 110.00)."
          >
            <Form.Input.Input placeholder="Enter exchange rate (e.g., 110.00)" />
          </Form.Field>

          <Form.Field
            name="startDate"
            control={form.control}
            label="Start Date"
            description="Select the start date for this exchange rate."
          >
            <Form.Input.DateTimePicker/>
          </Form.Field>

          <Form.Field
            name="endDate"
            control={form.control}
            label="End Date"
            description="Select the end date for this exchange rate."
          >
            <Form.Input.DateTimePicker/>
          </Form.Field>

          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <Form.Field name="status" control={form.control} label="ສະຖານະເປີດໃຊ້ງານ">
              <Form.Input.Switch />
            </Form.Field>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default ExchangeRateForm

