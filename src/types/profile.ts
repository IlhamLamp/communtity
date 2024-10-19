import { TRoleUser } from "./role";

export type TProfileUser = {
    _id?: string;
    user_id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    phone?: number;
    birthday?: Date;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip_code?: number
    };
    profile_picture?: string;
    profile_cover?: string;
    role?: TRoleUser;
    tags?: [];
    about?: string;
    social_links?: [];
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export type TProfileLoggedInResponse = {
    status: number;
    message: string;
    data?: TProfileUser;
    error?: string;
    statusCode?: number;
}