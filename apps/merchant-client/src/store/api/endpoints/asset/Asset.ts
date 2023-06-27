import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Asset_t, Blockchain_t } from '../../types';
import { IAssetsResponse } from './Asset.interface';

export const assetApi = createApi({
  reducerPath: 'assetApi' as const,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL + 'public',
  }),
  endpoints: (builder) => ({
    getAssets: builder.query<IAssetsResponse, void>({
      query: () => ({
        url: `payment.assets.get`,
        method: 'POST',
      }),
      transformResponse(response: IAssetsResponse) {
        const assetsNames = Object.keys(response) as Asset_t[];
        const assets = assetsNames.filter(
          (asset) =>
            response[asset].networks[
              Object.keys(
                response[asset].networks
              )[0] as Blockchain_t
            ].available_for_accept
        );
        const r = {};
        for (const asset in response) {
          if (!assets.includes(asset as Asset_t)) {
            delete response[asset as Asset_t];
          }
          if (response[asset as Asset_t]) {
            r[asset as Asset_t] =
              response[asset as Asset_t].networks;
          }
        }
        debugger;
        return r as IAssetsResponse;
      },
    }),
  }),
});
export const { useGetAssetsQuery } = assetApi;
