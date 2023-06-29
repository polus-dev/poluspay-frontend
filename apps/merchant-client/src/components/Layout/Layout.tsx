import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';
import { MerchantMenu } from '../MerchantMenu/MerchantMenu';

import '../../assets/scss/main.scss';
import './styles.scss';
import { useRedirectAuth } from '../../hooks/useRedirectAuth';

interface LayoutProps {
    isMerchantPage?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ isMerchantPage }) => {
    useRedirectAuth();
    return (
        <>
            <Header />
            <div className="content">
                {isMerchantPage ? (
                    <div className="merchant-page">
                        <div className="merchant-page__inner">
                            <Outlet />
                        </div>
                        <MerchantMenu />
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </>
    );
};
