export type TTag = {
    _id?: string;
    name?: string;
    color?: string;
}

export type TTagResponse = {
    status:  number;
    message: string;
    error: string;
    data: any;
}