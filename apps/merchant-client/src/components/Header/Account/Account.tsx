import type { IAccountUserProps } from './User/User';

import { AccountNotifications } from './Notifications/Notifications';
import { AccountWallet } from './Wallet/Wallet';
import { AccountUser } from './User/User';

import './Account.scoped.scss';

interface AccountProps extends IAccountUserProps {}

export const Account: React.FC<AccountProps> = ({ username, onLogout }) => {
    return (
        <div className="account">
            {/* {import.meta.env.DEV && (
                <div className="account__notifications">
                    <AccountNotifications />
                </div>
            )} */}
            <div className="account__wallet">
                <AccountWallet />
            </div>
            <div className="account__user">
                <AccountUser username={username} onLogout={onLogout} />
            </div>
        </div>
    );
};
