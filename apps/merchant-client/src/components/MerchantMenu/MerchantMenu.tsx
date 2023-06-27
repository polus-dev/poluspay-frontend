import { useState } from "react"
import { NavLink } from "react-router-dom"

import PButton from "../ui/PButton/PButton"

import classNames from "classnames"

import './MerchantMenu.scoped.scss'

interface MenuItem {
    id: number
    title: string
    to: string
}

const MerchantMenu: React.FC = () => {
    const items: MenuItem[] = [
        { id: 1, title: 'Merchant', to: 'merchant' },
        { id: 2, title: 'Invoices', to: 'invoices' },
        { id: 3, title: 'Tokens & Addresses', to: 'wallet' },
        { id: 4, title: 'API & Webhooks', to: 'api' },
        { id: 5, title: 'Plugins', to: 'plugins' }
    ]

    const [opened, setOpened] = useState(false)

    return (
        <div
            className={classNames(
                'menu',
                { 'menu--active': opened }
            )}
        >
            <div className="menu__inner">
                <div
                    className={classNames(
                        'menu__handler',
                        { 'menu__handler--active': !opened }
                    )}
                    onClick={() => setOpened(!opened)}
                >
                    <p className="menu__handler-text">
                        Menu
                    </p>
                </div>
                <div
                    className={classNames(
                        'menu__container',
                        { 'menu__container--active': opened }
                    )}
                >
                    <div className="menu__container-header">
                        <p className="menu__container-header-title">
                            Merchant name
                        </p>
                    </div>
                    <div className="menu__container-divider" />
                    <div className="menu__container-list">
                        {items.map((el) => (
                            <div
                                className="menu__container-list-item"
                                key={el.id}
                            >
                                <NavLink
                                    to={el.to}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'menu__container-list-item menu__container-list-item--active'
                                            : 'menu__container-list-item'
                                    }
                                    onClick={() => setOpened(false)}
                                >
                                    {el.title}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                    <div className="menu__container-button">
                        <PButton
                            wide
                            to="invoices"
                            children={
                                <p>Create&nbsp;invoice</p>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MerchantMenu
