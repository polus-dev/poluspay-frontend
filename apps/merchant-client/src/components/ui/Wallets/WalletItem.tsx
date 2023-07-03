import type { WalletItem } from './wallet-list';

import { ReactComponent as IconCheckbox } from '../../../assets/icons/checkbox-fill.svg';

import classNames from 'classnames';

import './WalletItem.scoped.scss';

interface WalletItemProps {
    item: WalletItem;
    selected: boolean;
    onSelect: () => void;
}

export const MerchantWalletItem: React.FC<WalletItemProps> = ({
    item,
    selected,
    onSelect,
}) => {
    return (
        <div className="wallet-item" onClick={onSelect}>
            <div className="wallet-item__inner">
                <img
                    className="wallet-item__inner-image"
                    src={`/images/wallets/${item.image}.png`}
                    alt={item.name}
                />
                <p className="wallet-item__inner-name">{item.name}</p>
            </div>
            <IconCheckbox
                className={classNames({
                    'wallet-item__icon': true,
                    'wallet-item__icon--active': selected
                })}
            />
        </div>
    );
};
