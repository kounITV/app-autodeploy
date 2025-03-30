import { type IOffice } from "../office/type";

export type RoleType = "ADMIN" | "FINANCE" | "POLICE_OFFICER" | "POLICE_COMMANDER" | "POLICE_PRODUCTION" | "VERSIFICATION_OFFICER";

export interface IUser {
    no: number;
    id: number;
    firstName: string;
    username: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: RoleType;
    officeId: number;
    office: IOffice;
    branchRole: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    userOffice: IUserOffice[];
}
export interface IUserOffice {
    id: number;
    officeId: number;
    userId: string;
    office: IOffice;
    user: IUser;
}