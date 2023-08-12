import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';

import './Layout.scoped.scss';
import {PNotifyContainer} from "@poluspay-frontend/ui";

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
