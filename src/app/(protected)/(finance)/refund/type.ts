import { IFolder, INumber } from "../../(application)/folder/type"
import { IPrice } from "../price/type"
import { IProfile } from "../../profile/type"
import { IUser } from "../../user/type"

export interface IRefundReport {
    number: INumber
    price: IPrice
    profile: IProfile
    refundImage: {
        image: string
    }[],
    createdAt: string
    createBy: IUser

}
export interface IRefund {
    number: INumber
    price: IPrice
    folder: IFolder

}
export interface IPriceColumns {
    row: {
        getIsSelected: () => boolean;
        toggleSelected: (selected: boolean) => void;
        original?: IRefund;
    };
}
