import { ResponseApiCode } from './responseApiCode';
import { RootState } from '../store';

export interface ApiConfig {
    state: RootState;
}

export interface IPagination {
    offset?: number;
    limit?: number;
}

export interface IResponseApiDefault {
    code: ResponseApiCode;
    message: string;
    field?: string;
}
export type IResponseError = IResponseApiDefault;
