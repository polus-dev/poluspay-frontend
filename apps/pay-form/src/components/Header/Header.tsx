import { NavLink } from 'react-router-dom';

import { HeaderAccount } from './Account/Account';
import { ReactComponent as LogoPolus } from '../../assets/logos/poluspay.svg';
import { ReactComponent as LogoPolusPlanet } from '../../assets/logos/polus-planet.svg';

import './Header.scoped.scss';

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <NavLink to="/">
                        <LogoPolusPlanet className="header__logo-image" />
                        <LogoPolus className="header__logo-image header__logo-image--desktop" />
                    </NavLink>
                </div>
                <div className="header__account">
                    <HeaderAccount />
                </div>
            </div>
        </header>
    );
};
