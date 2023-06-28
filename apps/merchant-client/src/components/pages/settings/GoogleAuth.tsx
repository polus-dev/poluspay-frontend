import { useState } from 'react';

import { PSwitch } from '@poluspay-frontend/ui';
import { ReactComponent as Icon2FA } from '../../../assets/icons/2fa.svg';

import './GoogleAuth.scoped.scss';

type GoogleAuthAction = 'add' | 'remove';

interface GoogleAuthProps {
    onButtonClick: (type: GoogleAuthAction) => void;
}

export const SettingsGoogleAuth: React.FC<GoogleAuthProps> = ({
    onButtonClick,
}) => {
    // replace with actual data
    const [value, setValue] = useState(true);

    const handleButtonClick = () => {
        value ? onButtonClick('remove') : onButtonClick('add');
    };

    return (
        <div className="auth">
            <div className="auth__inner">
                <h6 className="auth__inner-title">Two-Factor Authentication</h6>
                <p className="auth__inner-description">
                    By implementing Google Authenticator, Polus Payments aims to
                    provide an additional layerof security that complements the
                    existing email-based authentication. With the app installed,
                    you will have access to a constantly changing verification
                    code on your mobile devices, further securing your account.
                </p>
                <div className="auth__inner-button" onClick={handleButtonClick}>
                    <div className="auth__inner-button-content">
                        <Icon2FA className="auth__inner-button-content-icon" />
                        <p className="auth__inner-button-content-text">
                            Google Authenticator
                        </p>
                    </div>
                    <PSwitch value={value} onChange={() => {}} />
                </div>
            </div>
        </div>
    );
};
