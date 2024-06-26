import { useRef } from 'react';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getBeginningOfDate } from '@poluspay-frontend/utils';
import { useMerchantStatistics } from '../../../../hooks/dashboard/useMerchantStatistics';
import { useMerchantOptions } from '../../../../hooks/dashboard/useMerchantOptions';

import { PSelect } from '@poluspay-frontend/ui';
import { DashboardStatsElement } from './StatsElement/StatsElement';

import './Stats.scoped.scss';

interface StatsBlockProps {
    merchantId?: string;
    fromData: string;
    toData: string;
}

const StatsBlock = (props: StatsBlockProps) => {
    const [animateRef] = useAutoAnimate();
    const { staticsBlock } = useMerchantStatistics({
        merchantId: props.merchantId,
        fromData: props.fromData,
        toData: props.toData,
    });

    return (
        <div ref={animateRef} className="stats__container">
            {staticsBlock?.map((el) => (
                <div className="stats__container-item" key={el.id}>
                    <DashboardStatsElement item={el} />
                </div>
            ))}
        </div>
    );
};

interface DashboardStatsProps {
    merchantOptions: any;
    setMerchantOptions: any;
}

export const DashboardStats = (props: DashboardStatsProps) => {
    const { selectedMerchant, setSelectedMerchant, merchantsAmount } =
        useMerchantOptions({ setMerchantsOptions: props.setMerchantOptions });

    const toDate = useRef(new Date().toISOString());

    return (
        <div className="stats">
            <div className="stats__header">
                <h6 className="stats__header-title">Dashboard total</h6>
                <div className="stats__header-select">
                    <PSelect
                        placeholder={
                            merchantsAmount < 0
                                ? `Loading...`
                                : merchantsAmount > 0
                                ? ``
                                : 'No Merchants'
                        }
                        options={props.merchantOptions}
                        active={selectedMerchant ? [selectedMerchant] : []}
                        disabled={!merchantsAmount}
                        onChange={(value) => setSelectedMerchant(value[0])}
                    />
                </div>
            </div>
            <StatsBlock
                merchantId={selectedMerchant?.id}
                toData={toDate.current}
                fromData={getBeginningOfDate('month').toISOString()}
            />
        </div>
    );
};
