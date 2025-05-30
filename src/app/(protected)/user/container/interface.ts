/* eslint-disable @typescript-eslint/naming-convention */
import { type UseFormReset } from "react-hook-form";

export interface RoleLabels {
  STAFF: string;
  ADMIN: string;
  SUPER_ADMIN: string;
  FINANCE: string
  POLICE_OFFICER: string
  POLICE_COMMANDER: string
  POLICE_PRODUCTION: string
  VERSIFICATION_OFFICER: string
}

export interface IUser {
  id: number;
  phone: string;
  email: string | null;
  password: string;
  role: RoleLabels;
  firstName: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  index: number;
}

export interface IUserData {
  status: string;
  data: IUser
}
export interface FormValues {
  firstName: string;
  phone: string;
  email: string | null;
}

export interface UseFormResetProps {
  user: IUser | null;
  loading: boolean;
  formReset: UseFormReset<FormValues>;
}
