import { PButton, PDropdown } from '@poluspay-frontend/ui';
import { HeaderAccountContent } from './Content/Content';
import { ReactComponent as LogoWalletConnect } from '../../../assets/logos/wallet-connect.svg';
import { ReactComponent as IconChevron } from '../../../assets/icons/chevron.svg';

import './Account.scoped.scss';
import {useAccount, useDisconnect, useEnsAvatar, useEnsName} from "wagmi";
import {useWeb3Modal} from "@web3modal/react";
import {makeShortHash} from "../../../../../../tools";

export const HeaderAccount: React.FC = () => {
  const {isConnected, address, connector} = useAccount();
  const {disconnect} = useDisconnect();
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName })
  const {open, isOpen} = useWeb3Modal();

    return (
        <div className="account">
            {!isConnected ? (
                <div className="account__button">
                    <PButton
                        wide
                        loading={isOpen}
                        children={
                            <>
                                <LogoWalletConnect className="account__button-icon" />
                                <p>Connect Wallet</p>
                            </>
                        }
                        onClick={open}
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
                                      {makeShortHash(address!, 4)}
                                    </p>
                                </div>
                                <IconChevron className="account__dropdown-handler__icon" />
                            </div>
                        }
                        content={
                            <div className="account__dropdown-content">
                              {address && connector && <HeaderAccountContent {...{address, disconnect, ensName, ensAvatar}} />}
                            </div>
                        }
                    />
                </div>
            )}
        </div>
    );
};
