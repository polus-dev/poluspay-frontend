import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { throttle } from 'lodash-es';

import { Menu } from './Menu/Menu';
import { Account } from './Account/Account';
import { ReactComponent as LogoPolus } from '../../assets/logos/poluspay.svg';
import { ReactComponent as LogoPolusPlanet } from '../../assets/logos/polus-planet.svg';

import './Header.scoped.scss';
import { useGetMeQuery } from '../../store/api/endpoints/user/User';
import { makeShortHash } from 'tools';
import { useLogout } from './hooks/useLogout';

export const Header: React.FC = () => {
    const elHeader = useRef<HTMLElement | null>(null);

    const { data, isLoading } = useGetMeQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { logout } = useLogout();

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
                    <NavLink to="/">
                        <LogoPolusPlanet className="header__logo-image" />
                        <LogoPolus className="header__logo-image header__logo-image--desktop" />
                    </NavLink>
                </div>
                <div className="header__menu">
                    {/* either get data for account here and pass it as
                    a props or get it inside the Account component */}
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
                            logout={logout}
                        />
                    </div>
                    <Menu
                        onToggleMenu={() => setMenuOpened(!menuOpened)}
                        onCloseMenu={() => setMenuOpened(false)}
                    />
                </div>
                {/* duplicate of Account (needed for ui) */}
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
                        logout={logout}
                    />
                </div>
            </div>
        </header>
    );
};
