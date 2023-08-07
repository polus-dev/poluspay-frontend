import { PDropdown } from '@poluspay-frontend/ui';
import { ReactComponent as IconChevron } from '../../../../assets/icons/chevron.svg';
import { ReactComponent as IconLogout } from '../../../../assets/icons/logout.svg';

import './User.scoped.scss';

export interface IAccountUserProps {
    username: string;
    onLogout: () => void;
}

export const AccountUser: React.FC<IAccountUserProps> = ({
    username,
    onLogout,
}) => {
    const getShortUsername = () => {
        const screen = window.innerWidth;

        if (screen < 375) {
            return `${username.slice(0, 4)}...`;
        } else if (screen >= 375 && screen < 480) {
            return `${username.slice(0, 4)}...`;
        } else {
            return username;
        }
    };

    return (
        <div className="user">
            <PDropdown
                border
                gap={12}
                align="right"
                handler={
                    <div className="user__handler">
                        <p className="user__handler-text">
                            {getShortUsername()}
                        </p>
                        <IconChevron className="user__handler-icon" />
                    </div>
                }
                content={
                    <div className="user__content">
                        <p className="user__content-text">{username}</p>
                        <div className="user__content-divider" />
                        <div
                            className="user__content-button"
                            onClick={onLogout}
                        >
                            Log out
                            <IconLogout className="user__content-button-icon" />
                        </div>
                    </div>
                }
            />
        </div>
    );
};
