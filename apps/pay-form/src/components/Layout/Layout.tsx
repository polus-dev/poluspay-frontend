import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';

import './Layout.scoped.scss';

export const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
};
