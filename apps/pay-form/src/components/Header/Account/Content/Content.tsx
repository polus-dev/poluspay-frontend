import { useCopyText } from '../../../../hooks/useCopyText';

import { ReactComponent as LogoWalletConnect } from '../../../../assets/logos/wallet-connect.svg';
import { ReactComponent as IconCopy } from '../../../../assets/icons/copy.svg';
import { ReactComponent as IconLogout } from '../../../../assets/icons/logout.svg';

import './Content.scoped.scss';

export const HeaderAccountContent: React.FC = () => {
    const copy = useCopyText();

    const address = '0x12...1234';

    return (
        <div className="account-content">
            <div className="account-content__data">
                <div className="account-content__data-inner">
                    <LogoWalletConnect className="account-content__data-inner-icon" />
                    <p className="account-content__data-inner-text">
                        {copy.copied ? 'Copied!' : address}
                    </p>
                </div>
                <IconCopy
                    className="account-content__data-icon"
                    onClick={() => copy.copy(address)}
                />
            </div>
            <div className="account-content__divider" />
            <div className="account-content__button">
                <p className="account-content__button-text">Disconnect</p>
                <IconLogout
                    className="account-content__button-icon"
                    onClick={() => console.log('logout')}
                />
            </div>
        </div>
    );
};
