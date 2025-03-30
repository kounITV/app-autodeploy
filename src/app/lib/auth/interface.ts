import { type AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import { type Role } from "src/app/setting/interface";

interface IUserOffice {
    officeId: number;
}
interface BaseUser {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    email: string;
    role: Role;
    officeId: number;
    userOffice: IUserOffice[]
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    user: BaseUser;
    accessToken: string;
    refreshToken: string;
}

export interface CustomUser extends BaseUser {
    accessToken: string;
    refreshToken: string;
}

export interface AuthorizationResult {
    authorized: boolean;
    message?: string;
}

export interface SessionUser extends AdapterUser, BaseUser {
    accessToken: string;
    refreshToken: string;
    iat: number;
}

export interface CustomJWT extends JWT {
    user?: SessionUser;
    iat?: number;
    exp?: number;
}