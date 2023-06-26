import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/login/Login';
import MerchantsCreatePage from './pages/merchants/create/MerchantsCreate';
import MerchantsPage from './pages/merchants/Merchants';
import SettingsPage from './pages/settings/Settings';

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<>app</>} />
                    <Route path="/merchants" element={<MerchantsPage />} />
                    <Route
                        path="/merchants/create"
                        element={<MerchantsCreatePage />}
                    />

                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </>
    );
}
