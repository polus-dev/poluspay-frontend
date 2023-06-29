import { useState } from 'react';

import { PLabel } from '@poluspay-frontend/ui';
import { SettingsForm } from '../../components/pages/settings/Form';
import { SettingsGoogleAuth } from '../../components/pages/settings/GoogleAuth';
import { SettingsRemoval } from '../../components/pages/settings/Removal';
import { SettingsRemovalForm } from '../../components/pages/settings/removal/RemovalForm';

import './Settings.scoped.scss';
import { SettingsGoogleConnect } from '../../components/pages/settings/2fa/ConnectForm';

export type GoogleAuthAction = 'add' | 'remove';

export const SettingsPage: React.FC = () => {
    const [state, setState] = useState<'default' | '2fa' | 'removal'>(
        'default'
    );

    const [googleAuthType, setGoogleAuthType] = useState<GoogleAuthAction>();

    const [formNotification, setFormNotification] = useState(false);

    // replace with real data
    const hasEmailConnected = true;

    const handleForm = () => {
        setFormNotification(true);

        setTimeout(() => {
            setFormNotification(false);
        }, 3000);
    };

    const handleGoogleAuthPicker = (type: GoogleAuthAction) => {
        setState('2fa');
        setGoogleAuthType(type);
    };

    const handleGoogleAuth = () => {
        console.log('submit');

        if (googleAuthType === 'add') {
            // add 2fa
        } else if (googleAuthType === 'remove') {
            // remove 2fa
        }
    };

    const refreshPageData = () => {
        setState('default');
        setGoogleAuthType(undefined);
    };

    return (
        <>
            <div className="settings">
                <div className="settings__inner">
                    {state === 'default' && (
                        <>
                            <div className="settings__inner-form">
                                <SettingsForm onFinish={handleForm} />
                            </div>
                            {hasEmailConnected && (
                                <>
                                    <div className="settings__inner-auth">
                                        <SettingsGoogleAuth
                                            onButtonClick={(type) =>
                                                handleGoogleAuthPicker(type)
                                            }
                                        />
                                    </div>
                                    <div className="settings__inner-removal">
                                        <SettingsRemoval
                                            onDelete={() => setState('removal')}
                                        />
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    {state === '2fa' && (
                        <SettingsGoogleConnect
                            type={googleAuthType}
                            onSubmit={handleGoogleAuth}
                            onCancel={refreshPageData}
                        />
                    )}
                    {state === 'removal' && (
                        <SettingsRemovalForm
                            onDelete={() => console.log('delete account')}
                            onCancel={refreshPageData}
                        />
                    )}
                </div>
            </div>
            <PLabel
                visible={formNotification}
                status="success"
                title="Email added"
            />
        </>
    );
};
