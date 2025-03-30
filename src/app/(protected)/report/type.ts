import { ICurrency } from "../(finance)/currency/type";

interface Summary {
    name: string;
    sum: {
        total: number;
        currency: ICurrency;
    }[];
}

interface NumberAggregation {
    no: number;
    id: number;
    number: string;
    createdAt: string;
    pricePrice: number;
    priceCode: string;
    priceDuration: string;
    approvedByFirstName: string;
    rateBase: number;
    ratePolice: number;
    currencyName: string;
    currencyCode: string;
    currencySymbol: string;
    targetCurrencyName: string;
    price: number;
    officeName: string;
    folderCode: string;
}

export interface INumberAggregation {
    summary: Summary;
    data: NumberAggregation[];
}

