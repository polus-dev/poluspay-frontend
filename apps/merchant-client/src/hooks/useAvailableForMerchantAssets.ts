import {
    useGetAssetsQuery,
    useGetMerchantWalletQuery,
} from '@poluspay-frontend/merchant-query';
import { useEffect, useState } from 'react';
import { IAssetsResponse } from '../store/api/endpoints/asset/Asset.interface';
import { blockchainList } from '../components/ui/Wallets/wallet-list';
import { Blockchain } from '../../../../tools';

export const useAvailableForMerchantAssets = (merchantId: string) => {
    const [assets, setAssets] = useState<IAssetsResponse>();
    const [availableNetworks, setAvailableNetworks] = useState<Blockchain[]>(
        []
    );

    const { data } = useGetAssetsQuery();
    const { data: merchantWallets } = useGetMerchantWalletQuery({
        merchant_id: merchantId,
    });

    useEffect(() => {
        if (data && merchantWallets) {
            const result = structuredClone(data);
            result.assets = [];
            let availableNetworks = merchantWallets.map(
                (wallet) => wallet.network
            );

            for (const asset of data.assets) {
                for (const chain of asset.blockchains) {
                    if (availableNetworks.includes(chain)) {
                        result.assets.push(asset);
                    } else {
                        availableNetworks = availableNetworks.filter(
                            (v) => v !== chain
                        );
                    }
                }
            }
            result.assets = [...new Set(result.assets)];
            setAssets(result);
            const av = [];
            for (const chain of blockchainList) {
                if (availableNetworks.includes(chain.label)) {
                    av.push(chain);
                }
            }
            setAvailableNetworks(av);
        }
    }, [merchantWallets, data]);
    return { assets, availableNetworks };
};
