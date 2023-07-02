import type { WalletItemConnected } from './wallet-list';

import { PSwitch } from '@poluspay-frontend/ui';
import { ReactComponent as IconDelete } from '../../../assets/icons/delete.svg';

import './WalletItemConnected.scoped.scss';

interface WalletItemProps {
    item: WalletItemConnected;
    enabled: boolean;
    onSwitch: (value: boolean) => void;
    onDelete: () => void;
}

export const MerchantWalletItemConnected: React.FC<WalletItemProps> = ({
    item,
    enabled,
    onSwitch,
    onDelete,
}) => {
    const getShortAddress = () => {
        return `${item.address.slice(0, 6)}...${item.address.slice(-6)}`;
    };

    return (
        <div className="wallet-item">
            <div className="wallet-item__data">
                <img
                    className="wallet-item__data-image"
                    src={`/images/wallets/${item.image}.png`}
                    alt={item.name}
                />
                <div className="wallet-item__data-text">
                    <p className="wallet-item__data-text-name">{item.name}</p>
                    <p className="wallet-item__data-text-address">
                        {getShortAddress()}
                    </p>
                </div>
            </div>
            <div className="wallet-item__actions">
                <div className="wallet-item__actions-switch">
                    <PSwitch
                        value={enabled}
                        onChange={(value) => onSwitch(value)}
                    />
                </div>
                <div className="wallet-item__actions-divider" />
                <div className="wallet-item__actions-delete">
                    <IconDelete
                        className="wallet-item__actions-delete-icon"
                        onClick={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};
