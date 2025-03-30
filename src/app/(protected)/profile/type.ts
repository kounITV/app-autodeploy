import { type IDistrict } from "../(address)/district/type";
import { type INationality } from "../nationality/type";
import { type IProvince } from "../(address)/province/type";
import { IVillage } from "../(address)/village/type";
import { IGallery } from "../(image)/gallery/type";

export interface IProfile {
    ethnicity: INationality;
    barcode?: number
    nationality: INationality;
    ethnicityId: number;
    nationalityId: number;
    status: string;
    id: number;
    no: number;
    image: string;
    oldImage: string
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    identityType: string;
    identityNumber: string;
    identityIssueDate: string;
    identityExpiryDate: string;
    currentProvince: number;
    district: IDistrict
    province: IProvince
    currentDistrict: number;
    currentVillageId: number;
    currentVillage: IVillage;
    overseasProvince: string;
    overseasCountry: INationality;
    overseasCountryId: number;
    createdAt: string;
    updatedAt: string;
    applicationNumber: string;
    profileGallery: IGallery[]
}

export interface Position {
    id: number;
    englishName: string;
    laoName: string;
}

export interface BusinessUnit {
    id: number;
    name: string;
    businessCode: string;
    documentFile: string | null;
    businessRegisterBy: string;
}

export interface RegistrationDocument {
    id: number;
    type: string;
    laoName: string;
}

export interface Folder {
    id: number;
    name: string;
    code: string;
    totalApplications: number;
    approvedApplications: number;
}

export interface ProfileData {
    no: number;
    id: number;
    formId: string;
    applicationType: string;
    expirationTerm: string;
    requestDate: string;
    status: string;
    Profile: IProfile;
    Position: Position;
    BusinessUnit: BusinessUnit;
    RegistrationDocument: RegistrationDocument;
    Folder: Folder;
}

export interface IProfileColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IProfile;
    };
}

export interface IAggregationChartProfile {
    month: string;
    male: number;
    female: number;
    result: {
        month: string;
        male: number;
        female: number;
    };
}
