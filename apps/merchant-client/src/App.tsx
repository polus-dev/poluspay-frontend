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
    } else {
      navigate('/');
    }
  }, [isAuth]);

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
