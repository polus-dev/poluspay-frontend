import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import SettingsForm from './components/pages/settings/Form';
import SettingsGoogleAuth from './components/pages/settings/GoogleAuth';
import SettingsRemoval from './components/pages/settings/Removal';
import LoginPage from './pages/login/Login';
import MerchantsCreatePage from './pages/merchants/create/MerchantsCreate';
import MerchantsPage from './pages/merchants/Merchants';

export default function App() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={
                        <>
                            <div style={{margin: '100px auto',width: '500px'}}>
                                <SettingsForm
                                    onFinish={() => {console.log('on-finish')}}
                                />
                            </div>
                            <div style={{margin: '100px auto',width: '500px'}}>
                                <SettingsGoogleAuth />
                            </div>
                            <div style={{margin: '100px auto',width: '500px'}}>
                                <SettingsRemoval />
                            </div>
                        </>
                    } />
                    <Route path="/merchants" element={<MerchantsPage />} />
                    <Route path="/merchants/create" element={<MerchantsCreatePage />} />
                </Route>
            </Routes>
        </>
    );
}
