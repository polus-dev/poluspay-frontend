export interface IAssetsResponse {
    categories: { name: string; value: string[] }[];
    decimals: {
        [blockchain: string]: {
            [asset: string]: number;
        };
    };
}
