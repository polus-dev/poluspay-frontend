import LogoWalletConnect from '../../../../assets/logos/wallet-connect.svg';
import { ReactComponent as IconCopy } from '../../../../assets/icons/copy.svg';
import { ReactComponent as IconLogout } from '../../../../assets/icons/logout.svg';

import './Content.scoped.scss';
import { makeShortHash } from 'tools';
import { useCopyText } from '@poluspay-frontend/hooks';
import { Address } from 'viem';

interface HeaderAccountContentProps {
    address: Address;
    disconnect: () => void;
    ensName?: string | null;
    ensAvatar?: string | null;
}

export const HeaderAccountContent = ({
    address,
    disconnect,
    ensAvatar,
    ensName,
}: HeaderAccountContentProps) => {
    const copy = useCopyText();
    return (
        <div className="account-content">
            <div className="account-content__data">
                <div className="account-content__data-inner">
                    <img
                        src={ensAvatar ?? LogoWalletConnect}
                        alt="avatar"
                        className="account-content__data-inner-icon"
                    />
                    <p className="account-content__data-inner-text">
                        {copy.copied
                            ? 'Copied!'
                            : ensName
                            ? ensName
                            : makeShortHash(address, 4)}
                    </p>
                </div>
                <IconCopy
                    className="account-content__data-icon"
                    onClick={() => copy.copy(address)}
                />
            </div>
            <div className="account-content__divider" />
            {/* @ts-ignore */}
            <div className="account-content__button" onClick={disconnect}>
                <p className="account-content__button-text">Disconnect</p>
                <IconLogout className="account-content__button-icon" />
            </div>
        </div>
    );
};
