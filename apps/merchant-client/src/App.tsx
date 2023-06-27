import { Route, Routes, useNavigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import LoginPage from './pages/login/Login';
import MerchantsCreatePage from './pages/merchants/create/MerchantsCreate';
import MerchantsPage from './pages/merchants/Merchants';
import SettingsPage from './pages/settings/Settings';
import { useAppSelector } from './store/hooks';
import { useEffect } from 'react';

export default function App() {
    const path = useAppSelector((state) => state.router.path);
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const navigate = useNavigate();
    useEffect(() => {
        if (path) {
            navigate(path);
        }
    }, [path]);

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth]);

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<>app</>} />

                    {/* main */}
                    <Route path="/main" element={<>main page</>} />

                    {/* settings */}
                    <Route path="/dashboard" element={<>dashboard page</>} />

                    {/* settings */}
                    <Route path="/settings" element={<SettingsPage />} />

                    {/* merchants */}
                    <Route path="/merchants" element={<MerchantsPage />} />
                    <Route
                        path="/merchants/create"
                        element={<MerchantsCreatePage />}
                    />

                    {/* merchant id */}
                    <Route path="/merchants/:id/merchant" element={<div>merchant id page</div>} />
                    <Route path="/merchants/:id/invoices" element={<div>invoices page</div>} />
                    <Route path="/merchants/:id/wallet" element={<div>wallet page</div>} />
                    <Route path="/merchants/:id/api" element={<div>api page</div>} />
                    <Route path="/merchants/:id/plugins" element={<div> plugins page</div>} />
                </Route>
            </Routes>
        </>
    );
}
