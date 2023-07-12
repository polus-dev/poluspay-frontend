export interface IAsset {
    categories: string[] | null;
    networks: {
        [chain: string]: {
            is_native: boolean;
            contract: `0x${string}`;
            decimals: number;
            min_amount: string;
            is_seeded_amount: boolean;
            available_for_accept: boolean;
        };
    };
}

export interface IAssetsResponseFromApi {
    [asset: string]: IAsset;
}
