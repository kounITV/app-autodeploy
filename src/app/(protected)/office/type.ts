import { type IDistrict } from "../(address)/district/type";
import { type IProvince } from "../(address)/province/type";

export interface IOffice {
    officeId: any;
    id: number;
    no: number;
    name: string;
    provinceId: number;
    districtId: number;
    village: string;
    status: boolean;
    province: IProvince
    district: IDistrict
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface IOfficeColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IOffice;
    };
}

export interface IOfficeAggregation {
    month: string;
    male: number;
    female: number;
    result: {
        total: number;
        TotalActive: number;
    };
}

