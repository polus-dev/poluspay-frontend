import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as IconWarning } from '../../../../../assets/icons/warning.svg';
import { ReactComponent as IconArrow } from '../../../../../assets/icons/arrow.svg';

import './Alerts.scoped.scss';
import { useGetMerchantByIdQuery } from '@poluspay-frontend/merchant-query';

export const MerchantProfileAlerts: React.FC = () => {
    const navigate = useNavigate();

    const { id: merchantId } = useParams<{ id: string }>();

    if (!merchantId) {
        return <></>;
    }

    const { data: merchant } = useGetMerchantByIdQuery({
        merchant_id: merchantId,
    });

    return (
        <div className="alerts">
            {/* add condition if brand is noy confirmed */}
            <div
                className="alerts__item"
                onClick={() => navigate(`/merchants/${merchantId}/brand`)}
            >
                <div className="alerts__item-inner">
                    <IconWarning className="alerts__item-icon" />
                    <p className="alerts__item-text">Confirm brand</p>
                </div>
                <IconArrow className="alerts__item-icon alerts__item-icon--arrow" />
            </div>
            {merchant?.is_domain_confirmed === false && (
                <div
                    className="alerts__item"
                    onClick={() => navigate(`/merchants/${merchantId}/domain`)}
                >
                    <div className="alerts__item-inner">
                        <IconWarning className="alerts__item-icon" />
                        <p className="alerts__item-text">Confirm domain</p>
                    </div>
                    <IconArrow className="alerts__item-icon alerts__item-icon--arrow" />
                </div>
            )}
        </div>
    );
};
