import { z } from "zod";

export const exchangeRateFormSchema = z.object({
  name: z.string().min(1, {
    message: "Please enter a name.",
  }),
  baseCurrencyId: z.number().min(1, {
    message: "Please select a base currency.",
  }),
  targetCurrencyId: z.number().min(1, {
    message: "Please select a target currency.",
  }),
  rateBase: z.string().min(1, {
    message: "Please enter the exchange rate.",
  }).regex(/^\d+(\.\d{1,3})?$/, {
    message: "Exchange rate must be a number with up to 4 decimal places.",
  }),
  ratePolice: z.string().min(1, {
    message: "Please enter the exchange rate.",
  }).regex(/^\d+(\.\d{1,4})?$/, {
    message: "Exchange rate must be a number with up to 4 decimal places.",
  }),
  startDate: z.string().min(2, {
    message: "Please select a start date.",
  }),
  endDate: z.string().min(1, {
    message: "Please select an end date.",
  }),
  status: z.boolean(),
});

export const defaultValues = {
  baseCurrencyId: 0,
  targetCurrencyId: 0,
  rateBase: "",
  ratePolice: "",
  startDate: "",
  endDate: "",
  status: true,
  name: "",
};

export type ExchangeRateType = z.infer<typeof exchangeRateFormSchema>;
