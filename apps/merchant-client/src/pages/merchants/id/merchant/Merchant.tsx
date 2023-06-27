import MerchantProfileAlerts from '../../../../components/pages/merchants/id/merchant/Alerts'
import MerchantProfileForm from '../../../../components/pages/merchants/id/merchant/Form'

import './Merchant.scoped.scss';

const MerchantIDProfile: React.FC = () => {
    return (
        <div className="profile">
            <MerchantProfileAlerts />
            <MerchantProfileForm />
        </div>
    )
}

export default MerchantIDProfile
