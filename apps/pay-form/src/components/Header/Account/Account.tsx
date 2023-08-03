import { PButton, PDropdown } from '@poluspay-frontend/ui';
import { HeaderAccountContent } from './Content/Content';
import { ReactComponent as LogoWalletConnect } from '../../../assets/logos/wallet-connect.svg';
import { ReactComponent as IconChevron } from '../../../assets/icons/chevron.svg';

import './Account.scoped.scss';

export const HeaderAccount: React.FC = () => {
    const connected = true;

    return (
        <div className="account">
            {!connected ? (
                <div className="account__button">
                    <PButton
                        wide
                        children={
                            <>
                                <LogoWalletConnect className="account__button-icon" />
                                <p>Connect Wallet</p>
                            </>
                        }
                        onClick={() => console.log('open web3modal')}
                    />
                </div>
            ) : (
                <div className="account__dropdown">
                    <PDropdown
                        border
                        align="right"
                        gap={12}
                        minWidth={220}
                        maxWidth={220}
                        handler={
                            <div className="account__dropdown-handler">
                                <div className="account__dropdown-handler__inner">
                                    <LogoWalletConnect className="account__dropdown-handler__inner-icon" />
                                    <p className="account__dropdown-handler__inner-text">
                                        0x12...1234
                                    </p>
                                </div>
                                <IconChevron className="account__dropdown-handler__icon" />
                            </div>
                        }
                        content={
                            <div className="account__dropdown-content">
                                <HeaderAccountContent />
                            </div>
                        }
                    />
                </div>
            )}
        </div>
    );
};
