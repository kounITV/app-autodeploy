import { IOffice } from "../../office/type";
import { IPrice } from "../../(finance)/price/type";

interface FolderPrice {
    amount: number;
    priceId?: number;
    price?: IPrice
    total?: number;
}

export interface INumber {
    id: number;
    number: string;
    folderId: number;
    folder: IFolder
    isAvailable: boolean
}
export interface FolderReject {
    id: number;
    comment: string;
    folderId: number;
    status: string;
}
export interface IFolder {
    id: number;
    no?: string;
    code: string;
    name: string;
    officeId: number;
    status: string;
    createdAt: string;
    number?: INumber[];
    folderPrice: FolderPrice[];
    folderReject?: FolderReject[]
    totalAmount: number;
    totalPrice: number;
    office: IOffice
}
export interface IAction {
    editText?: string;
    acceptText?: string;
    statusText?: string;
    approveText?: string;
    showDetail?: string;
    reject?: string;
  }

export interface FolderCardViewProps {
    folder: IFolder;
    action?: IAction;
    status: ProcessStatus;
    showReject?: boolean;
  }

export type FolderType = "YELLOW" | "BLUE";
export type ProcessStatus = "DEFAULT" | "PENDING" | "APPROVED_BY_POLICE" | "FINANCE_UNDER_REVIEW" | "POLICE_UNDER_REVIEW" | "IN_PRODUCTION" | "FINISHED" | "REJECTED";
