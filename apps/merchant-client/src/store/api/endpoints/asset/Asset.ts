import { IAssetsResponseFromApi } from '@poluspay-frontend/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
            transformResponse: (response: IAssetsResponseFromApi) => {
                const result: IAssetsResponse = {
                    categories: [{ name: 'unknown', value: [] }],
                    decimals: {},
                    assets: [],
                };

                Object.keys(response).forEach((asset) => {
                    const assetObj = response[asset];
                    if (assetObj.categories) {
                        assetObj.categories.forEach((category) => {
                            const categoryObj = result.categories.find(
                                (cat) => cat.name === category
                            );
                            if (categoryObj) {
                                categoryObj.value.push(asset);
                            } else {
                                result.categories.push({
                                    name: category,
                                    value: [asset],
                                });
                            }
                        });
                    } else {
                        result.categories[0].value.push(asset);
                    }
                    Object.keys(assetObj.networks).forEach((network) => {
                        result.decimals[network] = {
                            [asset]: assetObj.networks[network].decimals,
                        };
                    });

                    // new code
                    if (
                        assetObj.networks[Object.keys(assetObj.networks)[0]]
                            .available_for_accept
                    ) {
                        // @ts-ignore
                        const newAsset: (typeof result.assets)[number] = {
                            category: [],
                        };

                        for (const assetObjKey in assetObj.categories) {
                            newAsset.category.push(assetObjKey);
                        }
                        newAsset.name = asset;
                        newAsset.meta = assetObj;
                        result.assets.push(newAsset);
                    }
                });
                return result;
            },
        }),
    }),
});

export const { useGetAssetsQuery } = assetApi;
