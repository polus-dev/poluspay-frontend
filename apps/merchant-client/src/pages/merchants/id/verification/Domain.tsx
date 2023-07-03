import { useEffect, useState } from 'react';

import { MerchantDomainSelection } from 'apps/merchant-client/src/components/pages/merchants/id/verification/Selection';
import { ProgressBar } from 'apps/merchant-client/src/components/ui/ProgressBar/ProgressBar';

import './Domain.scoped.scss';
import { MerchantDomainForm } from 'apps/merchant-client/src/components/pages/merchants/id/verification/Form';

export type DomainVerification = 'dns' | 'html' | 'file' | 'server';

export const MerchantDomainPage: React.FC = () => {
    const [stage, setStage] = useState(0);
    const [type, setType] = useState<DomainVerification | null>(null);

    const progressOptions = [
        { id: 0, title: 'Make a selection' },
        { id: 1, title: 'Verification' },
    ];

    const handleStageTypeChange = (type: DomainVerification) => {
        setStage(1);

        setType(type);
    };

    useEffect(() => {
        console.log(type);
    }, [type]);

    return (
        <div className="domain">
            <div className="domain__progress">
                <ProgressBar current={stage} options={progressOptions} />
            </div>
            {stage === 0 ? (
                <div className="domain__selection">
                    <MerchantDomainSelection
                        onSelect={(type) => handleStageTypeChange(type)}
                    />
                </div>
            ) : (
                <div className="domain__form">
                    <MerchantDomainForm type={type} />
                </div>
            )}
        </div>
    );
};