export interface IDistrict {
    status: boolean;
    id: number;
    no: number;
    districtLao: string;
    districtEnglish: string;
    provinceId: number;
}

export interface IDistrictColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IDistrict;
    };
}

export interface IDistrictAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}

