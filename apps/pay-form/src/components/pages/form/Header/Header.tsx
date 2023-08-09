import { IPaymentMerchant } from '@poluspay-frontend/api';
import { displayMerchantInfo } from '../../../../utils/displayMerchantInfo';

import { ReactComponent as IconVerified } from '../../../../assets/icons/verified.svg';

import './Header.scoped.scss';

export interface FormHeaderProps {
    merchant: IPaymentMerchant
    payment: {
        description: string;
        amount: string;
        currency: string;
    };
}

export const FormHeader: React.FC<FormHeaderProps> = ({ ...props }) => {
    return (
        <div className="header">
            {props.merchant.logo && <div className="header__avatar">
                <img
                    className="header__avatar-image"
                    src={props.merchant.logo}
                    alt="Merchant avatar"
                />
            </div> }
            <div className="header__data">
                <div className="header__data-topline">
                    {props.merchant.verified_at ? (
                        <div className="header__data-topline-brand">
                            {displayMerchantInfo(props.merchant)}
                            <IconVerified className="header__data-topline-brand-icon" />
                        </div>
                    ) : (
                        <p className="header__data-topline-website">
                            {displayMerchantInfo(props.merchant)}
                        </p>
                    )}
                    <p className="header__data-topline-value">
                        Total:&nbsp;
                        <span className="header__data-topline-value header__data-topline-value--highlight">
                            {props.payment.amount} {props.payment.currency}
                        </span>
                    </p>
                </div>
                <p className="header__data-description">
                    {props.payment.description}
                </p>
            </div>
        </div>
    );
};
