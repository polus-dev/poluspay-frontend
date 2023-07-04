import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useModal } from 'apps/merchant-client/src/hooks/useModal';

import { MerchantForm } from '../../../components/pages/merchants/create/Form';
import { MerchantSetup } from '../../../components/pages/merchants/create/Setup';
import { MerchantWallets } from '../../../components/ui/Wallets/Wallets';
import { ProgressBar } from '../../../components/ui/ProgressBar/ProgressBar';
import { ModalBlockChainSelector } from '../../../components/modals/BlockchainSelector/BlockchainSelector';

import './MerchantsCreate.scoped.scss';

import { connectedWalletList } from '../../../components/ui/Wallets/wallet-list';
import { ModalWalletAddition } from 'apps/merchant-client/src/components/modals/WalletAddition/WalletAddition';

export const MerchantsCreatePage: React.FC = () => {
    const navigator = useNavigate();
    const [type, setType] = useState<string | null>('personal');
    const [stage, setStage] = useState(2);
    const [selectedWallets, setSelectedWallets] = useState<string[]>([]);

    const [modalWalletVisible, setModalWalletVisible] = useState(false);
    const [modalBlockchainVisible, setModalBlockchainVisible] = useState(false);

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

    const handleButtonClick = () => {
        console.log('qwe');
    };

    const onFinishRegistation = () => {
        navigator('/merchants');
    };

    useEffect(() => {
        setType(null);
        setStage(0);
    }, []);

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
                        <MerchantForm changeStage={handleStageTypeChange} />
                    </div>
                )}
                {type === 'personal' && stage === 2 && (
                    <div className="merchants__inner-wallet">
                        <MerchantWallets
                            // isRegistation
                            onButtonClick={handleButtonClick}
                        />
                    </div>
                )}
            </div>
            <ModalBlockChainSelector
                hasSearch
                visible={modalBlockchainVisible}
                options={connectedWalletList}
                onApply={() => console.log('qwe')}
                onClose={() => console.log('close')}
            />
            <ModalWalletAddition
                visible={modalWalletVisible}
                onClose={() => console.log('close')}
                onImport={(address) => console.log(address)}
            />
        </div>
    );
};
