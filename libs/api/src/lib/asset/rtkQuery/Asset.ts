import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {AssetHelper} from "../AssetHelper";
import { IAssetsResponseFromApi } from "../asset.interface";
import {IAssetsResponse} from "./AssetResponse.interface";


export const createAssetApi = (baseUrl: string, isMerchant = false) => {
  return createApi({
    reducerPath: 'assetApi' as const,
    baseQuery: fetchBaseQuery({
      baseUrl: baseUrl + 'public',
    }),
    endpoints: (builder) => ({
      getAssets: builder.query<IAssetsResponse, void>({
        query: () => ({
          url: `payment.assets.get`,
          method: 'POST',
        }),
        transformResponse: (response: IAssetsResponseFromApi) => {
          return AssetHelper(response, isMerchant);
        },
      }),
    }),
  });
};
