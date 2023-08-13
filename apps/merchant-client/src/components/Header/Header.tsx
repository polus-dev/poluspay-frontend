import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { throttle } from 'lodash-es';

import { useGetMeQuery } from '../../store/api/endpoints/user/User';
import { makeShortHash } from 'tools';
import { useLogout } from './hooks/useLogout';

import { Menu } from './Menu/Menu';
import { Account } from './Account/Account';
import { ReactComponent as LogoPolus } from '../../assets/logos/poluspay.svg';
import { ReactComponent as LogoPolusPlanet } from '../../assets/logos/polus-planet.svg';

import classNames from 'classnames';

import './Header.scoped.scss';

export const Header: React.FC = () => {
    const elHeader = useRef<HTMLElement | null>(null);

    const navigate = useNavigate();
    const { logout } = useLogout();
    const { data, isLoading } = useGetMeQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [menuOpened, setMenuOpened] = useState(false);
    const [menuScrolled, setMenuScrolled] = useState(false);

    const setMenuToScrolled = (): void => {
        if (!elHeader.current) return undefined;

        const height = elHeader.current.offsetHeight;

        setMenuScrolled(window.scrollY >= height);
    };

    useEffect(() => {
        window.addEventListener(
            'scroll',
            throttle(setMenuToScrolled, 200, { trailing: true })
        );

        setMenuToScrolled();
    }, []);

    useEffect(() => {
        window.location.pathname === '/' && navigate('/merchants');
    }, []);

    return (
        <header
            ref={elHeader}
            className={classNames({
                header: true,
                'header--active': menuOpened,
                'header--scrolled': menuScrolled,
            })}
        >
            <div className="header__container">
                <div className="header__logo">
                    <NavLink to="/">
                        <LogoPolusPlanet className="header__logo-image" />
                        <LogoPolus className="header__logo-image header__logo-image--desktop" />
                    </NavLink>
                </div>
                <div className="header__menu">
                    <div className="header__menu-account">
                        <Account
                            username={
                                isLoading
                                    ? 'Loading...'
                                    : data?.email ||
                                      (data?.address &&
                                          makeShortHash(data.address, 6, 4)) ||
                                      'unknown user'
                            }
                            onLogout={logout}
                        />
                    </div>
                    <Menu
                        onToggleMenu={() => setMenuOpened(!menuOpened)}
                        onCloseMenu={() => setMenuOpened(false)}
                    />
                </div>
                <div className="header__account">
                    <Account
                        username={
                            isLoading
                                ? 'Loading...'
                                : data?.email ||
                                  (data?.address &&
                                      makeShortHash(data.address, 6, 4)) ||
                                  'unknown user'
                        }
                        onLogout={logout}
                    />
                </div>
            </div>
        </header>
    );
};
