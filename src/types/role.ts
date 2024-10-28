export type TRoleUser = {
    _id?: string;
    name?: string;
    description?: string;
    is_active?: boolean;
}

export type TRoleResponse = {
    status?:  number;
    message?: string;
    error?: string;
    data?: any;
}