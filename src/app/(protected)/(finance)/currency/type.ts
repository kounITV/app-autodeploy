export interface ICurrency {
    id: number;
    no: number;
    code: string;
    status: boolean;
    name: string;
    symbol: string;
    currency: string;
    createdAt: string;
    updatedAt: string;
}
export interface ICurrencyColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: ICurrency;
    };
}

export interface ICurrencyAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}
