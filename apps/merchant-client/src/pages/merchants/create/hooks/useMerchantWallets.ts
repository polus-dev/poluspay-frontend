import { useCreateMerchantWalletMutation } from '@poluspay-frontend/merchant-query';
import { notify } from '@poluspay-frontend/ui';
import {
    BlockchainItem,
    blockchainList,
    exchangeList,
    list,
} from '@poluspay-frontend/ui';
import { Item } from '@poluspay-frontend/ui';
import { useEffect, useState } from 'react';
import { Blockchain } from 'tools';

interface IProps {
    merchantId: string | null;
}

// type Stage = 'blockchainSelect' | 'walletSelect' | 'walletImport';

export const useMerchantWallets = ({ merchantId }: IProps) => {
    const [selectedWallet, setSelectedWallet] = useState<Item>();
    const [selectedBlockchain, setSelectedBlockchain] =
        useState<BlockchainItem>();
    const [modalWalletVisible, setModalWalletVisible] = useState(false);
    const [modalBlockchainVisible, setModalBlockchainVisible] = useState(false);
    const [isCreateMerchantWalletLoading, setIsCreateMerchantWalletLoading] =
        useState(false);
    const [createMerchantWallet] = useCreateMerchantWalletMutation();
    const [merchantWalletConnected, setMerchantWalletConnected] = useState<
        number[]
    >([]);

    const next = (to?: string) => {
        const doNext = (t: string) => {
            if (t === 'blockchainSelect') {
                setModalBlockchainVisible(true);
                setModalWalletVisible(false);
            } else if (t === 'walletImport') {
                setModalBlockchainVisible(false);
                setModalWalletVisible(true);
            } else if (t === 'walletSelect') {
                setModalBlockchainVisible(false);
                setModalWalletVisible(false);
            }
        };
        if (to) {
            doNext(to);
        } else {
            if (selectedBlockchain && !selectedWallet) {
                doNext('walletImport');
            } else if (selectedWallet && !selectedBlockchain) {
                doNext('blockchainSelect');
            } else {
                throw new Error('Invalid state');
            }
        }
    };

    const onImportWallet = async (address: string, evm?: boolean) => {
        try {
            if (!merchantId) throw new Error('Merchant id is not defined');
            if (!selectedBlockchain)
                throw new Error('Blockchain is not defined');
            setIsCreateMerchantWalletLoading(true);
            const networks: Blockchain[] = evm
                ? ['bsc', 'polygon', 'ethereum', 'arbitrum', 'optimism']
                : [selectedBlockchain.label];
            await createMerchantWallet({
                merchant_id: merchantId,
                address,
                networks,
            }).unwrap();
            setMerchantWalletConnected([
                ...merchantWalletConnected,
                selectedBlockchain.id,
            ]);
        } catch (error) {
            console.error(error);
            setSelectedBlockchain(undefined);
        } finally {
            setIsCreateMerchantWalletLoading(false);
            setModalWalletVisible(false);
        }
    };

    const handleBlockchainSelect = (item: BlockchainItem) => {
        if (item.id === selectedBlockchain?.id) {
            setSelectedBlockchain(undefined);
        } else {
            setSelectedBlockchain(item);
            setSelectedWallet(undefined);
        }
    };

    const handleWalletSelect = (item: Item) => {
        if (item.id === selectedWallet?.id) {
            setSelectedWallet(undefined);
        } else {
            setSelectedWallet(item);
            setSelectedBlockchain(undefined);
        }
    };

    const handleSelect = (item: Item) => {
        if (item.type === 'blockchain') {
            const chain = blockchainList.find((el) => el.id === item.id);
            if (chain) {
                handleBlockchainSelect(chain);
            } else {
                notify({
                    status: 'error',
                    title: 'Error',
                    description: 'Blockchain not found',
                });
            }
        } else if (item.type === 'exchange') {
            const exchanger = exchangeList.find((el) => el.id === item.id);
            if (exchanger) {
                handleWalletSelect(exchanger);
            } else {
                notify({
                    status: 'error',
                    title: 'Error',
                    description: 'Exchanger not found',
                });
            }
        } else if (item.type === 'wallet') {
            const wallet = list.find((el) => el.id === item.id);
            if (wallet) {
                handleWalletSelect(wallet);
            } else {
                notify({
                    status: 'error',
                    title: 'Error',
                    description: 'Wallet not found',
                });
            }
        }
    };

    const onCloseWalletModal = () => {
        setSelectedWallet(undefined);
        setSelectedBlockchain(undefined);
        setModalWalletVisible(false);
    };

    const onCloseBlockchainModal = () => {
        if (selectedBlockchain) setSelectedBlockchain(undefined);
        setModalBlockchainVisible(false);
    };

    useEffect(() => {
        if (selectedBlockchain && !selectedWallet) {
            next('walletImport');
        } else if (selectedWallet && !selectedBlockchain) {
            next('blockchainSelect');
        }
    }, [selectedWallet, selectedBlockchain]);
    useEffect(() => {
        console.log(selectedWallet, selectedBlockchain);
    }, [selectedWallet, selectedBlockchain]);

    return {
        selectedWallets: selectedWallet,
        selectedBlockchain,
        handleSelect,
        modalWalletVisible,
        modalBlockchainVisible,
        onCloseWalletModal,
        onCloseBlockchainModal,
        handleBlockchainSelect,
        onImportWallet,
        isCreateMerchantWalletLoading,
        next,
        merchantWalletConnected,
    };
};
