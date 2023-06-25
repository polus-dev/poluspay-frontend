import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { throttle } from 'lodash-es';

import Menu from './Menu/Menu';
import Account from './Account/Account';
import { ReactComponent as LogoPolus } from '../../assets/logos/poluspay.svg';
import { ReactComponent as LogoPolusPlanet } from '../../assets/logos/polus-planet.svg';

import './Header.scoped.scss';

const Header: React.FC = () => {
    const elHeader = useRef<HTMLElement | null>(null);

    const [menuOpened, setMenuOpened] = useState(false);
    const isMenuScrolled = useRef(false);

    const setMenuScrolled = (): void => {
        if (!elHeader.current) return undefined;

        const height = elHeader.current.offsetHeight;

        isMenuScrolled.current = window.scrollY >= height;
    };

    useEffect(() => {
        window.addEventListener(
            'scroll',
            throttle(setMenuScrolled, 200, { trailing: true })
        );

        setMenuScrolled();
    }, []);

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <NavLink to="/main">
                        <LogoPolusPlanet className="header__logo-image" />
                        <LogoPolus className="header__logo-image header__logo-image--desktop" />
                    </NavLink>
                </div>
                <div className="header__menu">
                    {/* either get data for account here and pass it as
                    a props or get it inside the Account component */}
                    <div className="header__menu-account">
                        <Account />
                    </div>
                    <Menu
                        onToggleMenu={() => setMenuOpened(!menuOpened)}
                        onCloseMenu={() => setMenuOpened(false)}
                    />
                </div>
                {/* duplicate of Account (needed for ui) */}
                <div className="header__account">
                    <Account />
                </div>
            </div>
        </header>
    );
};

export default Header;
