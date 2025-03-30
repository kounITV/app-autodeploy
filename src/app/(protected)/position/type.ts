export interface IPosition {
    status: boolean;
    id: number;
    no: number;
    englishName: string;
    laoName: string;
}

export interface IPositionColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IPosition;
    };
}

export interface IPositionAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}

