export interface ICompany {
    id: number;
    no: number;
    name: string;
    businessCode: string;
    businessRegisterBy: string;
    createdAt: string;
    updatedAt: string;
    companyFile: {
        id: number;
        file: string;
        name: string;
    }[]
}
export interface ICompanyColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: ICompany;
    };
}

export interface ICompanyAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
    };
}

