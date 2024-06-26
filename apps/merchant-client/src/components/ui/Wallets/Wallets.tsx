import { useEffect, useState } from 'react';

import { list } from '@poluspay-frontend/ui';
import { shuffleArray } from '@poluspay-frontend/utils';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
    useDeleteMerchantWalletMutation,
    useDisableMerchantWalletMutation,
    useEnableMerchantWalletMutation,
    useGetMerchantWalletQuery,
} from '@poluspay-frontend/merchant-query';

import {
    Item,
    blockchainList,
    connectedWalletList,
    exchangeList,
    BlockchainItem,
    notify,
    PButton,
    PInput,
    PPagination,
    PTabs,
} from '@poluspay-frontend/ui';

import { MerchantWalletItemConnected } from './WalletItemConnected';
import { MerchantWalletItem } from './WalletItem';
import { ReactComponent as IconSearch } from '../../../assets/icons/search.svg';

import classNames from 'classnames';

import './Wallets.scoped.scss';

interface MerchantWalletsProps {
    isRegistration?: boolean;
    buttonDisabled?: boolean;
    selectedWallet?: Item;
    selectedBlockchain?: BlockchainItem;
    merchantId: string;
    walletConnected?: number[];
    handleSelect: (wallets: Item) => void;
    next: (a?: string) => void;
}

const allArray = [...list, ...exchangeList, ...blockchainList];
shuffleArray(allArray);

const tabContent = {
    all: allArray,
    wallet: list,
    exchange: exchangeList,
    blockchain: blockchainList,
};

export const MerchantWallets: React.FC<MerchantWalletsProps> = ({
    isRegistration,
    buttonDisabled,
    selectedWallet,
    selectedBlockchain,
    merchantId,
    walletConnected,
    handleSelect,
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
    const [enableMerchantWallet] = useEnableMerchantWalletMutation();
    const [deleteMerchantWallet] = useDeleteMerchantWalletMutation();
    const [ref] = useAutoAnimate();

    const [tab, setTab] = useState<(typeof tabs)[number]>(tabs[3]);

    const [search, setSearch] = useState('');

    const [searched, setSearched] = useState<Item[]>();

    const limit = 24;
    const [currentPage, setCurrentPage] = useState(1);
    const [walletsPaginated, setWalletsPaginated] = useState<Item[]>(
        list.slice((currentPage - 1) * limit, (currentPage - 1) * limit + limit)
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
            console.error(e);
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
                                        enableMerchantWallet({
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
                                      selectedBlockchain?.id === el.id ||
                                      Boolean(walletConnected?.includes(el.id))
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
            {isRegistration && (
                <div className="wallets__button">
                    <div className="wallets__button-item">
                        <PButton
                            wide
                            size="lg"
                            disabled={
                                buttonDisabled || !connectedWallets?.length
                            }
                            children={<p>Finish registration</p>}
                            onClick={() => next()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
