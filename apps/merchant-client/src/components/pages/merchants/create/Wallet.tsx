import { useEffect, useState } from 'react';

import PInput from '../../../ui/PInput/PInput';
import PTabs from '../../../ui/PTabs/PTabs';
import PPagination from '../../../ui/PPagination/PPagination';
import PButton from '../../../ui/PButton/PButton';

import { ReactComponent as LogoWalletConnect } from '../../../../assets/logos/wallet-connect.svg';
import { ReactComponent as IconDelete } from '../../../../assets/icons/delete.svg';
import { ReactComponent as IconSearch } from '../../../../assets/icons/search.svg';

import './Wallet.scoped.scss';

enum WalletType {
    Wallet = 'wallet',
    Exchange = 'exchange',
    Blockchain = 'blockchain',
}

interface Wallet {
    id: number;
    icon: React.FunctionComponent;
    name: string;
    type: WalletType | `${WalletType}`;
}

interface FormProps {
    onComplete: () => void;
}

const MerchantWallet: React.FC<FormProps> = ({ onComplete }) => {
    // replace with real data
    const wallets: Wallet[] = [
        {
            id: 1,
            icon: LogoWalletConnect,
            name: 'WalletConnect b',
            type: 'blockchain',
        },
        {
            id: 2,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'blockchain',
        },
        {
            id: 3,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'blockchain',
        },
        {
            id: 4,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'blockchain',
        },
        {
            id: 5,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'blockchain',
        },
        {
            id: 6,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'blockchain',
        },
        {
            id: 7,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'blockchain',
        },
        {
            id: 8,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'blockchain',
        },
        {
            id: 9,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'blockchain',
        },
        {
            id: 10,
            icon: LogoWalletConnect,
            name: 'WalletConnect w',
            type: 'wallet',
        },
        {
            id: 11,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'wallet',
        },
        {
            id: 12,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'wallet',
        },
        {
            id: 13,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'wallet',
        },
        {
            id: 14,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'wallet',
        },
        {
            id: 15,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'wallet',
        },
        {
            id: 16,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'wallet',
        },
        {
            id: 17,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'wallet',
        },
        {
            id: 18,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'wallet',
        },
        {
            id: 19,
            icon: LogoWalletConnect,
            name: 'WalletConnect e',
            type: 'exchange',
        },
        {
            id: 20,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 21,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 22,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 23,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 24,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 25,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 26,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
    ];

    // replace with real data
    const connected: Wallet[] = [
        {
            id: 1,
            icon: LogoWalletConnect,
            name: 'WalletConnect b',
            type: 'blockchain',
        },
        {
            id: 10,
            icon: LogoWalletConnect,
            name: 'WalletConnect w',
            type: 'wallet',
        },
        {
            id: 19,
            icon: LogoWalletConnect,
            name: 'WalletConnect e',
            type: 'exchange',
        },
        {
            id: 22,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 23,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 24,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 25,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
        {
            id: 26,
            icon: LogoWalletConnect,
            name: 'WalletConnect',
            type: 'exchange',
        },
    ];

    // replace with right condition
    // (this one doesn't work)
    // (objects must include icon)
    // then replace connected mapping with intersections mapping
    // on getConnectedItemsHTML
    const intersections: Wallet[] = wallets.filter((el) => {
        connected.some((el1) => el.id == el1.id);
    });

    const tabs = [
        { id: 'all', text: 'All' },
        { id: 'wallet', text: 'Wallets' },
        { id: 'exchange', text: 'Exchanges' },
        { id: 'blockchain', text: 'Blockchains' },
    ];
    const [tab, setTab] = useState(tabs[0]);

    const [search, setSearch] = useState('');

    let sorted: Wallet[] = wallets;

    const getWalletsByTab = () => {
        switch (tab.id) {
            case WalletType.Wallet:
                return wallets.filter((el) => el.type === 'wallet');
            case WalletType.Exchange:
                return wallets.filter((el) => el.type === 'exchange');
            case WalletType.Blockchain:
                return wallets.filter((el) => el.type === 'blockchain');
            default:
                return wallets;
        }
    };

    const calculatePaginated = () => {
        return sorted.slice(
            (page - 1) * limitPerPage,
            (page - 1) * limitPerPage + limitPerPage
        );
    };

    const [page, setPage] = useState(1);
    const limitPerPage = 24;
    let walletsPaginated = calculatePaginated();

    const onPageChange = (value: number) => {
        setPage(value);
    };

    const getConnectedItemsHTML = () => {
        return connected.map((el) => {
            const Icon = el.icon;

            return (
                <div className="wallet__container-connected__item" key={el.id}>
                    <div className="wallet__container-connected__item-icon">
                        <Icon />
                    </div>
                    <div className="wallet__container-connected__item-data">
                        <p className="wallet__container-connected__item-data-network">
                            Polygon
                        </p>
                        <p className="wallet__container-connected__item-data-address">
                            Wallet address
                        </p>
                    </div>
                    <div className="wallet__container-connected__item-action">
                        <IconDelete
                            className="wallet__container-connected__item-action-icon"
                            onClick={() => console.log('delete connection')}
                        />
                    </div>
                </div>
            );
        });
    };

    const getWalletItemsHTML = () => {
        return walletsPaginated.map((el) => {
            const Icon = el.icon;

            return (
                <div className="wallet__container-inner__item" key={el.id}>
                    <div className="wallet__container-inner__item-icon">
                        <Icon />
                    </div>
                    <div className="wallet__container-inner__item-data">
                        <p className="wallet__container-inner__item-data-name">
                            {el.name}
                        </p>
                        {intersections.find((elInter) => {
                            el === elInter && (
                                <p className="wallet__container-inner__item-data-connection">
                                    Connected
                                </p>
                            );
                        })}
                    </div>
                </div>
            );
        });
    };

    let walletItemsHTML = getWalletItemsHTML();

    useEffect(() => {
        const sortedWallets = getWalletsByTab();
        sorted = sortedWallets;

        walletsPaginated = calculatePaginated();

        walletItemsHTML = getWalletItemsHTML();
    }, [tab]);

    return (
        <div className="wallet">
            <div className="wallet__header">
                <h4 className="wallet__header-title">Add your wallets</h4>
                <p className="wallet__header-description">
                    Add a wallet, which will be used to receive payments from
                    customers
                </p>
            </div>
            <div className="wallet__search">
                <PInput
                    placeholder="Search"
                    value={search}
                    prepend={<IconSearch className="wallet__search-icon" />}
                    onInput={(value) => setSearch(value.toString())}
                />
            </div>
            <div className="wallet__tabs">
                <PTabs
                    size="sm"
                    active={tab}
                    items={tabs}
                    onChange={(item) => setTab(item)}
                />
            </div>
            <div className="wallet__container">
                {connected.length && (
                    <div className="wallet__container-connected">
                        {getConnectedItemsHTML()}
                    </div>
                )}
                <div className="wallet__container-inner">{walletItemsHTML}</div>
            </div>
            {walletItemsHTML.length > limitPerPage && (
                <div className="wallet__pagination">
                    <PPagination
                        current={page}
                        totalItems={sorted.length}
                        pageItems={limitPerPage}
                        onPageChange={(value) => onPageChange(value)}
                    />
                </div>
            )}
            <div className="wallet__button">
                <div className="wallet__button-item">
                    <PButton
                        wide
                        disabled={connected.length === 0}
                        children={<p>Finish Creating</p>}
                        onClick={onComplete}
                    />
                </div>
                <div className="wallet__button-item wallet__button-item--desktop">
                    <PButton
                        wide
                        size="lg"
                        disabled={connected.length === 0}
                        children={<p>Finish Creating</p>}
                        onClick={onComplete}
                    />
                </div>
            </div>
        </div>
    );
};

export default MerchantWallet;
