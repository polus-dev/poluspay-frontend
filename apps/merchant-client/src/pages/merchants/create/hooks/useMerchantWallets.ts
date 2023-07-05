import { Item } from 'apps/merchant-client/src/components/ui/Wallets/wallet-list';
import { useEffect, useState } from 'react';
import { Blockchain } from 'tools';

export const useMerchantWallets = () => {
    const [selectedWallets, setSelectedWallets] = useState<Item[]>([]);
    const [selectedBlockchain, setSelectedBlockchain] = useState<Blockchain>();
    const [modalWalletVisible, setModalWalletVisible] = useState(false);
    const [modalBlockchainVisible, setModalBlockchainVisible] = useState(false);
    const [importedWallets, setImportedWallets] = useState<{
        address: string;
        evm?: boolean;
    }>();

    const onImportWallet = (address: string, evm?: boolean) => {
        setImportedWallets({ address, evm });
    };

    useEffect(() => {
        if (selectedBlockchain) {
            setModalBlockchainVisible(false);
            setModalWalletVisible(true);
        }
    }, [selectedBlockchain]);

    const handleWalletSelect = (item: Item) => {
        const el = selectedWallets.find((el) => el.id === item.id);
        if (el) {
            setSelectedWallets(
                selectedWallets.filter((el) => el.id !== item.id)
            );
        } else {
            setSelectedWallets([...selectedWallets, item]);
        }
    };

    const handleBlockchainSelect = (item: Blockchain) => {
        setSelectedBlockchain(item);
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
    };
};
