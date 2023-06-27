import { ReactComponent as IconWarning } from '../../../../../assets/icons/warning.svg'
import { ReactComponent as IconArrow } from '../../../../../assets/icons/arrow.svg'

import './Alerts.scoped.scss'

const MerchantProfileAlerts: React.FC = () => {
    return (
        <div className="alerts">
            {/* add condition if brand is noy confirmed */}
            <div className="alerts__item">
                <div className="alerts__item-inner">
                    <IconWarning className="alerts__item-icon" />
                    <p className="alerts__item-text">
                        Confirm brand
                    </p>
                </div>
                <IconArrow className="alerts__item-icon alerts__item-icon--arrow" />
            </div>
            {/* add condition if domain is not confirmed */}
            <div className="alerts__item">
                <div className="alerts__item-inner">
                    <IconWarning className="alerts__item-icon" />
                    <p className="alerts__item-text">
                        Confirm domain
                    </p>
                </div>
                <IconArrow className="alerts__item-icon alerts__item-icon--arrow" />
            </div>
        </div>
    )
}

export default MerchantProfileAlerts
