import { type IProfile } from "../profile/type";

export interface IBlacklist {
  no: number;
  id: number;
  profileId: number;
  reason: string;
  blacklistedBy: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  profile: IProfile
}

export interface IBlacklistColumns {
  row: {
    getIsSelected: () => boolean;
    toggleSelected: (selected: boolean) => void;
    original?: IBlacklist;
  };
}
