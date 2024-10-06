export type TRegisterUser = {
    id?: number;
    email?: string;
    password?: string;
    confirmation_password?: string;
    otp_code?: string;
    otp_expiration?: Date;
    is_verified?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export type TRegisterResponse = {
    message: string;
    error: string;
    status: number;
}