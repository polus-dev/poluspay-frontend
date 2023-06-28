import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MerchantForm } from '../../../components/pages/merchants/create/Form';
import { MerchantSetup } from '../../../components/pages/merchants/create/Setup';
import { MerchantWallet } from '../../../components/pages/merchants/create/Wallet';
import { ProgressBar } from '../../../components/ui/ProgressBar/ProgressBar';

import './MerchantsCreate.scoped.scss';

export const MerchantsCreatePage: React.FC = () => {
    const navigator = useNavigate();
    const [type, setType] = useState<string | null>(null);
    const [stage, setStage] = useState(0);

    const progressOptions = [
        { id: 0, title: 'Make a selection' },
        { id: 1, title: 'Make a selection' },
        { id: 2, title: 'Make a selection' },
    ];

    const handleStageTypeChange = (typeC?: string) => {
        if (typeC && type !== typeC) setType(typeC);

        setStage(stage + 1);
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
                        <MerchantWallet onComplete={onFinishRegistation} />
                    </div>
                )}
            </div>
        </div>
    );
};
