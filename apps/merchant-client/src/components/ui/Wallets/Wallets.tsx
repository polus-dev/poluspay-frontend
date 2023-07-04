import { Item, blockchainList, exchangeList } from './wallet-list';
import { useEffect, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { walletList, connectedWalletList } from './wallet-list';

import { MerchantWalletItem } from './WalletItem';
import { PButton, PInput, PPagination, PTabs } from '@poluspay-frontend/ui';

import { ReactComponent as IconSearch } from '../../../assets/icons/search.svg';

import classNames from 'classnames';

import './Wallets.scoped.scss';
import { MerchantWalletItemConnected } from './WalletItemConnected';
import { shuffleArray } from 'tools';

interface MerchantWalletsProps {
    isRegistation?: boolean;
    buttonDisabled?: boolean;
    onButtonClick?: () => void;
    selectedWallets: Item[];
    handleSelect: (wallets: Item) => void;
}

const allArray = [...walletList, ...exchangeList, ...blockchainList];
shuffleArray(allArray);

const tabContent = {
    all: allArray,
    wallet: walletList,
    exchange: exchangeList,
    blockchain: blockchainList,
};

export const MerchantWallets: React.FC<MerchantWalletsProps> = ({
    isRegistation,
    buttonDisabled,
    onButtonClick,
    selectedWallets,
    handleSelect,
}) => {
    const tabs = [
        {
            id: 'all',
            text: 'All',
        },
        { id: 'wallet', text: 'Wallets' },
        { id: 'exchange', text: 'Exchanges' },
        { id: 'blockchain', text: 'Blockchains' },
    ] as const;

    const [tab, setTab] = useState(tabs[0]);
    const [parent] = useAutoAnimate();

    const [search, setSearch] = useState('');

    const [searched, setSearched] = useState<Item[]>();

    const limit = 24;
    const [currentPage, setCurrentPage] = useState(1);
    const [walletsPaginated, setWalletsPaginated] = useState<Item[]>(
        walletList.slice(
            (currentPage - 1) * limit,
            (currentPage - 1) * limit + limit
        )
    );

    const onPageChange = (value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        const paginated: Item[] = tabContent[tab.id].slice(
            (currentPage - 1) * limit,
            (currentPage - 1) * limit + limit
        );
        setWalletsPaginated(paginated);
    }, [tab, currentPage]);

    useEffect(() => {
        if (search) {
            const filtered = tabContent[tab.id].filter((el) =>
                el.name.toLowerCase().includes(search.toLowerCase())
            );
            setSearched(filtered);
        } else {
            setSearched(undefined);
        }
        setCurrentPage(1);
    }, [search, tab]);

    return (
        <div className="wallets">
            <div className="wallets__header">
                <h6 className="wallets__header-title">Add your wallets</h6>
                <p className="wallets__header-description">
                    Add a wallet, which will receive payments from customers
                </p>
            </div>
            <div className="wallets__search">
                <PInput
                    placeholder="Search"
                    value={search}
                    prepend={<IconSearch className="wallets__search-icon" />}
                    onInput={(value) => setSearch(value.toString())}
                />
            </div>
            <div className="wallets__tabs">
                <div className="wallets__tabs-inner">
                    <PTabs
                        size="sm"
                        active={tab}
                        // @ts-ignore
                        items={tabs}
                        // @ts-ignore
                        onChange={(item) => setTab(item)}
                    />
                </div>
            </div>
            {false && (
                <div className="wallets__connected">
                    {connectedWalletList.map((el) => (
                        <MerchantWalletItemConnected
                            enabled
                            item={el}
                            key={el.id}
                            onSwitch={(value) => {}}
                            onDelete={() => {}}
                        />
                    ))}
                </div>
            )}
            <div ref={parent} className="wallets__container">
                {searched
                    ? searched.map((el) => (
                          <div
                              className={classNames({
                                  'wallets__container-item': true,
                                  'wallets__container-item--wide':
                                      isRegistation,
                              })}
                              key={el.id}
                          >
                              <MerchantWalletItem
                                  item={el}
                                  selected={selectedWallets.includes(el)}
                                  onSelect={() => handleSelect(el)}
                              />
                          </div>
                      ))
                    : walletsPaginated.map((el) => (
                          <div
                              className={classNames({
                                  'wallets__container-item': true,
                                  'wallets__container-item--wide':
                                      isRegistation,
                              })}
                              key={el.id}
                          >
                              <MerchantWalletItem
                                  item={el}
                                  selected={selectedWallets.includes(el)}
                                  onSelect={() => handleSelect(el)}
                              />
                          </div>
                      ))}
            </div>
            {!search && tab.id === 'all' && (
                <div className="wallets__pagination">
                    <PPagination
                        current={currentPage}
                        pageItems={limit}
                        totalItems={tabContent[tab.id].length}
                        onPageChange={(page) => onPageChange(page)}
                    />
                </div>
            )}
            <div className="wallets__button">
                <div className="wallets__button-item">
                    <PButton
                        wide
                        size="lg"
                        disabled={!selectedWallets || buttonDisabled}
                        children={<>Save</>}
                        onClick={onButtonClick}
                    />
                </div>
            </div>
        </div>
    );
};
