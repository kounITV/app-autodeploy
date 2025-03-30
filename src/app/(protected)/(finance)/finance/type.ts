import { IFolder } from "../../(application)/folder/type";
import { IUser } from "../../user/type";

export interface IFinance {
    id: number;
    folderId: number;
    amount: string;
    receiptImage?: string;
    paymentMethod: "CASH" | "MONEY_TRANSFER";
    approvedApplications: number;
    approvedByUser: IUser
    approvedById: number;
    receiptNumber?: string;
    approvedAt: Date;
    paymentDate: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    folder: IFolder
    createdAt: string
}
