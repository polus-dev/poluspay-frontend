import {
    Item,
    blockchainList,
    connectedWalletList,
    exchangeList,
    BlockchainItem,
} from './wallet-list';
import { useEffect, useState } from 'react';

import { walletList } from './wallet-list';
import {
    useDeleteMerchantWalletMutation,
    useDisableMerchantWalletMutation,
    useEnableMerchantWalletMutation,
    useGetMerchantWalletQuery,
} from '@poluspay-frontend/merchant-query';

import { MerchantWalletItem } from './WalletItem';
import {
    notify,
    PButton,
    PInput,
    PPagination,
    PTabs,
} from '@poluspay-frontend/ui';

import { ReactComponent as IconSearch } from '../../../assets/icons/search.svg';

import classNames from 'classnames';

import './Wallets.scoped.scss';
import { MerchantWalletItemConnected } from './WalletItemConnected';
import { shuffleArray } from 'tools';
import { Stage } from '../../../pages/merchants/create/hooks/useMerchantWallets';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface MerchantWalletsProps {
    isRegistration?: boolean;
    buttonDisabled?: boolean;
    selectedWallet?: Item;
    selectedBlockchain?: BlockchainItem;
    handleSelect: (wallets: Item) => void;
    merchantId: string;
    next: (a?: Stage) => void;
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
    isRegistration,
    buttonDisabled,
    selectedWallet,
    handleSelect,
    selectedBlockchain,
    merchantId,
    next,
}) => {
    const tabs = [
        { id: 'all', text: 'All' },
        { id: 'wallet', text: 'Wallets' },
        { id: 'exchange', text: 'Exchanges' },
        { id: 'blockchain', text: 'Blockchains' },
    ] as const;

    const { data: connectedWallets } = useGetMerchantWalletQuery({
        merchant_id: merchantId,
    });

    const [disableMerchantWallet] = useDisableMerchantWalletMutation();
    const [enableMerchatWallet] = useEnableMerchantWalletMutation();
    const [deleteMerchantWallet] = useDeleteMerchantWalletMutation();
    const [ref] = useAutoAnimate();

    const [tab, setTab] = useState(tabs[3]);

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

    const onDelete = async (network: string) => {
        try {
            await deleteMerchantWallet({
                merchant_id: merchantId,
                network,
            }).unwrap();
            notify({
                title: 'Wallet deleted',
                status: 'success',
            });
        } catch (e) {
            notify({
                title: 'Error',
                description: "Can't delete wallet",
                status: 'error',
            });
        }
    };

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
            <div ref={ref}>
                {connectedWallets && connectedWallets.length > 0 && (
                    <div className="wallets__connected">
                        {connectedWallets.map((el) => (
                            <MerchantWalletItemConnected
                                enabled={!el.is_disabled}
                                item={{
                                    ...connectedWalletList.find(
                                        (item) => item.label === el.network
                                    )!,
                                    address: el.address,
                                }}
                                key={el.address + el.network}
                                onSwitch={(v) => {
                                    if (v) {
                                        enableMerchatWallet({
                                            merchant_id: merchantId,
                                            network: el.network,
                                        });
                                    } else {
                                        disableMerchantWallet({
                                            merchant_id: merchantId,
                                            network: el.network,
                                        });
                                    }
                                }}
                                onDelete={() => onDelete(el.network)}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="wallets__container">
                {searched
                    ? searched.map((el) => (
                          <div
                              className={classNames({
                                  'wallets__container-item': true,
                                  'wallets__container-item--wide':
                                      isRegistration,
                              })}
                              key={el.id}
                          >
                              <MerchantWalletItem
                                  item={el}
                                  selected={
                                      selectedWallet?.id === el.id ||
                                      selectedBlockchain?.id === el.id
                                  }
                                  onSelect={() => handleSelect(el)}
                              />
                          </div>
                      ))
                    : walletsPaginated.map((el) => (
                          <div
                              className={classNames({
                                  'wallets__container-item': true,
                                  'wallets__container-item--wide':
                                      isRegistration,
                              })}
                              key={el.id}
                          >
                              <MerchantWalletItem
                                  item={el}
                                  selected={
                                      selectedWallet?.id === el.id ||
                                      selectedBlockchain?.id === el.id
                                  }
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
                        disabled={buttonDisabled}
                        children={<>{isRegistration ? 'Save' : 'Next'}</>}
                        onClick={() => next()}
                    />
                </div>
            </div>
        </div>
    );
};
