import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '../../utils/Web3Modal';

import { PNotifyContainer } from '@poluspay-frontend/ui';
import { LoginAbout } from '../../components/pages/login/About';
import { LoginForm } from '../../components/pages/login/Form';

import './Login.scoped.scss';

export const LoginPage: React.FC = () => {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <div className="login">
                    <div className="login__inner">
                        <div className="login__inner-about">
                            <LoginAbout />
                        </div>
                        <div className="login__inner-form">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </WagmiConfig>
            <PNotifyContainer />
        </>
    );
};
