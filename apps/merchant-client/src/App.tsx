import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { LoginPage } from './pages/login/Login';
import { MerchantsCreatePage } from './pages/merchants/create/MerchantsCreate';
import { MerchantsPage } from './pages/merchants/Merchants';
import { SettingsPage } from './pages/settings/Settings';
import { MerchantProfilePage } from './pages/merchants/id/merchant/Merchant';
import { MerchantApiPage } from './pages/merchants/id/api/Webhooks';
import { MerchantWalletPage } from './pages/merchants/id/wallet/MerchantWallet';

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<>app</>} />
                    <Route path="/main" element={<>main page</>} />
                    <Route path="/dashboard" element={<>dashboard page</>} />
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
                        element={<div>invoices page</div>}
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
                        element={<div> plugins page</div>}
                    />
                </Route>
            </Routes>
        </>
    );
}
