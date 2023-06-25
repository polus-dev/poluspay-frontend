import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import '../../assets/scss/main.scss';

const Layout = () => {
    return (
        <>
            <Header />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
