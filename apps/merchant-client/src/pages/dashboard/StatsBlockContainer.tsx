import { DashboardStatsBlock } from '../../components/pages/dashboard/StatsBlock/StatsBlock';
import { useMerchantStatistics } from './hooks/useMerchantStatistics';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { getBeginningOfDate } from 'tools/index';

import './Dashboard.scoped.scss';
import { useMerchantOptions } from './hooks/useMerchantOptions';
import { PSelect } from '@poluspay-frontend/ui';

interface StatsBlockProps {
    merchantId: string;
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
        <div ref={animateRef} className="dashboard__stats-container">
            {staticsBlock?.map((el) => (
                <div className="dashboard__stats-container-item" key={el.id}>
                    <DashboardStatsBlock item={el} />
                </div>
            ))}
        </div>
    );
};

export const StatsBlockContainer = () => {
    const { merchantsOptions, selectedMerchant, setSelectedMerchant } =
        useMerchantOptions();
    return (
        <div className="dashboard__stats">
            <div className="dashboard__stats-header">
                <h6 className="dashboard__stats-header-title">
                    Dashboard total
                </h6>
                <div className="dashboard__stats-header-select">
                    <PSelect
                        options={merchantsOptions}
                        active={selectedMerchant ? [selectedMerchant] : []}
                        onChange={(value) => setSelectedMerchant(value[0])}
                    />
                </div>
            </div>
            {selectedMerchant && (
                <StatsBlock
                    merchantId={selectedMerchant.id}
                    toData={new Date().toISOString()}
                    fromData={getBeginningOfDate('month').toISOString()}
                />
            )}
        </div>
    );
};
