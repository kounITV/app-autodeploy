import { IProfile } from '../../profile/type';
import { IGallery } from '../gallery/type';
export interface IProfileGallery {
    no: number
    id: number
    profileId: number
    galleryId: number
    createdAt: string
    updatedAt: string
    profile: IProfile
    gallery: IGallery
}
export interface IProfileGalleryAggregation{
    activeGalleryCount: number
}