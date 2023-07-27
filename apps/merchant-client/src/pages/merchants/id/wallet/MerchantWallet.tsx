import { MerchantWallets } from '../../../../components/ui/Wallets/Wallets';
import { useMerchantWallets } from '../../create/hooks/useMerchantWallets';
import { useGetMerchantIdFromParams } from '../../../../hooks/useGetMerchantId';
import { ModalBlockChainSelector } from '@poluspay-frontend/ui';
import { blockchainList } from '@poluspay-frontend/ui';
import { ModalWalletAddition } from '../../../../components/modals/WalletAddition/WalletAddition';
import { isEVMBlockchain } from '../../../../../../../tools';

export const MerchantWalletPage: React.FC = () => {
    const merchantId = useGetMerchantIdFromParams();
    const {
        modalBlockchainVisible,
        modalWalletVisible,
        selectedWallets,
        selectedBlockchain,
        handleSelect,
        handleBlockchainSelect,
        onCloseWalletModal,
        onCloseBlockchainModal,
        onImportWallet,
        isCreateMerchantWalletLoading,
        next,
    } = useMerchantWallets({ merchantId });

    return (
        <>
            <div className="wallet">
                <MerchantWallets
                    next={() => {}}
                    selectedBlockchain={selectedBlockchain}
                    merchantId={merchantId!}
                    selectedWallet={selectedWallets}
                    handleSelect={handleSelect}
                    buttonDisabled={
                        !(selectedBlockchain || selectedWallets) ||
                        modalWalletVisible ||
                        modalBlockchainVisible
                    }
                />
            </div>
            <ModalBlockChainSelector
                next={next}
                hasSearch
                visible={modalBlockchainVisible}
                options={blockchainList}
                selected={selectedBlockchain}
                onClose={() => onCloseBlockchainModal()}
                setSelected={handleBlockchainSelect}
            />
            <ModalWalletAddition
                isLoading={isCreateMerchantWalletLoading}
                visible={modalWalletVisible}
                selectedBlockchain={selectedBlockchain}
                isEvmChain={isEVMBlockchain(selectedBlockchain?.label!)}
                onClose={() => onCloseWalletModal()}
                onImport={onImportWallet}
            />
        </>
    );
};
