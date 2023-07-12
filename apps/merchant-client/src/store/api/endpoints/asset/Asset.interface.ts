import { IAsset } from '@poluspay-frontend/api';

export interface IAssetsResponse {
    categories: { name: string; value: string[] }[];
    decimals: {
        [blockchain: string]: {
            [asset: string]: number;
        };
    };
    assets: { category: string[]; name: string; meta: IAsset }[];
}
