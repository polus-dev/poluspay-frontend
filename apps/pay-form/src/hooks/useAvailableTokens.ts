import { useEffect, useState } from 'react';

import { AssetRepresentation } from '@poluspay-frontend/api';
import { useAppSelector } from '../store/hooks';
import { useGetAssetsQuery } from '@poluspay-frontend/merchant-query';

export const useAvailableTokens = () => {
    const [availableTokens, setAvailableTokens] = useState<
        AssetRepresentation[]
    >([]);
    const [availableCategories, setAvailableCategories] = useState<string[]>(
        []
    );

    const currentBlockchain = useAppSelector(
        (state) => state.connection.currentBlockchain
    );
    const { data: assets, isLoading } = useGetAssetsQuery();

    const tokensToExclude = [
        'shilld'
    ]

    useEffect(() => {
        if (assets && currentBlockchain) {
            const filtered = assets
                .getAssetsByNetwork(currentBlockchain)
                .filter(asset => !tokensToExclude.includes(asset.name))

            setAvailableTokens(filtered);

            // TODO: make normal categories
            setAvailableCategories(
                Array.from(
                    new Set(
                        assets
                            .getAssetsByNetwork(currentBlockchain)
                            .map((el) => el.categories)
                            .flat()
                    )
                ).slice(1)
            );
        }
    }, [currentBlockchain, assets]);
    return {
        availableTokens,
        isAvailableTokensLoading: isLoading,
        availableCategories,
    };
};
