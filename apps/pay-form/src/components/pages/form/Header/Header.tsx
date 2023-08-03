import { ReactComponent as IconVerified } from '../../../../assets/icons/verified.svg';

import './Header.scoped.scss';

export const FormHeader: React.FC = () => {
    const brandConfirmed = true;

    return (
        <div className="header">
            <div className="header__avatar">
                <img
                    className="header__avatar-image"
                    src="/images/polygon.png"
                    alt="Merchant avatar"
                />
            </div>
            <div className="header__data">
                <div className="header__data-topline">
                    {brandConfirmed ? (
                        <div className="header__data-topline-brand">
                            Brand name
                            <IconVerified className="header__data-topline-brand-icon" />
                        </div>
                    ) : (
                        <p className="header__data-topline-website">
                            example.com
                        </p>
                    )}
                    <p className="header__data-topline-value">
                        Total:&nbsp;
                        <span className="header__data-topline-value header__data-topline-value--highlight">
                            123.123 USDT
                        </span>
                    </p>
                </div>
                <p className="header__data-description">Payment description</p>
            </div>
        </div>
    );
};
