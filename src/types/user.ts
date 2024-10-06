export type TRegisterUser = {
    email: string;
    password: string;
    confirmation_password?: string;
    otp_code?: string;
    otp_expiration?: Date;
    is_verified?: boolean;
}

export type TRegisterResponse = {
    message: string;
    error: string;
    status: number;
}