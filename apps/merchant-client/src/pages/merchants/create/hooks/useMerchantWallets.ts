import { useCreateMerchantWalletMutation } from '@poluspay-frontend/merchant-query';
import { notify } from '@poluspay-frontend/ui';
import { blockchainList } from 'apps/merchant-client/src/components/ui/Wallets/wallet-list';
import { Item } from 'apps/merchant-client/src/components/ui/Wallets/wallet-list';
import { useEffect, useState } from 'react';
import { Blockchain } from 'tools';

export const useMerchantWallets = () => {
    const [selectedWallets, setSelectedWallets] = useState<Item[]>([]);
    const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain>();
    const [modalWalletVisible, setModalWalletVisible] = useState(false);
    const [modalBlockchainVisible, setModalBlockchainVisible] = useState(false);
    const [isCreateMerchantWalletLoading, setIsCreateMerchantWalletLoading] =
        useState(false);
    const [createMerchantWallet] = useCreateMerchantWalletMutation();
    const [merchantId, setMerchantId] = useState<string>();

    const onImportWallet = async (address: string, evm?: boolean) => {
        try {
            if (!merchantId) throw new Error('Merchant id is not defined');
            if (!selectedBlockchain)
                throw new Error('Blockchain is not defined');
            setIsCreateMerchantWalletLoading(true);
            const network: Blockchain[] = evm
                ? ['bsc', 'polygon', 'ethereum', 'arbitrum', 'optimism']
                : [selectedBlockchain];
            await createMerchantWallet({
                merchant_id: merchantId,
                address,
                network,
            }).unwrap();
        } catch (error) {
            notify({
                status: 'error',
                title: 'Error',
                description:
                    'An error has occurred while creating the wallet. Please try again later.',
            });
            console.error(error);
        } finally {
            setIsCreateMerchantWalletLoading(false);
            setModalWalletVisible(false);
        }
    };

    useEffect(() => {
        if (selectedBlockchain) {
            setModalBlockchainVisible(false);
            setModalWalletVisible(true);
        }
    }, [selectedBlockchain]);

    const handleBlockchainSelect = (item: Blockchain) => {
        setSelectedBlockchain(item);
    };

    const handleWalletSelect = (item: Item) => {
        // TODO: delete this in the future
        if (item.type === 'blockchain') {
            const chain = blockchainList.find((el) => el.id === item.id);
            if (chain) {
                handleBlockchainSelect(chain.label);
                return;
            }
        }
        const el = selectedWallets.find((el) => el.id === item.id);
        if (el) {
            setSelectedWallets(
                selectedWallets.filter((el) => el.id !== item.id)
            );
        } else {
            setSelectedWallets([...selectedWallets, item]);
        }
    };

    const onCloseWalletModal = () => {
        if (selectedWallets.length)
            setSelectedWallets(selectedWallets.slice(0, -1));
        setModalWalletVisible(false);
    };

    const onCloseBlockchainModal = () => {
        if (selectedBlockchain) setSelectedBlockchain(undefined);
        setModalBlockchainVisible(false);
    };

    useEffect(() => {
        if (selectedWallets.length) {
            const item = selectedWallets.pop();
            if (!item) return;
            if (item.type === 'wallet') {
                setModalBlockchainVisible(true);
            } else {
                setModalWalletVisible(true);
            }
        }
    }, [selectedWallets]);

    return {
        selectedWallets,
        selectedBlockchain,
        handleWalletSelect,
        modalWalletVisible,
        modalBlockchainVisible,
        onCloseWalletModal,
        onCloseBlockchainModal,
        handleBlockchainSelect,
        onImportWallet,
        isCreateMerchantWalletLoading,
        setMerchantId,
        merchantId,
    };
};
