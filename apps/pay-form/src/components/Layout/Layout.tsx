import { Outlet } from 'react-router-dom';

import { PNotifyContainer } from '@poluspay-frontend/ui';
import { Header } from '../Header/Header';

import './Layout.scoped.scss';

export const Layout: React.FC = () => {
    return (
        <>
            <Header />
            <div className="content">
                <Outlet />
                <PNotifyContainer />
            </div>
        </>
    );
};
