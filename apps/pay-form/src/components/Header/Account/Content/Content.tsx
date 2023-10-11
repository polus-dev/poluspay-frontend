import { Address } from 'viem';
import { makeShortHash } from '@poluspay-frontend/utils';
import { useCopyText } from '@poluspay-frontend/hooks';

import LogoWalletConnect from '../../../../assets/logos/wallet-connect.svg';
import { ReactComponent as IconCopy } from '../../../../assets/icons/copy.svg';
import { ReactComponent as IconLogout } from '../../../../assets/icons/logout.svg';

import './Content.scoped.scss';

interface HeaderAccountContentProps {
    address: Address;
    disconnect: () => void;
}

export const HeaderAccountContent = ({
    address,
    disconnect,
}: HeaderAccountContentProps) => {
    const copy = useCopyText();

    return (
        <div className="account-content">
            <div className="account-content__data">
                <div className="account-content__data-inner">
                    <img
                        src={LogoWalletConnect}
                        alt="avatar"
                        className="account-content__data-inner-icon"
                    />
                    <p className="account-content__data-inner-text">
                        {copy.copied
                            ? 'Copied!'
                            : makeShortHash(address, 4)}
                    </p>
                </div>
                <IconCopy
                    className="account-content__data-icon"
                    onClick={() => copy.copy(address)}
                />
            </div>
            <div className="account-content__divider" />
            <div className="account-content__button" onClick={disconnect}>
                <p className="account-content__button-text">Disconnect</p>
                <IconLogout className="account-content__button-icon" />
            </div>
        </div>
    );
};
