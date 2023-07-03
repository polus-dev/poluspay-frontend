import { useNavigate } from 'react-router';

import { ReactComponent as IconWarning } from '../../../../../assets/icons/warning.svg';
import { ReactComponent as IconArrow } from '../../../../../assets/icons/arrow.svg';

import './Alerts.scoped.scss';

export const MerchantProfileAlerts: React.FC = () => {
    const navigate = useNavigate()

    const merchantId = '123'

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
            {/* add condition if domain is not confirmed */}
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
        </div>
    );
};
