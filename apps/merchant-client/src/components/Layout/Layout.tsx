import { Outlet } from 'react-router-dom';

import { Header } from '../Header/Header';
import { MerchantMenu } from '../MerchantMenu/MerchantMenu';
import { PNotifyContainer } from '@poluspay-frontend/ui';

import classNames from 'classnames';

import '../../assets/scss/main.scss';
import './styles.scss';

interface LayoutProps {
    isMerchantPage?: boolean;
    centered?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ isMerchantPage, centered }) => {
    return (
        <>
            <Header />
            <div className="content">
                {isMerchantPage ? (
                    <div className="merchant-page">
                        <div
                            className={classNames({
                                'merchant-page__inner': true,
                                'merchant-page__inner--centered': centered,
                            })}
                        >
                            <Outlet />
                        </div>
                        <MerchantMenu />
                    </div>
                ) : (
                    <Outlet />
                )}
                <PNotifyContainer ms={2000} />
            </div>
        </>
    );
};
