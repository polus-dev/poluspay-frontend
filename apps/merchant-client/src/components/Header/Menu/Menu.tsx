import type { IMenuItem } from './MenuItem';

import { useState } from 'react';

import MenuItem from './MenuItem';
import { ReactComponent as IconMenuOpen } from '../../../assets/icons/menu-open.svg';
import { ReactComponent as IconMenuClose } from '../../../assets/icons/menu-close.svg';

import classNames from 'classnames';

import './Menu.scoped.scss';

interface MenuProps {
    onCloseMenu: () => void;
    onToggleMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ onCloseMenu, onToggleMenu }) => {
    const [menuOpened, setMenuOpened] = useState(false);

    const items: IMenuItem[] = [
        { id: 1, title: 'Main', path: '/main' },
        { id: 2, title: 'Merchants', path: '/merchants' },
        { id: 3, title: 'Dashboard', path: '/dashboard' },
        { id: 4, title: 'Settings', path: '/settings' },
    ];

    const toggleMenu = (): void => {
        setMenuOpened(!menuOpened);

        const htmlClasses = document.documentElement.classList;
        const noScroll = 'no-scroll';

        htmlClasses.toggle(noScroll);

        onToggleMenu();
    };

    const closeMenu = (): void => {
        setMenuOpened(false);

        const htmlClasses = document.documentElement.classList;
        const noScroll = 'no-scroll';

        if (htmlClasses.contains(noScroll)) {
            htmlClasses.remove(noScroll);
        }

        onCloseMenu();
    };

    return (
        <>
            <div className={classNames('menu', { 'menu--active': menuOpened })}>
                <ul className="menu__list">
                    {items.map((el) => (
                        <MenuItem
                            title={el.title}
                            path={el.path}
                            key={el.id}
                            onCloseMenu={closeMenu}
                        />
                    ))}
                </ul>
            </div>
            <div className="menu__buttons">
                <div
                    className={classNames('menu__button-handler', {
                        'menu__button-handler--active': !menuOpened,
                    })}
                    onClick={toggleMenu}
                >
                    <IconMenuOpen className="menu__button-handler-icon" />
                </div>
                <div
                    className={classNames('menu__button-handler', {
                        'menu__button-handler--active': menuOpened,
                    })}
                    onClick={toggleMenu}
                >
                    <IconMenuClose className="menu__button-handler-icon" />
                </div>
            </div>
        </>
    );
};

export default Menu;
