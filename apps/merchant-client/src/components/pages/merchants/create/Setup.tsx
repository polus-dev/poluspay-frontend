import { ReactComponent as IconArrow } from '../../../../assets/icons/arrow.svg';
import { ReactComponent as LogoShopify } from '../../../../assets/logos/plugins/shopify.svg';
import { ReactComponent as LogoWooCommerce } from '../../../../assets/logos/plugins/woo-commerce.svg';
import { ReactComponent as LogoTilda } from '../../../../assets/logos/plugins/tilda.svg';

import './Setup.scoped.scss';

interface SetupProps {
    changeStage: (type: string) => void;
}

export const MerchantSetup: React.FC<SetupProps> = ({ changeStage }) => {
    const handleLinkClick = (event: React.MouseEvent) => {
        event.stopPropagation();

        window.open('https://t.me/poluspay_bot', '_blank');
    };

    return (
        <div className="setup">
            <div className="setup__inner">
                <h4 className="setup__inner-title">
                    Let's set up your account
                </h4>
                <div
                    className="setup__inner-block"
                    onClick={() => changeStage('personal')}
                >
                    <div className="setup__inner-block-headline">
                        <h6 className="setup__inner-block-headline-title">
                            Personal
                        </h6>
                        <IconArrow className="setup__inner-block-headline-icon" />
                    </div>
                    <p className="setup__inner-block-description">
                        Create invoices via web panel or use our API to
                        integrate Polus Payments into your website
                    </p>
                </div>
                <div className="setup__inner-block" onClick={handleLinkClick}>
                    <div className="setup__inner-block-headline">
                        <h6 className="setup__inner-block-headline-title">
                            Telegram bot
                        </h6>
                        <IconArrow className="setup__inner-block-headline-icon" />
                    </div>
                    <p className="setup__inner-block-description">
                        Use our&nbsp;
                        <span
                            className="setup__inner-block-description setup__inner-block-description--link"
                            onClick={handleLinkClick}
                        >
                            telegram bot
                        </span>
                        &nbsp;to easily create invoices
                    </p>
                </div>
                <div className="setup__inner-block">
                    <div className="setup__inner-block-headline">
                        <h6 className="setup__inner-block-headline-title">
                            Plugins
                        </h6>
                        <div className="setup__inner-block-headline-label">
                            Soon
                        </div>
                    </div>
                    <p className="setup__inner-block-description">
                        Use our developers tools
                    </p>
                    <div className="setup__inner-block-tabs">
                        <div className="setup__inner-block-tabs__item">
                            <LogoShopify className="setup__inner-block-tabs__item-icon" />
                            Shopify
                        </div>
                        <div className="setup__inner-block-tabs__item">
                            <LogoWooCommerce className="setup__inner-block-tabs__item-icon" />
                            WooCommerce
                        </div>
                        <div className="setup__inner-block-tabs__item">
                            <LogoTilda className="setup__inner-block-tabs__item-icon" />
                            Tilda
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
