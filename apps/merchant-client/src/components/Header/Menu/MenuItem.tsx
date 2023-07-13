import { NavLink } from 'react-router-dom';

import './MenuItem.scoped.scss';

export interface IMenuItem {
    id: number;
    title: string;
    path: string;
}

interface MenuItemProps {
    title: string;
    path: string;
    onCloseMenu: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    title,
    path,
    onCloseMenu,
}) => {
    return (
        <li className="menu-item">
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? 'menu-item__link menu-item__link--active'
                        : 'menu-item__link'
                }
                to={path}
                onClick={onCloseMenu}
            >
                {title}
            </NavLink>
        </li>
    );
};
