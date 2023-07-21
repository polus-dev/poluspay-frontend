import {createAssetApi} from "@poluspay-frontend/api";
export const assetApi = createAssetApi(import.meta.env.VITE_REACT_APP_BASE_URL, true);
export const { useGetAssetsQuery } = assetApi;
