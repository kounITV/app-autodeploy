import { ICurrency } from "../currency/type"
export interface IExchangeRate {
    id: number;
    no: number;
    name: string
    baseCurrencyId: number;
    targetCurrencyId: number;
    rate: number,
    rateBase: number;
    ratePolice: number;
    startDate: string;
    endDate?: string
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    officeId: number;
    baseCurrency: ICurrency;
    targetCurrency: ICurrency;
    status: boolean
}
export interface IExchangeRateColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IExchangeRate;
    };
}

export interface IExchangeRateAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}
