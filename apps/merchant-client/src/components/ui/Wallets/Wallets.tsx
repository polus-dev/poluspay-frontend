import type { WalletItem } from './wallet-list'
import { useEffect, useState } from 'react'

import { walletList } from './wallet-list'

import { MerchantWalletItem } from './WalletItem'
import { PButton, PInput, PPagination, PTabs } from '@poluspay-frontend/ui'

import { ReactComponent as IconSearch } from '../../../assets/icons/search.svg'

import classNames from 'classnames'

import './Wallets.scoped.scss'

interface MerchantWalletsProps {
    isRegistation?: boolean
    buttonDisabled?: boolean
    onButtonClick?: () => void
}

export const MerchantWallets: React.FC<MerchantWalletsProps> = ({
    isRegistation,
    buttonDisabled,
    onButtonClick
}) => {
    const tabs = [
        { id: 'all', text: 'All' },
        { id: 'wallet', text: 'Wallets' },
        { id: 'exchange', text: 'Exchanges' },
        { id: 'blockchain', text: 'Blockchains' }
    ]

    const [tab, setTab] = useState(tabs[0])

    const [search, setSearch] = useState('')

    const [walletsSearched, setWalletsSearched] = useState<WalletItem[]>(walletList)

    const limit = 24
    const [currentPage, setCurrentPage] = useState(1)
    const [walletsPaginated, setWalletsPaginated] = useState<WalletItem[]>(
        walletList.slice(
            (currentPage - 1) * limit,
            (currentPage - 1) * limit + limit
        )
    )

    const onPageChange = (value: number) => {
        setCurrentPage(value)
    }

    const [selectedWallet, setSelectedWallet] = useState<WalletItem | null>(null)

    useEffect(() => {
        if (tab.id === 'all') {
            const paginated: WalletItem[] = walletList
                .slice(
                    (currentPage - 1) * limit,
                    (currentPage - 1) * limit + limit
                )

            setWalletsPaginated(paginated)
        } else {
            const paginated: WalletItem[] = walletList
                .filter((el) => el.type === tab.id)
                .slice(
                    (currentPage - 1) * limit,
                    (currentPage - 1) * limit + limit
                )

            setWalletsPaginated(paginated)
        }
    }, [tab, currentPage])

    useEffect(() => {
        if (tab.id === 'all') {
            const searched: WalletItem[] = walletList
                .filter((el) => el.name.toLocaleLowerCase().includes(search.toLowerCase()))

            setWalletsSearched(searched)
        } else {
            const searched: WalletItem[] = walletList
                .filter((el) => el.type === tab.id)
                .filter((el) => el.name.toLocaleLowerCase().includes(search.toLowerCase()))

            setWalletsSearched(searched)
        }
    }, [search, tab])

    useEffect(() => {
        if (!search) return undefined

        setTab(tabs[0])
        setCurrentPage(1)
    }, [search])

    useEffect(() => {
        setCurrentPage(1)
    }, [tab])

    return (
        <div className="wallets">
            <div className="wallets__header">
                <h6 className="wallets__header-title">
                    Add your wallets
                </h6>
                <p className="wallets__header-description">
                    Add a wallet, which will receive
                    payments from customers
                </p>
            </div>
            <div className="wallets__search">
                <PInput
                    placeholder="Search"
                    value={search}
                    prepend={
                        <IconSearch
                            className="wallets__search-icon"
                        />
                    }
                    onInput={(value) => setSearch(value.toString())}
                />
            </div>
            <div className="wallets__tabs">
                <div className="wallets__tabs-inner">
                    <PTabs
                        size="sm"
                        active={tab}
                        items={tabs}
                        onChange={(item) => setTab(item)}
                    />
                </div>
            </div>
            <div className="wallets__container">
                {search ? walletsSearched.map((el) => (
                    <div
                        className={classNames({
                            'wallets__container-item': true,
                            'wallets__container-item--wide': isRegistation
                        })}
                        key={el.id}
                    >
                        <MerchantWalletItem
                            item={el}
                            selected={selectedWallet?.id === el.id}
                            onSelect={() => setSelectedWallet(el)}
                        />
                    </div>
                )) : walletsPaginated.map((el) => (
                    <div
                        className={classNames({
                            'wallets__container-item': true,
                            'wallets__container-item--wide': isRegistation
                        })}
                        key={el.id}
                    >
                        <MerchantWalletItem
                            item={el}
                            selected={selectedWallet?.id === el.id}
                            onSelect={() => setSelectedWallet(el)}
                        />
                    </div>
                ))}
            </div>
            {(!search && tab.id === 'all') && (
                <div className="wallets__pagination">
                    <PPagination
                        current={currentPage}
                        pageItems={limit}
                        totalItems={walletList.length}
                        onPageChange={(page) => onPageChange(page)}
                    />
                </div>
            )}
            <div className="wallets__button">
                <div className="wallets__button-item">
                    <PButton
                        wide
                        size="lg"
                        disabled={!selectedWallet || buttonDisabled}
                        children={<>Save</>}
                        onClick={onButtonClick}
                    />
                </div>
            </div>
        </div>
    )
}
