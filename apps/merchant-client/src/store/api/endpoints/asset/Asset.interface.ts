import { Asset_t, Blockchain_t } from "../../types";

export type IAssetsResponse = {
    [key in Asset_t]: {
        [key in Blockchain_t]: {
            is_native: boolean;
            contract: string;
            decimals: number;
            is_seeded_amount: boolean;
            available_for_accept: boolean;
        };
    };
};
