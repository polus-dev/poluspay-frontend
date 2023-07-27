import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useModal } from '@poluspay-frontend/hooks';

import { ModalBlockChainSelector } from '@poluspay-frontend/ui';
import { MerchantForm } from '../../../components/pages/merchants/create/Form';
import { MerchantSetup } from '../../../components/pages/merchants/create/Setup';
import { MerchantWallets } from '../../../components/ui/Wallets/Wallets';
import { ProgressBar } from '../../../components/ui/ProgressBar/ProgressBar';
import { ModalWalletAddition } from '../../../components/modals/WalletAddition/WalletAddition';

import './MerchantsCreate.scoped.scss';

import { blockchainList } from '@poluspay-frontend/ui';
import { useMerchantWallets } from './hooks/useMerchantWallets';
import { isEVMBlockchain } from 'tools';

export const MerchantsCreatePage: React.FC = () => {
    const navigator = useNavigate();
    const [type, setType] = useState<string | null>('personal');
    const [stage, setStage] = useState(0);
    const [merchantId, setMerchantId] = useState<string | null>(null);
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
      merchantWalletConnected
    } = useMerchantWallets({ merchantId });

    const modalBlockchain = useModal();

    const progressOptions = [
        { id: 0, title: 'Make a selection' },
        { id: 1, title: 'Merchant information' },
        { id: 2, title: 'Add wallets' },
    ];

    const handleStageTypeChange = (typeC?: string) => {
        if (typeC && type !== typeC) setType(typeC);

        setStage(stage + 1);
    };

    const onFinishRegistration = () => {
        navigator('/merchants');
    };

    return (
        <div className="merchants">
            <div className="merchants__progress">
                <ProgressBar current={stage} options={progressOptions} />
            </div>
            <div className="merchants__inner">
                {stage === 0 && (
                    <div className="merchants__inner-setup">
                        <MerchantSetup
                            changeStage={(typeC) =>
                                handleStageTypeChange(typeC)
                            }
                        />
                    </div>
                )}

                {type === 'personal' && stage === 1 && (
                    <div className="merchants__inner-form">
                        <MerchantForm
                            setMerchantId={setMerchantId}
                            changeStage={handleStageTypeChange}
                        />
                    </div>
                )}
                {type === 'personal' && stage === 2 && (
                    <div className="merchants__inner-wallet">
                        <MerchantWallets
                            next={onFinishRegistration}
                            isRegistration
                            selectedBlockchain={selectedBlockchain}
                            merchantId={merchantId!}
                            selectedWallet={selectedWallets}
                            handleSelect={handleSelect}
                            walletConnected={merchantWalletConnected}
                            buttonDisabled={
                                !merchantWalletConnected.length||
                                modalWalletVisible ||
                                modalBlockchainVisible
                            }
                        />
                    </div>
                )}
            </div>
            <ModalBlockChainSelector
                next={next}
                hasSearch
                visible={modalBlockchainVisible}
                options={blockchainList}
                selected={selectedBlockchain}
                onClose={onCloseBlockchainModal}
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
        </div>
    );
};
