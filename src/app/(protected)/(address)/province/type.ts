export interface IProvince {
    id: number;
    no: number;
    provinceLao: string;
    provinceEnglish: string;
    status: boolean;

}

export interface IProvinceColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IProvince;
    };
}

export interface IProvinceAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}
