import { useEffect, useState } from 'react';
import { useGetAssetsQuery } from '../../../store/api/endpoints/asset/Asset';
import {
    Asset_t,
    Blockchain_t,
    WrappedToken,
} from '../../../store/api/endpoints/types';
import { useAppSelector } from '../../../store/hooks';
import { AssetRepresentation } from '@poluspay-frontend/api';

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

    useEffect(() => {
        if (assets && currentBlockchain) {
            setAvailableTokens(assets.getAssetsByNetwork(currentBlockchain));
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
