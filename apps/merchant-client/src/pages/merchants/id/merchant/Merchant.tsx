import { MerchantProfileAlerts } from '../../../../components/pages/merchants/id/merchant/Alerts';
import { MerchantProfileForm } from '../../../../components/pages/merchants/id/merchant/Form/Form';

import './Merchant.scoped.scss';

export const MerchantProfilePage: React.FC = () => {
    return (
        <div className="profile">
            <MerchantProfileAlerts />
            <MerchantProfileForm />
        </div>
    );
};
