import { IOffice } from '../../office/type';
import { IProfile } from '../../profile/type';
export interface IGallery {
    no: number
    id: number
    name: string
    image: string
    createdAt: string
    updatedAt: string
    office: IOffice
    profileGallery: [{
        profile: IProfile
    }]
}
export interface IGalleryAggregation {
    activeGalleryCount: number
}
