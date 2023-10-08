export interface IPagination {
    offset?: number;
    limit?: number;
}

export interface IResponseApiDefault {
    code: number;
    message: string;
    field?: string;
}

export type IResponseError = IResponseApiDefault;
