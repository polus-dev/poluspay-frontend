import PDropdown from '../../ui/PDropdown/PDropdown';
import { ReactComponent as IconChevron } from '../../../assets/icons/chevron.svg';
import { ReactComponent as IconWallet } from '../../../assets/icons/wallet.svg';
import { ReactComponent as IconLogout } from '../../../assets/icons/logout.svg';

import './Account.scoped.scss';

interface IAccountProps {
    username: string;
    logout: () => void;
}

const Account: React.FC<IAccountProps> = (props) => {
    const email = props.username;

    const getShortEmail = () => {
        return window.innerWidth < 480 ? `${email.slice(0, 6)}...` : email;
    };

    return (
        <div className="account">
            <div className="account__inner">
                <div className="account__wallet">
                    <PDropdown
                        border
                        gap={12}
                        minWidth={300}
                        maxWidth={300}
                        padding={[0, 0]}
                        align="right"
                        handler={
                            <div className="account__wallet-handler">
                                <IconWallet className="account__wallet-handler-icon" />
                            </div>
                        }
                        content={
                            <div className="account__wallet-content">
                                <iframe
                                    src="https://wallet.poluspay.com"
                                    width={300}
                                    height={500}
                                    frameBorder="0"
                                />
                            </div>
                        }
                    />
                </div>
                <div className="account__user">
                    <PDropdown
                        border
                        gap={12}
                        align="right"
                        handler={
                            <div className="account__user-handler">
                                <p className="account__user-handler-text">
                                    {getShortEmail()}
                                </p>
                                <IconChevron className="account__user-handler-icon" />
                            </div>
                        }
                        content={
                            <div className="account__user-content">
                                <p className="account__user-content-text">
                                    {email}
                                </p>
                                <div className="account__user-content-divider" />
                                <div
                                    className="account__user-content-button"
                                    onClick={props.logout}
                                >
                                    Log out
                                    <IconLogout className="account__user-content-button-icon" />
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Account;
