import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { LoginPage } from './pages/login/Login';
import { MerchantsCreatePage } from './pages/merchants/create/MerchantsCreate';
import { MerchantsPage } from './pages/merchants/Merchants';
import { SettingsPage } from './pages/settings/Settings';
import { MerchantProfilePage } from './pages/merchants/id/merchant/Merchant';
import { MerchantApiPage } from './pages/merchants/id/api/Webhooks';
import { MerchantWalletPage } from './pages/merchants/id/wallet/MerchantWallet';
import { MerchantDomainPage } from './pages/merchants/id/verification/Domain';
import { MerchantBrandPage } from './pages/merchants/id/verification/Brand';
import { MerchantInvoicesPage } from './pages/merchants/id/invoices/MerchantInvoices';
import { NotFoundPage } from './pages/404/NotFound';
import { UnderDevelopmentPage } from './pages/UnderDevelopment/UnderDevelopment';
import { GoogleAuth } from './pages/auth/google/Auth';
import { DashboardPage } from './pages/dashboard/Dashboard';

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/google" element={<GoogleAuth />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<UnderDevelopmentPage />} />
                    {import.meta.env.DEV && (
                        <Route path="/dashboard" element={<DashboardPage />} />
                    )}
                    <Route
                        path="/dashboard"
                        element={<UnderDevelopmentPage />}
                    />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/merchants" element={<MerchantsPage />} />
                    <Route
                        path="/merchants/create"
                        element={<MerchantsCreatePage />}
                    />
                </Route>
                <Route
                    path="/merchants/:id"
                    element={<Layout isMerchantPage />}
                >
                    <Route
                        path="/merchants/:id/merchant"
                        element={<MerchantProfilePage />}
                    />
                    <Route
                        path="/merchants/:id/invoices"
                        element={<MerchantInvoicesPage />}
                    />
                    <Route
                        path="/merchants/:id/wallet"
                        element={<MerchantWalletPage />}
                    />
                    <Route
                        path="/merchants/:id/api"
                        element={<MerchantApiPage />}
                    />
                    <Route
                        path="/merchants/:id/plugins"
                        element={<UnderDevelopmentPage />}
                    />
                </Route>
                <Route
                    path="/merchants/:id"
                    element={<Layout isMerchantPage centered />}
                >
                    <Route
                        path="/merchants/:id/domain"
                        element={<MerchantDomainPage />}
                    />
                    <Route
                        path="/merchants/:id/brand"
                        element={<MerchantBrandPage />}
                    />
                </Route>
                <Route path="*" element={<Layout />}>
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </>
    );
}
