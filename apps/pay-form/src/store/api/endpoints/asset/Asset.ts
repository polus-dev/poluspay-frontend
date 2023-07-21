import {createAssetApi} from "@poluspay-frontend/api";

export const assetApi = createAssetApi(import.meta.env.VITE_REACT_API_URL);
export const { useGetAssetsQuery } = assetApi;
