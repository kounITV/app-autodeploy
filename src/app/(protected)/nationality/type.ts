export type ContinentType = "Africa" | "Antarctica" | "Asia" | "Europe" | "North America" | "South America" | "Australia";

export interface INationality {
    status: boolean;
    id: number;
    no: number;
    name: string;
    nationality: string;
    code: string;
    continent: ContinentType;
}

export interface InationalityColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: INationality;
    };
}

export interface INationalityAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}

