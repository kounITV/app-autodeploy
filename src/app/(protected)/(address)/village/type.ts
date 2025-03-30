export interface IVillage {
    status: boolean;
    id: number;
    no: number;
    villageLao: string;
    villageEnglish: string;
    districtId: number;
}

export interface IVillageColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IVillage;
    };
}

export interface IVillageAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}