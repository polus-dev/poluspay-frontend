import { WagmiConfig } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { ethereumClient, projectId, wagmiConfig } from '../../utils/Web3Modal';

import { LoginAbout } from '../../components/pages/login/About';
import { LoginForm } from '../../components/pages/login/Form';

import './Login.scoped.scss';
import {PNotifyContainer} from "@poluspay-frontend/ui";

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
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
          <PNotifyContainer />
        </>
    );
};
